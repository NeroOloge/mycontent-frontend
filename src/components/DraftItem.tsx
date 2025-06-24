import { useNavigate } from "react-router"
import moment from "moment"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import Pencil from "../icons/Pencil"
import Trash from "../icons/Trash"
import { displayAddress } from "../utils/functions"
import { useAccount } from "wagmi"
import { db, Draft } from "../utils/db"
import { firestore } from "../utils/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import useTagDisplayMap from "../hooks/useTagDisplayMap"

type Props = {
  draft: Draft
}

function DraftItem({ draft }: Props) {
  const navigate = useNavigate()
  const account = useAccount()
  const { addToast, removeToast } = useToast()
  const tagDisplayMap = useTagDisplayMap()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`${Pages.DRAFT_DETAIL}/${e.currentTarget.dataset.id}`)
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigate(`${Pages.EDIT_DRAFT}/${e.currentTarget.dataset.id}`)
  }
  
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const id = Number(e.currentTarget.dataset.id)
    const loadingToastId = addToast("Deleting draft...", 
      { type: ToastType.INFO })
    if (account.isConnected && !e.currentTarget.dataset.class) {
      await deleteDoc(doc(firestore, "drafts", `${id}`))
    } else {
      await db.drafts.delete(id)
    }
    removeToast(loadingToastId)
    addToast("Successfully deleted draft", 
      { type: ToastType.SUCCESS, duration: 3000 })
  }

  return (
    <div onClick={handleClick} data-id={`${draft.id}`} className="cursor-pointer flex flex-col h-full min-h-[200px] px-3 py-2 rounded-lg bg-secondary">
      <h1 className="text-xl font-semibold mb-1 line-clamp-2">{draft.title}</h1>
      <p className="text-secondary-foreground h-5 mb-1">{draft.author ? displayAddress(draft.author) : "Anonymous"}</p>
      <p className="text-sm line-clamp-2 mb-2 flex-grow-0">{draft.preview}</p>
        {draft.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto mb-1">
            {draft.tags.map(tag => 
              <span className="text-xs px-2 py-0.5 bg-accent text-primary rounded-full" key={tag}>
                {tagDisplayMap[tag] || tag}
              </span>)}
          </div>
        )}
      <div className="flex justify-between mt-auto items-end">
        <p className="text-xs text-secondary-foreground">{moment(new Date(Number(draft.timestamp))).fromNow()}</p>
        <div className="flex space-x-2">
          <button 
            data-id={`${draft.id}`}
            className="cursor-pointer" 
            onClick={handleEdit}><Pencil /></button>
          <button 
            data-id={`${draft.id}`}
            className="cursor-pointer" 
            onClick={handleDelete}><Trash /></button>
        </div>
      </div>
    </div>
                
  )
}

export default DraftItem