import { useLocation, useNavigate } from "react-router"
import Header from "../components/Header"
import useDrafts from "../hooks/useDrafts"
import Pencil from "../icons/Pencil"
import Trash from "../icons/Trash"
import { Pages, ToastType } from "../utils/enums"
import { displayAddress, syncLocalDrafts } from "../utils/functions"
import { useEffect } from "react"
import { useToast } from "../providers/ToastProvider"
import { useAccount } from "wagmi"
import { db } from "../utils/db"
import { deleteDoc, doc } from "firebase/firestore"
import { firestore } from "../utils/firebase"

function Drafts() {
  const drafts = useDrafts()
  const localDrafts = useDrafts(true)
  const account = useAccount()
  const navigate = useNavigate()
  const location = useLocation()
  const { addToast, removeToast } = useToast()

  useEffect(() => {
    if (location.state?.loggedIn === true) {
      addToast("Successfully synced local drafts to DB", {
        duration: 3000,
        type: ToastType.SUCCESS
      })
    }
    console.log(drafts?.[0])
  }, [])

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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`${Pages.DRAFT_DETAIL}/${e.currentTarget.dataset.id}`)
  }

  return (
    <>
      <Header />
      <main className="mt-16 flex flex-col mx-auto px-4 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Drafts</h1>
          {drafts.length === 0 && 
            <div className="text-lg md:text-base text-secondary-foreground">No drafts found</div>}
          <div className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
            {drafts.map(draft => (
              <div onClick={handleClick} data-id={`${draft.id}`} key={draft.id} className="cursor-pointer flex flex-col h-full min-h-[200px] px-3 py-2 rounded-lg bg-secondary">
                <h1 className="text-xl font-semibold mb-1 line-clamp-2">{draft.title}</h1>
                <p className="text-secondary-foreground h-5 mb-1">{draft.author ? displayAddress(draft.author) : "Anonymous"}</p>
                <p className="text-sm line-clamp-2 mb-2 flex-grow-0">{draft.preview}</p>
                {draft.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-auto mb-1">
                    {draft.tags.map(tag => 
                      <span className="text-xs px-2 py-0.5 bg-accent text-primary rounded-full" key={tag}>
                        {tag}
                      </span>)}
                  </div>
                )}
                <div className="flex justify-between mt-auto items-end">
                  <p className="text-xs text-secondary-foreground">{new Date(Number(draft.timestamp)).toDateString()}</p>
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
            ))}
          </div>
        </div>
        {localDrafts.length > 0 && <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Local Drafts</h1>
          <div className="text-center">
            <button onClick={
              async () => await syncLocalDrafts(localDrafts, account.address!)
            } className="button">
              Sync local drafts to DB?
            </button>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
            {localDrafts.map(draft => (
              <div onClick={handleClick} 
                data-id={`${draft.id}`} 
                key={draft.id} 
                data-class={"local"}
                className="cursor-pointer flex flex-col h-full min-h-[200px] px-3 py-2 rounded-lg bg-secondary">
                <h1 className="text-xl font-semibold mb-1 line-clamp-2">{draft.title}</h1>
                <p className="text-secondary-foreground h-5 mb-1">{draft.author ? displayAddress(draft.author) : "Anonymous"}</p>
                <p className="text-sm line-clamp-2 mb-2 flex-grow-0">{draft.preview}</p>
                {draft.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-auto mb-1">
                    {draft.tags.map(tag => 
                      <span className="text-xs px-2 py-0.5 bg-accent text-primary rounded-full" key={tag}>
                        {tag}
                      </span>)}
                  </div>
                )}
                <div className="flex justify-between mt-auto items-end">
                  <p className="text-xs text-secondary-foreground">{new Date(Number(draft.timestamp)).toDateString()}</p>
                  <div className="flex space-x-2">
                    <button 
                      data-id={`${draft.id}`}
                      data-class={"local"}
                      className="cursor-pointer" 
                      onClick={handleEdit}><Pencil /></button>
                    <button 
                      data-id={`${draft.id}`}
                      data-class={"local"}
                      className="cursor-pointer" 
                      onClick={handleDelete}><Trash /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>}
      </main>
    </>
  )
}

export default Drafts