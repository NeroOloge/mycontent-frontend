import { useEffect, useState } from "react"
import { useLiveQuery } from 'dexie-react-hooks'
import { db, Draft } from "../utils/db"
import { useAccount } from "wagmi"
import { collection, getDocs } from "firebase/firestore"
import { firestore } from "../utils/firebase"

function useDraft() {
  const account = useAccount()
  const [drafts, setDrafts] = useState<Draft[]>([])
  const localDrafts = useLiveQuery(() => db.drafts.toArray())
  useEffect(() => {
    (async () => {
      if (!account.isConnected) {
        setDrafts(localDrafts || [])
      }
      else {
        const querySnapshot = await getDocs(collection(firestore, "drafts"))
        if (querySnapshot.empty) setDrafts([])
      }
    })()
      
  }, [account.isConnected, localDrafts])
  
  return drafts
}

export default useDraft