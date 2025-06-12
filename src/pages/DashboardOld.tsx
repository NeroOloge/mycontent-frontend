import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useAccount, useBalance, useReadContract, useEnsName } from "wagmi"
import { 
  displayAddress,
  displayTime,
 } from '../utils/functions'
import { Comments, PopulatedPost, PostComment, Posts, SolidityPost } from "../utils/types"
import Header from "../components/Header"
import { formatComments, populateComments, populatePost, populatePosts } from "../utils/pinata"
import { wagmiContractConfig } from "../utils/contracts"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"

function Dashboard() {
  const navigate = useNavigate()
  const account = useAccount()
  const { addToast, removeToast } = useToast()
  const [posts, setPosts] = useState<PopulatedPost[]>()
  const [isLoading, setIsLoading] = useState(false);
  const [totalAuthorComments, setTotalAuthorComments] = useState(0)  

  const [likedPosts, setLikedPosts] = useState<PopulatedPost[]>()
  const [postComments, setPostComments] = useState<PostComment>(null!)

  const loadingToastId = useRef<number | null>(null)

  const { data: ensName } = useEnsName({
    address: account.address!,
    query: {
      enabled: !!account.address,
    }
  })

  const { data: paginatedPosts, isLoading: postsLoading } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'paginatePosts',
    args: [BigInt(1), BigInt(5), account.address!],
    query: {
      enabled: !!account.address,
    },
  })

  const { data: userComments } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getCommentsByUser',
    args: [account.address!],
    query: {
      enabled: !!account.address,
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

  const handleClick = (postCid: string) => {
    navigate(`/post/${postCid}`)
  }

  useEffect(() => {
    if (!account.isConnected) {
      localStorage.setItem("status", "disconnected")
      navigate(Pages.HOME, { state: { loggedIn: false } })
      return;
    }
    (async () => {
      if (loadingToastId.current) {
        removeToast(loadingToastId.current)
      }

      setIsLoading(true)
      loadingToastId.current = 
        addToast("Loading posts...", { type: ToastType.INFO })

      if (paginatedPosts && userComments && userLikes) {
        try {
          const usersLiked = (userLikes as string[]).map(postCid => ({ cid: postCid })) as unknown as SolidityPost[]
          
          const populatedComments = await populateComments(userComments as unknown as Comments)
          
          const [posts, likedPosts, totalComments] = await Promise.all([
            populatePosts(paginatedPosts as unknown as Posts),
            populatePosts(usersLiked),
            populateComments(userComments as unknown as Comments),
          ]);

          const formattedComments = await formatComments(populatedComments)

          setPosts(posts)
          setLikedPosts(likedPosts)
          setTotalAuthorComments(totalComments.length)
          setPostComments(formattedComments)

          if (loadingToastId.current) {
            removeToast(loadingToastId.current)
            loadingToastId.current = null
          }
          
          addToast("Posts loaded successfully", { 
            type: ToastType.SUCCESS,
            duration: 3000 
          })
        } catch (error) {
          if (loadingToastId.current) {
            removeToast(loadingToastId.current)
            loadingToastId.current = null
          }
          addToast("Failed to load posts.", 
            { type: ToastType.ERROR, duration: 3000 })
        } finally {
          setIsLoading(false);
          if (loadingToastId.current) {
            removeToast(loadingToastId.current)
            loadingToastId.current = null
          }
        }
      }
    })()
  }, [paginatedPosts, userComments, userLikes])

  const { data: balance } = useBalance({
    address: account.address
  })

  return (
    <>
      <Header />
      <main className="space-y-5 grid grid-cols-1 md:grid-cols-3">
        <section className="px-2 pb-3">
          <div className="mt-10">
            <h2 className="text-lg font-semibold">User Stats</h2>
            <p>Posts: {posts?.length}</p>
            <p>Comments: {totalAuthorComments}</p>
            <p>Likes: {likedPosts ? likedPosts.length : 0}</p>
          </div>
          <div className="mt-10">
            <h2 className="text-lg font-semibold">Wallet Information</h2>
            <p>Your wallet address: {displayAddress(account.address!)}</p>
            {ensName && <p>ENS name: {ensName}</p>}
            <p>Your wallet balance: {balance ? 
            Number(balance.value)/Math.pow(10, balance.decimals)+" ETH" : "Loading"}</p>
          </div>
        </section>
        <section className="col-span-2 px-4 py-3 space-y-5">
          <div className="space-y-2 md:px-4">
            <h2 className="text-xl font-[700]">Posts</h2>
            {posts?.map(post => (
              <div key={post.cid} onClick={() => handleClick(post.cid)} className="cursor-pointer mb-3 justify-between flex">
                <div className="max-w-[calc(100%-120px)]">
                  <h3 className="font-[500] text-lg">{post.title}</h3>
                  <p className="text-sm w-full overflow-hidden text-ellipsis whitespace-nowrap">{post.content}</p>
                </div>
                <p className="text-xs">{displayTime(post.timestamp)}</p>
              </div>
            ))}
            {posts && posts.length > 4 && <button onClick={() => navigate(Pages.POSTS)} className="bg-blue-500 cursor-pointer text-white px-3 py-2 mr-2">Load More</button>}
          </div>
          <div className="scroll-smooth space-y-2 overflow-auto h-30 md:px-4">
            <h2 className="text-xl font-[700]">Likes</h2>
            {likedPosts?.map(post => (
              <div key={post.cid} onClick={() => handleClick(post.cid)} className="cursor-pointer mb-3 justify-between flex">
                <div className="max-w-[calc(100%-120px)]">
                  <h3 className="font-[500] text-lg">{post.title}</h3>
                  <p className="text-sm w-full overflow-hidden text-ellipsis whitespace-nowrap">{post.content}</p>
                </div>
                <p className="text-xs">{displayTime(post.timestamp)}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 scroll-smooth overflow-auto h-30 md:px-4">
            <h2 className="text-xl font-[700]">Comments</h2>
            {postComments ? Object.keys(postComments).length > 0 ? 
              Object.keys(postComments).map(postCid => (
                <div key={postCid} onClick={() => handleClick(postCid)} className="cursor-pointer mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-[500] text-lg">{postComments[postCid][0].post?.title}</h3>
                    <p className="text-xs">{displayTime(postComments[postCid][0].post!.timestamp)}</p>
                  </div>
                  {postComments[postCid].map(comment => (
                    <div key={comment.cid} className="flex items-center justify-between max-w-[calc(100%)]">
                      <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">- {comment.content}</p>
                      <p className="text-xs">{displayTime(comment.timestamp)}</p>
                    </div>
                  ))}
                </div> 

            )): '' : ''}
          </div>
        </section>
      </main>
    </>
  )
}

export default Dashboard