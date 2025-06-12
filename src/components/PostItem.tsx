import 'primeicons/primeicons.css';
import { useLocation, useNavigate } from "react-router"
import { displayTime } from "../utils/functions"
import { FormattedPost } from "../utils/types"
import { useAccount, useWriteContract } from 'wagmi';
import { useReadContract } from 'wagmi';
import { wagmiContractConfig } from '../utils/contracts';
import { QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Pages } from '../utils/enums';

function PostItem({ post }: { post: FormattedPost }) {
  const navigate = useNavigate()
  const location = useLocation()
  const account = useAccount()

  const { data: userLikes } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getLikesByUser',
    args: [account.address!],
    query: {
      enabled: !!account.address,
    },
  })

  const { writeContract: like, isPending: likePending } = useWriteContract()
    
  const { writeContract: unlike, isPending: unlikePending } = useWriteContract()

  useEffect(() => {
    if (likePending) {
      // notifyLoading(likePending)
    }
    if (unlikePending) {
      // notifyLoading(unlikePending)
    }
  }, [likePending, unlikePending])

  const handleLike = () => {
    if (!account.isConnected) {
      navigate(Pages.CONNECT, 
        { state: { from: location.pathname } })
      return;
    }
    like({
      ...wagmiContractConfig,
      functionName: 'like',
      args: [post.cid, post.author]
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
      .invalidateQueries({ queryKey: ['readContract'] });
  }

  const handleUnlike = () => {
    if (!account.isConnected) {
      navigate(Pages.CONNECT, 
        { state: { from: location.pathname } })
      return;
    }
    unlike({
      ...wagmiContractConfig,
      functionName: 'unlike',
      args: [post.cid, post.author]
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
      .invalidateQueries({ queryKey: ['readContract'] });
  }

  const handleDelete = () => {
    navigate(`/post/${post.cid}?delete=true`)
  }

  const handleClick = () => {
    navigate(`/post/${post.cid}`)
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
    <div onClick={() => handleClick()} className="px-2 cursor-pointer mb-3 border-b-white border-b py-2 w-[100%] md:w-[80%]">
      <div className="justify-between flex max-w-[100%] mb-3">
        <div className="max-w-[calc(100%-120px)]">
          <h3 className="font-[500] text-lg">{post.title}</h3>
          <p className="text-sm w-full overflow-hidden text-ellipsis whitespace-nowrap">{post.content}</p>
        </div>
        <p className="text-xs">{displayTime(post.timestamp)}</p>
      </div>
      <div className="flex text-xs justify-between">
        <div className="flex">
          {isLiked() ? 
            <i onClick={(e) => { 
              e.stopPropagation()
              handleUnlike() 
            }} className='pi pi-thumbs-up-fill'></i> :
            <i onClick={(e) => { 
              e.stopPropagation()
              handleLike() 
            }} className='pi pi-thumbs-up'></i>
          }
          <p className="px-2">{post.likes} Like{post.likes !== 1 && "s"}</p>
          <p className="flex-1">{post.comments} Comment{post.comments !== 1 && "s"}</p>
        </div>
        {isAuthor(post.author) && <div>
          <button className="p-1 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            aria-label="Delete post"
            >
              <i className='pi pi-trash'></i>
            </button>
        </div>}
      </div>
    </div>
  )
}

export default PostItem