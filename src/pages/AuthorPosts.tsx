import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useAccount } from "wagmi"
import { PopulatedPost } from "../utils/types"
import PostItem from "../components/PostItem"
import Header from "../components/Header"
import { populatePosts } from "../utils/pinata"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import { execute, GetPostsByAuthorDocument } from "../../.graphclient"


function AuthorPosts() {
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
          {posts && posts.length > 0 ? <div className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
            {posts.map(post => (
              <PostItem post={post} key={post.id} />
            ))}
          </div> : <div className="text-lg md:text-base text-secondary-foreground">No posts found</div>}
              
        </div>
      </main>
  </>)
}

export default AuthorPosts