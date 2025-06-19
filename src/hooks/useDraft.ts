import { useEffect, useState } from "react"
import { db, Draft } from "../utils/db"
import { useLiveQuery } from "dexie-react-hooks"
import { useAccount } from "wagmi"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../utils/firebase"

function useDraft(draftId: string) {
  const account = useAccount()
  const [draft, setDraft] = useState<Draft | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  const localDraft = useLiveQuery(async () => {
    const result = await db.drafts.get(Number(draftId))
    setIsLoading(false)
    return result
  }, [draftId])

  const fetchDraft = async () => {
    try {
      if (account.isConnected) {
        const docSnap = await getDoc(doc(firestore, "drafts", draftId))
        if (docSnap.exists()) setDraft(docSnap.data() as Draft)
          else setDraft(undefined)
        fetchDraft()
      } else {
        setDraft(localDraft)
      }
    } catch (error) {
      console.error(error)
      setDraft(undefined)
    } finally {
      // setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchDraft()
  }, [localDraft])  
  

  return {
    draft, 
    isLoading
  }
}

export default useDraft