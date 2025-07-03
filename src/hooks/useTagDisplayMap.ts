import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { firestore } from "../utils/firebase"
import { TagDisplayMap } from "../utils/types"

function useTagDisplayMap(author?: `0x${string}`) {
  const account = useAccount()
  const [tagDisplayMap, setTagDisplayMap] = useState<TagDisplayMap>({})

  const fetchTagDisplayMap = async (author?: `0x${string}`) => {
    if (account.isConnected) {
      const docSnap = await getDoc(doc(firestore, "tagDisplayMap", author || account.address!))
      if (!docSnap.exists()) return
      setTagDisplayMap(docSnap.data() as TagDisplayMap)
    } else {
      const tagDisplayMapJSON = localStorage.getItem("tagDisplayMap")
      if (!tagDisplayMapJSON) return
      return JSON.parse(tagDisplayMapJSON) as TagDisplayMap
    }
  }

  useEffect(() => {
    (async () => {
      const result = await fetchTagDisplayMap(author)
      if (!result) return
      setTagDisplayMap(result)
    })()
  }, [])

  return tagDisplayMap
}

export default useTagDisplayMap