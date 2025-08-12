import 'primeicons/primeicons.css';
import { useNavigate } from "react-router"
import moment from "moment"
import { PopulatedPost } from "../utils/types"
import { Pages, ToastType } from '../utils/enums';
import Like from '../icons/Like';
import Comment from '../icons/Comment';
import Trash from '../icons/Trash';
import { displayAddress, isAuthor } from '../utils/functions';
import useTagDisplayMap from '../hooks/useTagDisplayMap';
import { useAccount, useEnsName, useWriteContract } from 'wagmi';
import { useToast } from '../providers/ToastProvider';
import { wagmiContractConfig } from '../utils/contracts';
import Copy from '../icons/Copy';
import { QueryClient } from '@tanstack/react-query';
import { execute, GetIsFollowingDocument, GetPostUserInfoDocument } from '../../.graphclient';
import { useEffect, useState } from 'react';
import Liked from '../icons/Liked';
import Bookmarked from '../icons/Bookmarked';
import Bookmark from '../icons/Bookmark';
import Plus from '../icons/Plus';

type Props = {
  post: PopulatedPost
  author?: `0x${string}`
}

function PostItem({ post, author }: Props) {
  const navigate = useNavigate()
  const account = useAccount()
  const tagDisplayMap = useTagDisplayMap(author)
  const { addToast, removeToast } = useToast()
  const [userLiked, setUserLiked] = useState(false)
  const [userBookmarked, setUserBookmarked] = useState(false)
  const [isFollowing, setIsFollowing] = useState<boolean>()

  const { writeContract: deletePost } = useWriteContract()
  const { writeContract: like } = useWriteContract()
  const { writeContract: unlike } = useWriteContract()
  const { writeContract: bookmark } = useWriteContract()
  const { writeContract: unbookmark } = useWriteContract()
  const { writeContract: follow } = useWriteContract()

  const { data: ensName } = useEnsName({
    address: post.author,
    query: {
      enabled: !!post.author,
    }
  })
  
  useEffect(() => {
    (async () => {
      await isLikedOrBookmarked()
      await checkFollowing(post.author)
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
      args: [BigInt(Number(post.id))]
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
      args: [BigInt(Number(post.id))]
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
      args: [BigInt(Number(post.id))]
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
      args: [BigInt(Number(post.id))]
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`${Pages.POST_DETAIL}/${e.currentTarget.dataset.id}`)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const loadingToastId = addToast("Deleting post...", 
      { type: ToastType.INFO })
    deletePost({
      ...wagmiContractConfig,      
      functionName: 'deletePost',      
      args: [BigInt(Number(e.currentTarget.dataset.id))]
    }, {
      onSuccess: () => {
        removeToast(loadingToastId)
        addToast("Successfully deleted post", 
          { type: ToastType.SUCCESS, duration: 3000 })
      }
    })
  }

  const checkFollowing = async (author: string) => {
    const result = await execute(GetIsFollowingDocument, {
      id: `${account.address?.toLowerCase()}-${author.toLowerCase()}`
    })
    if (result.data && result.data.isFollowing) {
      setIsFollowing(result.data.isFollowing !== null)
    } else setIsFollowing(false)
  }

  const isLikedOrBookmarked = async () => {
    const result = await execute(GetPostUserInfoDocument, {
      id: `${account.address?.toLowerCase()}-${post.id}`
    })
    if (result.data) {
      setUserLiked(result.data.like !== null)
      setUserBookmarked(result.data.bookmark !== null)
    } else {
      setUserLiked(false)
      setUserBookmarked(false)
    }
  }

  const handleCopy = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    navigator.clipboard.writeText(post.author)
    addToast("Copied to clipboard", {
      type: ToastType.INFO, duration: 1000
    })
  }

  const handleLikeButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (userLiked) handleUnlike()
    else handleLike()
  }

  const handleBookmarkButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (userBookmarked) handleUnbookmark()
    else handleBookmark()
  }

  const handleFollow = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    if (!account.isConnected) {
      navigate(Pages.CONNECT, 
        { state: { from: location.pathname } })
      return;
    }
    follow({
      ...wagmiContractConfig,
      functionName: 'follow',
      args: [post.author, BigInt(Date.now())]
    }, {
      onSuccess: () => {
        addToast("Followed author", {
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

  const handleAuthorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigate(`${Pages.PROFILE}/${post.author}`)
  }

  return (
    <div onClick={handleClick} key={`${post.id}`} data-id={`${post.id}`} className="cursor-pointer flex flex-col h-full min-h-[200px] px-3 py-2 rounded-lg bg-secondary post-item">
      <h1 className="text-xl font-semibold mb-1 line-clamp-2">{post.title}</h1>
      <p className="flex space-x-1 items-center text-secondary-foreground h-5 mb-1">
        <span onClick={handleAuthorClick} className="hover:underline">
          {ensName || displayAddress(post.author)}
        </span>
        {!isAuthor(post.author, account.address) && !isFollowing && <span onClick={handleFollow}><Plus /></span>}
        <span className='' onClick={handleCopy}><Copy /></span>
      </p>
      <p className="text-sm line-clamp-2 mb-2 flex-grow-0">{post.preview}</p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto mb-1">
        {post.tags.map(tag => 
          <span className="text-xs px-2 py-0.5 bg-accent text-primary rounded-full" key={tag}>
            {tagDisplayMap[tag] || tag}
          </span>)}
        </div>
      )}
      <div className="flex justify-between mt-auto items-end">
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
              <button className="cursor-pointer"><Comment /></button> 
              <span>{post.comments.length}</span>
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
          {/* <button data-id={`${post.id}`} className="cursor-pointer" onClick={handleEdit}><Pencil /></button> */}
          {isAuthor(post.author, account.address) && <button data-id={`${post.id}`} className="cursor-pointer" onClick={handleDelete}><Trash /></button>}
        </div>
      </div>
    </div>
  )
}

export default PostItem