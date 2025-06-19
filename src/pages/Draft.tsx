import { useEffect } from "react"
import Header from "../components/Header"
import { useNavigate, useParams } from "react-router"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import RenderHTML from "../components/RenderHTML"
import Pencil from "../icons/Pencil"
import Trash from "../icons/Trash"
import { displayAddress } from "../utils/functions"
import useDraft from "../hooks/useDraft"
import { useAccount, useWriteContract } from "wagmi"
import { db } from "../utils/db"
import { firestore } from "../utils/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { wagmiContractConfig } from "../utils/contracts"
import { QueryClient } from "@tanstack/react-query"

function Draft() {
  const params = useParams()
  const navigate = useNavigate()
  const account = useAccount()
  const { draft, isLoading } = useDraft(params.draftId!)
  const { addToast, removeToast } = useToast()

  const { writeContract: createPost } = useWriteContract()

  useEffect(() => {
    if (isLoading) return;
    if (draft === undefined) {
      addToast("Draft does not exist", {
        type: ToastType.ERROR,
        duration: 3000
      })
      navigate(`${Pages.DRAFTS}`)
      return;
    }
  }, [draft])


  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigate(`${Pages.EDIT_DRAFT}/${params.draftId!}`)
  }
  
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const loadingToastId = addToast("Deleting draft...", 
      { type: ToastType.INFO })
    if (account.isConnected) {
      await deleteDoc(doc(firestore, "drafts", `${draft!.id}`))
    } else {
      await db.drafts.delete(draft!.id)
    }
    removeToast(loadingToastId)
    addToast("Successfully deleted draft", 
      { type: ToastType.SUCCESS, duration: 3000 })
    navigate(`${Pages.DRAFTS}`)
  }

  const handlePublish = () => {
    if (!account.isConnected) {
      addToast("Connect wallet to publish your post!", {
        duration: 3000, type: ToastType.INFO
      })
      return;
    }
    (async () => {
      // TODO: upload to pinata
      // const title = titleRef.current.value
      // const content = contentRef.current.value
      // const timestamp = Date.now()
      // const fileName = account.address + " " + timestamp
      // const data = await uploadPost({
      //   title, content, author: account.address!, timestamp
      // }, fileName)
      
      createPost({
        ...wagmiContractConfig,
        functionName: 'createPost',
        args: ["cid1", [], []]
      }, {
        onSuccess: (data) => {
          addToast("Successfully published post!", {
            duration: 3000, type: ToastType.SUCCESS
          })
          console.log("createPost data: ", data)
          new QueryClient()
            .invalidateQueries({ queryKey: ['readContract'] });
          navigate(Pages.DASHBOARD)
        },
        onError: (error) => {
          console.error(error)
          addToast(error.message, {
            duration: 3000, type: ToastType.ERROR
          })
        }
      })
    })()
  }

  return (
    <>
      <Header />
      {draft ? <main className="mt-16 flex flex-col mx-auto px-4 space-y-8">
        <div className="flex flex-col h-full">
          <h1 className="text-2xl font-semibold mb-1 line-clamp-2">{draft.title}</h1>
          <p className="text-sm text-secondary-foreground h-5 mb-1">{draft.author ? displayAddress(draft.author) : "Anonymous"}</p>
          <RenderHTML content={draft.content} className="mb-2 flex-grow-0" />
          {draft.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto mb-1">
              {draft.tags.map(tag => 
                <span className="text-xs px-2 py-0.5 bg-accent text-primary rounded-full" key={tag}>
                  {tag}
                </span>
              )}
            </div>
          )}
          
          <div className="text-right mb-4">
            <button onClick={handlePublish} className="w-[50%] md:w-[25%] button" 
              title={account.isConnected ? "" : "Connect wallet to publish your post!"}>Publish</button>
          </div>

          <div className="flex justify-between mt-auto items-end">
            <p className="text-xs text-secondary-foreground">{new Date(Number(draft.timestamp)).toDateString()}</p>
            <div className="flex space-x-2">
              <button className="cursor-pointer" onClick={handleEdit}><Pencil /></button>
              <button className="cursor-pointer" onClick={handleDelete}><Trash /></button>
            </div>
          </div>
          </div>
      </main> : "Loading..."}
    </>
  )
}

export default Draft