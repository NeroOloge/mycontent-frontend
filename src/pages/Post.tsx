import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import moment from "moment"
import { PopulatedPost } from "../utils/types"
import { displayAddress } from "../utils/functions"
import Header from "../components/Header"
import RenderHTML from "../components/RenderHTML"
import useTagDisplayMap from "../hooks/useTagDisplayMap"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import Trash from "../icons/Trash"
import { execute, GetPostByIdDocument } from "../../.graphclient"
import { populatePost } from "../utils/pinata"
import Like from "../icons/Like"
import Comment from "../icons/Comment"

function Post() {
  const params = useParams()
  const navigate = useNavigate()
  const { addToast, removeToast } = useToast()
  const [post, setPost] = useState<PopulatedPost | undefined>()
  const tagDisplayMap = useTagDisplayMap()
  
  useEffect(() => {
    (async () => {
      const loadingToastId = addToast("Loading post...", 
        { type: ToastType.INFO })
      try {
        const result = await execute(GetPostByIdDocument, { id: Number(params.postId) })
        console.log(result.data)
        if (result.data && result.data.post) {
          const [populatedPost] = await Promise.all([
            populatePost(result.data.post?.cid)
          ])
          setPost({ ...populatedPost, cid: result.data.post.cid, 
            id: result.data.post.id })
          removeToast(loadingToastId)
          addToast("Post loaded successfully", 
            { type: ToastType.SUCCESS, duration: 3000 })
        }
      } catch (error) {
        console.error(error)
        removeToast(loadingToastId)
        addToast("Error loading post", 
          { type: ToastType.ERROR, duration: 3000 })
      }
    })()
  }, [])

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const loadingToastId = addToast("Deleting draft...", 
      { type: ToastType.INFO })
    // if (account.isConnected) {
    //   await deleteDoc(doc(firestore, "drafts", `${params.draftId}`))
    // } else {
    //   await db.drafts.delete(Number(params.draftId))
    // }
    removeToast(loadingToastId)
    addToast("Successfully deleted draft", 
      { type: ToastType.SUCCESS, duration: 3000 })
    navigate(`${Pages.POSTS}`)
  }

  return (
    <>
      <Header />
      {post ? <main className="mt-16 flex flex-col mx-auto px-4 space-y-8">
        <div className="flex flex-col h-full">
          <h1 className="text-2xl font-semibold mb-1 line-clamp-2">{post.title}</h1>
          <p className="text-sm text-secondary-foreground h-5 mb-1">{post.author ? displayAddress(post.author) : "Anonymous"}</p>
          <RenderHTML content={post.content} className="mb-2 flex-grow-0" />
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto mb-1">
              {post.tags.map(tag => 
                <span className="text-xs px-2 py-0.5 bg-accent text-primary rounded-full" key={tag}>
                  {tagDisplayMap[tag] || tag}
                </span>
              )}
            </div>
          )}
          <div className="flex justify-between mt-2 items-end">
            <div className="space-y-2">
              <p className="text-xs text-secondary-foreground">{moment(new Date(Number(post.timestamp))).fromNow()}</p>
              <div className="flex space-x-2">
                <span className="text-secondary-foreground flex items-center space-x-2">
                  <button className="cursor-pointer"><Like /></button> <span>{post.likes}</span>
                </span>
                <span className="text-secondary-foreground flex items-center space-x-2">
                  <button className="cursor-pointer"><Comment /></button> <span>{post.comments}</span>
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              {/* <button className="cursor-pointer" onClick={handleEdit}><Pencil /></button> */}
              <button className="cursor-pointer" onClick={handleDelete}><Trash /></button>
            </div>
          </div>
        </div>
      </main> : "Loading..."}
    </>
  )
}

export default Post