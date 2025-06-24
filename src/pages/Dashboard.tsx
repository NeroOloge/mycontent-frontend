import { useNavigate } from "react-router"
import Header from "../components/Header"
import useDrafts from "../hooks/useDrafts"
import { Pages, ToastType } from "../utils/enums"
import { syncLocalDrafts } from "../utils/functions"
import { useToast } from "../providers/ToastProvider"
import { useAccount } from "wagmi"
import { execute, GetPostsByAuthorDocument } from "../../.graphclient"
import { useEffect, useRef, useState } from "react"
import { populatePosts } from "../utils/pinata"
import { PopulatedPost } from "../utils/types"
import DraftItem from "../components/DraftItem"
import PostItem from "../components/PostItem"

function Dashboard() {
  const drafts = useDrafts()
  const localDrafts = useDrafts(true)
  const navigate = useNavigate()
  const account = useAccount()
  const { addToast, removeToast } = useToast()
  const [posts, setPosts] = useState<PopulatedPost[]>()

  const loadingToastId = useRef<number | null>(null)

  useEffect(() => {
    (async () => {
      try {
        if (loadingToastId.current) {
          removeToast(loadingToastId.current)
        }

        loadingToastId.current = 
          addToast("Loading posts...", { type: ToastType.INFO })
        const result = await execute(GetPostsByAuthorDocument, { author: account.address! })
        if (result.data && result.data.posts) {
          const [populatedPosts] = await Promise.all([
            populatePosts(result.data.posts)
          ])
          console.log(populatedPosts)
          setPosts(populatedPosts)

          if (loadingToastId.current) {
            removeToast(loadingToastId.current)
            loadingToastId.current = null
          }

          addToast("Posts loaded successfully", { 
            type: ToastType.SUCCESS,
            duration: 3000 
          })
        }
      } catch(e) {
        console.error(e)
        if (loadingToastId.current) {
          removeToast(loadingToastId.current)
          loadingToastId.current = null
        }
        addToast("Failed to load posts.", 
          { type: ToastType.ERROR, duration: 3000 })
      } finally {
        if (loadingToastId.current) {
          removeToast(loadingToastId.current)
          loadingToastId.current = null
        }
      }
    })()
  }, [])
    

  return (
    <>
      <Header />
      <main className="mt-16 flex flex-col mx-auto px-4 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">My Posts</h1>
            <button onClick={() => navigate(`${Pages.CREATE_POST}`)} 
              className="button button-dark">New Post</button>
          </div>
          {posts && posts.length > 0 ? <div className="space-y-4">
            <div className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
              {posts.map(post => (
                <PostItem post={post} key={post.id} />
              ))}
            </div>
            <div className="text-end">
              <button onClick={() => navigate(`${Pages.POSTS}`)} 
                className="button">See More</button>
            </div>
          </div> : <div className="text-lg md:text-base text-secondary-foreground">No posts found</div>}
          
              
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Drafts</h1>
            <button onClick={() => navigate(`${Pages.CREATE_POST}`)} 
              className="button button-dark">New Draft</button>
          </div>
          {drafts.length > 0 ? <div className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
            {drafts.map(draft => (
              <DraftItem draft={draft} key={draft.id} />
            ))}
          </div> : <div className="text-lg md:text-base text-secondary-foreground">No drafts found</div>}
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
        <div className="space-y-4"></div>
        <div className="space-y-4"></div>
        <div className="text-end">
          <button className="button md:w-[25%]">Withdraw</button>
        </div>
      </main>
    </>
  )
}

export default Dashboard