import { useLocation } from "react-router"
import Header from "../components/Header"
import useDrafts from "../hooks/useDrafts"
import { ToastType } from "../utils/enums"
import { syncLocalDrafts } from "../utils/functions"
import { useEffect } from "react"
import { useToast } from "../providers/ToastProvider"
import { useAccount } from "wagmi"
import DraftItem from "../components/DraftItem"

function Drafts() {
  const drafts = useDrafts()
  const localDrafts = useDrafts(true)
  const account = useAccount()
  const location = useLocation()
  const { addToast } = useToast()

  useEffect(() => {
    if (location.state?.loggedIn === true) {
      addToast("Successfully synced local drafts to DB", {
        duration: 3000,
        type: ToastType.SUCCESS
      })
    }
  }, [])

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
              <DraftItem draft={draft} key={draft.id} />
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
              <DraftItem draft={draft} key={draft.id} />
            ))}
          </div>
        </div>}
      </main>
    </>
  )
}

export default Drafts