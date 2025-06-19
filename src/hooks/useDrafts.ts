import { useEffect, useState } from "react"
import { useLiveQuery } from 'dexie-react-hooks'
import { db, Draft } from "../utils/db"
import { useAccount } from "wagmi"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { firestore } from "../utils/firebase"

function useDrafts(local?: boolean) {
  const account = useAccount()
  const [drafts, setDrafts] = useState<Draft[]>([])
  const localDrafts = useLiveQuery(() => db.drafts.toArray())
  useEffect(() => {
    (async () => {
      if (!account.isConnected || local) {
        setDrafts(localDrafts?.sort((a, b) => Number(b.timestamp) - Number(a.timestamp)) || [])
      }
      else {
        const q = query(collection(firestore, "drafts"), where("author", "==", account.address!))
        const unsub = onSnapshot(q, (querySnapshot) => {
          if (!querySnapshot.empty) {
            const firestoreDrafts = querySnapshot.docs.map(d => ({...d.data(), id: Number(d.id)}))
            
            setDrafts((firestoreDrafts as Draft[]).sort((a, b) => Number(b.timestamp) - Number(a.timestamp)))
          }
        });
        return () => unsub()
      }
    })()
      
  }, [account.isConnected, localDrafts])
  
  return drafts
}

export default useDrafts