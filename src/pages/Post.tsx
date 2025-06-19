import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router"
import { useAccount, useWriteContract, useEnsName } from "wagmi"
import { Comments, PopulatedComment, PostDetail } from "../utils/types"
import { displayAddress, displayTime } from "../utils/functions"
import Header from "../components/Header"
import { deleteFile, populateComments, populatePost, uploadComment } from "../utils/pinata"
import { wagmiContractConfig } from "../utils/contracts"
import { QueryClient } from "@tanstack/react-query"
import { useReadContract } from "wagmi"
import { Pages } from "../utils/enums"

function Post() {
  const params = useParams()
  const [searchParams, _] = useSearchParams()
  const navigate = useNavigate()
  const account = useAccount()

  const [post, setPost] = useState<PostDetail>(null!)
  const commentRef = useRef<HTMLInputElement>(null!)

  const isDelete = searchParams.get("delete")

  const { data: ensName } = useEnsName({
    address: account.address!,
    query: {
      enabled: !!account.address,
    }
  })

  const { data: comments } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getCommentsByPost',
    args: [params.cid!],
    query: {
      enabled: !!params.cid,
    },
  })

  const { data: likesNumber } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getLikesNumberByPost',
    args: [params.cid!],
    query: {
      enabled: !!params.cid,
    },
  })

  const { data: userLikes } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getLikesByUser',
    args: [account.address!],
    query: {
      enabled: !!account.address,
    },
  })

  const { writeContract: addComment, isPending: addCommentPending } = useWriteContract()

  const { writeContract: like, isPending: likePending } = useWriteContract()

  const { writeContract: unlike, isPending: unlikePending } = useWriteContract()

  const { writeContract: deletePost, isPending: deletePostPending } = useWriteContract()

  const { writeContract: deleteComment, isPending: deleteCommentPending } = useWriteContract()

  useEffect(() => {
    if (!account.isConnected) {
      navigate(Pages.HOME, { state: { loggedIn: false } })
      return;
   }
   (async () => {
      if (comments && likesNumber != undefined) {
        const cid = params.cid!
        const postDetail = await populatePost({ cid })
        const usersComments = await populateComments(comments as unknown as Comments)
        const postObject = {
         ...postDetail,
         cid,
         likes: Number(likesNumber),
         comments: comments.length,
         usersComments,
        }
        setPost(postObject)
      }
      if (addCommentPending) {
        // notifyLoading(addCommentPending)
      }
      if (likePending) {
        // notifyLoading(likePending)
      }
      if (unlikePending) {
        // notifyLoading(unlikePending)
      }
      if (deleteCommentPending) {
        // notifyLoading(deleteCommentPending)
      }
      if (deletePostPending) {
        // notifyLoading(deletePostPending)
      }
   })()
  }, [
    comments, likesNumber, addCommentPending, likePending, unlikePending,
    deleteCommentPending, deletePostPending
  ])

  const handleLike = () => {
    like({
      ...wagmiContractConfig,
      functionName: 'like',
      args: [params.cid!, post.author],
    }, {
      onSuccess: () => {
        // notifySuccess('Successfully added like.')
      },
      onError: (error) => {
        console.error(error)
        // notifyError(error.message.split("\n")[0])
      }
    })
    new QueryClient()
      .invalidateQueries({ queryKey: ['readContract'] })
 }

  const handleUnlike = () => {
    unlike({
      ...wagmiContractConfig,
      functionName: 'unlike',
      args: [params.cid!, post.author],
    }, {
      onSuccess: () => {
        // notifySuccess('Successfully removed like.')
      },
      onError: (error) => {
        console.error(error)
        // notifyError(error.message.split("\n")[0])
      }
    })
    new QueryClient()
      .invalidateQueries({ queryKey: ['readContract'] })
  }

  const handleComment = () => {
    (async () => {
      const content = commentRef.current.value
      const timestamp = Date.now()
      const fileName = account.address + " " + timestamp
      const data = await uploadComment({
        commenter: account.address!, timestamp, content, postCid: post.cid
      }, fileName)

      addComment({
        ...wagmiContractConfig,
        functionName: 'addComment',
        args: [post.cid, data.cid, post.author, BigInt(timestamp)],
      }, {
        onSuccess: (data) => {
          // notifySuccess('Successfully added comment.')
          console.log("addComment data: ", data)
          new QueryClient()
            .invalidateQueries({ queryKey: ['readContract'] })
          commentRef.current.value = ""
        },
        onError: (error) => {
          console.error(error)
          // notifyError(error.message.split("\n")[0])
        }
      })
    })()
  }

  const handleDeletePost = async () => {
    await Promise.all(post.usersComments.map(async (comment) => {
      const fileName = comment.commenter + " " + comment.timestamp
      await deleteFile(fileName)
    }))
    deletePost({
      ...wagmiContractConfig,
      functionName: 'deletePost',
      args: [post.cid, post.author]
    }, {
      onSuccess: async () => {
        // notifySuccess('Successfully deleted post.')
        const fileName = account.address + " " + post.timestamp
        await deleteFile(fileName)
        navigate(Pages.POSTS)
      },
      onError: (error) => {
        console.error(error)
        // notifyError(error.message.split("\n")[0])
      }
    })
    new QueryClient()
      .invalidateQueries({ queryKey: ['readContract'] })
  }

  const handleDeleteComment = (comment: PopulatedComment) => {
    deleteComment({
      ...wagmiContractConfig,
      functionName: 'deleteComment',
      args: [post.cid, comment.cid, post.author, comment.commenter]
    }, {
      onSuccess: async () => {
        // notifySuccess('Successfully deleted comment.')
        const fileName = comment.commenter + " " + post.timestamp
        await deleteFile(fileName)
      },
      onError: (error) => {
        console.error(error)
        // notifyError(error.message.split("\n")[0])
      }
    })
    new QueryClient()
      .invalidateQueries({ queryKey: ['readContract'] })
    
  }

  const isLiked = () => {
    if (userLikes)
      return userLikes.filter(likes => likes === post.cid).length > 0
    return false
  }

  const isAuthor = (author: string) => {
    return account.address === author
  }

  return (
    <>
      <Header />
      {post ? <main className="mt-10">
        <div className="px-2 py-2">
          <div className="space-y-2 mb-3">
            <h3 className="font-bold text-2xl">{post?.title}</h3>
            <p className="text-justify whitespace-pre-line">{post?.content}</p>
          </div>
          <p className="text-end text-xs">{displayTime(post?.timestamp)}</p>
          {isDelete && <div className="flex space-x-2 mt-5">
              <button onClick={() => navigate(`/post/${post.cid}`)} className="flex-1 cursor-pointer hover:bg-gray-700 rounded px-2 py-1">Cancel</button>
              <button onClick={(e) => {
                e.stopPropagation()
                handleDeletePost()
              }} className="flex-1 cursor-pointer bg-red-500 rounded px-2 py-1">Confirm Delete</button>
            </div>}
        </div>
        <div className="flex text-sm justify-between">
          <div className="flex">
            {isLiked() ? <i onClick={() => handleUnlike()} className='cursor-pointer pi pi-thumbs-up-fill'></i> :
              <i onClick={() => handleLike()} className='cursor-pointer pi pi-thumbs-up'></i>
            }
            <p className="px-2">{post.likes} Like{post.likes !== 1 && "s"}</p>
            <p className="flex-1">{post.comments} Comment{post.comments !== 1 && "s"}</p>
          </div>
          {!isDelete && isAuthor(post.author) && <div>
            <button className="p-1 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/post/${post.cid}?delete=true`)
              }}
              aria-label="Delete post"
              >
                <i className='pi pi-trash'></i>
            </button>
        </div>}
        </div>
        <div className="mt-5 flex flex-col h-[50vh] overflow-hidden">
          <div className="space-y-2 flex-1 overflow-y-auto">
            <h2 className="text-lg font-semibold">Comments</h2>
            <div className="">
              {post.usersComments.map(comment => (
                <div className="flex justify-between text-sm mb-3 border-b-white border-b py-2" key={comment.cid}>
                  <div className="">
                    <p>{comment.content}</p>
                    {ensName && <p>ENS name: {ensName}</p>}
                    <p className="text-xs">{displayAddress(comment.commenter)}</p>
                  </div>
                  <div className="text-end">
                  {isAuthor(comment.commenter) && <button className="p-1 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteComment(comment)
                      }}
                      aria-label="Delete comment"
                      >
                        <i className='pi pi-trash'></i>
                    </button>}
                    <p className="text-xs">{displayTime(comment.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sticky bottom-0 flex space-x-4 px-2">
            <input ref={commentRef} type="text" className="p-2 flex-1 focus:outline-none focus:border-b" placeholder="Type a comment" />
            <button onClick={() => handleComment()} className="cursor-pointer bg-blue-500 rounded px-2 py-1">Comment</button>
          </div>
        </div>
      </main> : 'Loading...'}
    </>
  )
}

export default Post