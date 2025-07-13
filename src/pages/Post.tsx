import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import moment from "moment"
import { PopulatedComment, PopulatedPost } from "../utils/types"
import { displayAddress, isAuthor } from "../utils/functions"
import Header from "../components/Header"
import RenderHTML from "../components/RenderHTML"
import useTagDisplayMap from "../hooks/useTagDisplayMap"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import Trash from "../icons/Trash"
import { execute, GetPostByIdDocument, GetPostUserInfoDocument } from "../../.graphclient"
import { populateComments, populatePost, uploadComment } from "../utils/pinata"
import Like from "../icons/Like"
import Comment from "../icons/Comment"
import { useAccount, useEnsName, useWriteContract } from "wagmi"
import { wagmiContractConfig } from "../utils/contracts"
import Copy from "../icons/Copy"
import Liked from "../icons/Liked"
import { QueryClient } from "@tanstack/react-query"
import Bookmarked from "../icons/Bookmarked"
import Bookmark from "../icons/Bookmark"

function Post() {
  const params = useParams()
  const account = useAccount()
  const navigate = useNavigate()
  const { addToast, removeToast } = useToast()
  const [post, setPost] = useState<PopulatedPost | undefined>()
  const [comments, setComments] = useState<PopulatedComment[]>()
  const [comment, setComment] = useState("")
  const [userLiked, setUserLiked] = useState(false)
  const [userBookmarked, setUserBookmarked] = useState(false)
  const loadingToastId = useRef<number | null>()
  const tagDisplayMap = useTagDisplayMap()

  const { writeContract: deletePost } = useWriteContract()
  const { writeContract: like } = useWriteContract()
  const { writeContract: unlike } = useWriteContract()
  const { writeContract: bookmark } = useWriteContract()
  const { writeContract: unbookmark } = useWriteContract()
  const { writeContract: addComment } = useWriteContract()
  const { writeContract: deleteComment } = useWriteContract()

  const { data: ensName } = useEnsName({
    address: post?.author,
    query: {
      enabled: !!post?.author,
    }
  })
  
  useEffect(() => {
    (async () => {
      try {
        await isLikedOrBookmarked()
        if (loadingToastId.current) {
          removeToast(loadingToastId.current)
          loadingToastId.current = null
        }
        loadingToastId.current = addToast("Loading post...", 
          { type: ToastType.INFO })
        const result = await execute(GetPostByIdDocument, { id: Number(params.postId) })
        if (result.data && result.data.post) {
          const [populatedPost, populatedComments] = await Promise.all([
            populatePost(result.data.post.cid),
            populateComments(result.data.post.comments)
          ])
          setPost({ ...populatedPost, cid: result.data.post.cid, 
            id: result.data.post.id, likes: result.data.post.likes,
            bookmarks: result.data.post.bookmarks, 
            comments: result.data.post.comments })
          setComments(populatedComments)
          if (loadingToastId.current) {
            removeToast(loadingToastId.current)
            loadingToastId.current = null
          }
          addToast("Post loaded successfully", 
            { type: ToastType.SUCCESS, duration: 3000 })
        }
      } catch (error) {
        console.error(error)
        if (loadingToastId.current) {
          removeToast(loadingToastId.current)
          loadingToastId.current = null
        }
        addToast("Error loading post", 
          { type: ToastType.ERROR, duration: 3000 })
      }
    })()
  }, [])

  const handleLike = () => {
    if (!account.isConnected) {
      navigate(Pages.CONNECT, 
        { state: { from: location.pathname } })
      return;
    }
    like({
      ...wagmiContractConfig,
      functionName: 'like',
      args: [BigInt(Number(params.postId))]
    }, {
      onSuccess: () => {
        addToast("Liked post", {
          type: ToastType.SUCCESS,
          duration: 3000
        })
      },
      onError: (error) => {
        console.error(error)
        addToast(error.message.split("\n")[0], {
          type: ToastType.ERROR,
          duration: 3000
        })
      }
    })
    new QueryClient()
      .invalidateQueries({ queryKey: ['readContract'] });
  }

  const handleUnlike = () => {
    unlike({
      ...wagmiContractConfig,
      functionName: 'unlike',
      args: [BigInt(Number(params.postId))]
    }, {
      onSuccess: () => {
        addToast("Removed like", {
          type: ToastType.SUCCESS,
          duration: 3000
        })
      },
      onError: (error) => {
        console.error(error)
        addToast(error.message.split("\n")[0], {
          type: ToastType.ERROR,
          duration: 3000
        })
      }
    })
    new QueryClient()
      .invalidateQueries({ queryKey: ['readContract'] });
  }

  const handleBookmark = () => {
    if (!account.isConnected) {
      navigate(Pages.CONNECT, 
        { state: { from: location.pathname } })
      return;
    }
    bookmark({
      ...wagmiContractConfig,
      functionName: 'bookmark',
      args: [BigInt(Number(params.postId))]
    }, {
      onSuccess: () => {
        addToast("Bookmarked post", {
          type: ToastType.SUCCESS,
          duration: 3000
        })
      },
      onError: (error) => {
        console.error(error)
        addToast(error.message.split("\n")[0], {
          type: ToastType.ERROR,
          duration: 3000
        })
      }
    })
    new QueryClient()
      .invalidateQueries({ queryKey: ['readContract'] });
  }

  const handleUnbookmark = () => {
    unbookmark({
      ...wagmiContractConfig,
      functionName: 'unbookmark',
      args: [BigInt(Number(params.postId))]
    }, {
      onSuccess: () => {
        addToast("Removed bookmark", {
          type: ToastType.SUCCESS,
          duration: 3000
        })
      },
      onError: (error) => {
        console.error(error)
        addToast(error.message.split("\n")[0], {
          type: ToastType.ERROR,
          duration: 3000
        })
      }
    })
    new QueryClient()
      .invalidateQueries({ queryKey: ['readContract'] });
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const loadingToastId = addToast("Deleting post...", 
      { type: ToastType.INFO })
    deletePost({
      ...wagmiContractConfig,      
      functionName: 'deletePost',      
      args: [BigInt(Number(params.postId))]
    }, {
      onSuccess: () => {
        removeToast(loadingToastId)
        addToast("Successfully deleted post", 
          { type: ToastType.SUCCESS, duration: 3000 })
        navigate(`${Pages.POSTS}`)
      }
    })
  }

  const handleDeleteComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const loadingToastId = addToast("Deleting comment...", 
      { type: ToastType.INFO })
    deleteComment({
      ...wagmiContractConfig,      
      functionName: 'deleteComment',      
      args: [BigInt(Number(e.currentTarget.id))]
    }, {
      onSuccess: () => {
        removeToast(loadingToastId)
        addToast("Successfully deleted comment", 
          { type: ToastType.SUCCESS, duration: 3000 })
        navigate(`${Pages.POSTS}`)
      }
    })
  }

  const handleComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!comment) return
    (async () => {
      const loadingToastId = addToast("Loading...", {
        type: ToastType.INFO,
      })
      const entity = {
        content: comment,
        commenter: account.address!,
        timestamp: Date.now(),
      }
      const fileName = account.address + " " + entity.timestamp
      const data = await uploadComment(entity, fileName)
  
      addComment({
        ...wagmiContractConfig,
        functionName: 'addComment',
        args: [BigInt(Number(params.postId)), data.cid, BigInt(entity.timestamp)]
      }, {
        onSuccess: () => {
          removeToast(loadingToastId)
          addToast("Successfully replied", {
            type: ToastType.SUCCESS,
            duration: 3000
          })

          setTimeout(() => window.location.reload(), 3000)
        },
        onError: (error) => {
          console.error(error)
          removeToast(loadingToastId)
          addToast(error.message.split("\n")[0], {
            type: ToastType.ERROR,
            duration: 3000
          })
        }
      })
    })()
  }

  const isLikedOrBookmarked = async () => {
    const result = await execute(GetPostUserInfoDocument, {
      id: `${account.address?.toLowerCase()}-${params.postId}`
    })
    if (result.data) {
      setUserLiked(result.data.like !== null)
      setUserBookmarked(result.data.bookmark !== null)
    } else {
      setUserLiked(false)
      setUserBookmarked(false)
    }
  }

  const handleLikeButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (userLiked) handleUnlike()
    else handleLike()
  }

  const handleBookmarkButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (userLiked) handleUnbookmark()
    else handleBookmark()
  }

  const handleCopy = (postAuthor: string) => {
    navigator.clipboard.writeText(postAuthor)
    addToast("Copied to clipboard", {
      type: ToastType.INFO, duration: 1000
    })
  }

  const handleAuthorClick = (author: string) => {
    navigate(`${Pages.PROFILE}/${author}`)
  }

  return (
    <>
      <Header />
      {post ? <main className="mt-16 flex flex-col mx-auto px-4 space-y-8">
        <div className="flex flex-col h-full">
          <h1 className="text-2xl font-semibold mb-1 line-clamp-2">{post.title}</h1>
          <p className="flex space-x-1 items-center text-sm text-secondary-foreground h-5 mb-1">
            <span onClick={() => handleAuthorClick(post.author)} className="cursor-pointer hover:underline">
              {ensName || displayAddress(post.author)}
            </span>
            <span className='' onClick={() => handleCopy(post.author)}><Copy /></span>
          </p>
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
              <div className="flex space-x-2 items-center">
                <span className="text-secondary-foreground flex items-center space-x-1">
                  <button onClick={handleLikeButton} 
                    className="cursor-pointer">
                    {userLiked ? <Liked /> : <Like />}
                  </button>
                  <span>{post.likes}</span>
                </span>
                <span className="text-secondary-foreground flex items-center space-x-1">
                  <button className="cursor-pointer"><Comment /></button> <span>{post.comments.length}</span>
                </span>
                <span className="text-secondary-foreground flex items-center space-x-1">
                  <button onClick={handleBookmarkButton} 
                    className="cursor-pointer">
                    {userBookmarked ? <Bookmarked /> : <Bookmark />}
                  </button>
                  <span>{post.bookmarks}</span>
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              {/* <button className="cursor-pointer" onClick={handleEdit}><Pencil /></button> */}
              {isAuthor(post.author, account.address) && 
              <button className="cursor-pointer" onClick={handleDelete}><Trash /></button>}
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <h2 className="font-semibold text-xl">Replies</h2>
            <div className="flex flex-col bg-secondary space-y-2">
              <textarea 
                onChange={(e) => setComment(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full p-4 outline-none resize-none h-[25vh]"></textarea>
              <button onClick={handleComment} className="button self-end m-4 z-10">Reply</button>
            </div>
            {comments && comments.length > 0 ? 
            <div className="space-y-3">
              {comments.map(comment => 
                <div key={comment.id} className="space-y-1">
                  <div className="flex space-x-4 items-center">
                    <p onClick={() => handleAuthorClick(comment.commenter)} className="cursor-pointer hover:underline text-sm text-secondary-foreground">
                      {displayAddress(comment.commenter)}
                    </p>
                    <p className="text-xs text-secondary-foreground">
                      {moment(new Date(Number(comment.timestamp))).fromNow()}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <p>{comment.content}</p>
                    {isAuthor(comment.commenter, account.address) && 
                    <button id={comment.id} className="cursor-pointer" onClick={handleDeleteComment}><Trash /></button>}
                  </div>
                </div>
              )}
            </div> 
              : <div>No replies yet!</div>}
          </div>
        </div>
      </main> : "Loading..."}
    </>
  )
}

export default Post