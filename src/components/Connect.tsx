import { useEffect, useState } from "react";
import Modal from "./Modal";
import ConnectModal from "./ConnectModal";
import { useNavigate, useLocation } from "react-router";
import SyncDraftsModal from "./SyncDraftsModal";
import { Pages, ToastType } from "../utils/enums";
import { useAccount } from "wagmi";
import useDraft from "../hooks/useDrafts";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import { db } from "../utils/db";
import { convertToURL, uploadBase64 } from "../utils/pinata";
import { useToast } from "../providers/ToastProvider";
import { syncLocalDrafts } from "../utils/functions";

function Connect() {
  const navigate = useNavigate()
  const location = useLocation()
  const account = useAccount()
  const [isConnectOpen, setIsConnectOpen] = useState(true)
  const [isSyncOpen, setIsSyncOpen] = useState(false)

  const drafts = useDraft(true)
  const { addToast, removeToast } = useToast()
  
  useEffect(() => {
  }, [])

  const onClose = () => {
    const page = location.state?.original
    if (page)
      navigate(`${page}`, { state: { cancelled: true } })
    else
      history.back()
  }

  const onSyncClose = (syncConfirm = false, loadingToastId?: number) => {
    const page = syncConfirm ? `${Pages.DRAFTS}` : 
      location.state?.from || `${Pages.PROFILE}/${account.address!}`
    if (loadingToastId) {
      removeToast(loadingToastId)
    }
    navigate(page, { state: { from: 'connect', loggedIn: true } })
  }

  const onSyncConfirm = async () => {
    console.log("syncing...")
    const loadingToastId = addToast("Syncing...", {
      type: ToastType.INFO
    })
    await syncLocalDrafts(drafts, account.address!)
    onSyncClose(true, loadingToastId)
  }

  return (
    <>
      <Modal isOpen={isConnectOpen} onClose={() => onClose()}>
        <ConnectModal 
          onClose={() => onClose()} 
          setIsConnectOpen={setIsConnectOpen} 
          setIsSyncOpen={setIsSyncOpen} />
      </Modal>
      <Modal isOpen={isSyncOpen} onClose={() => onSyncClose()}>
        <SyncDraftsModal 
          onClose={() => onSyncClose()} 
          onConfirm={async () => await onSyncConfirm()} />
      </Modal>
    </>
  )
}

export default Connect;