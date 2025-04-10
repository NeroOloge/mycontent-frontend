import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useAccount, useReadContracts } from "wagmi"
import { FormattedPost, Posts } from "../utils/types"
import PostItem from "../components/PostItem"
import Header from "../components/Header"
import { Pages } from "../utils/enums"
import { populatePosts } from "../utils/pinata"
import { wagmiContractConfig } from "../utils/contracts"
import { useReadContract } from "wagmi"


function AuthorPosts() {
  const navigate = useNavigate()
  const account = useAccount()
  const [posts, setPosts] = useState<FormattedPost[]>(null!)

  const notifyRef = useRef<HTMLDivElement>(null!)

  const { data: authorPosts, isLoading: authorPostsLoading } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getPostsByAuthor',
    args: [account.address!],
    query: {
      enabled: !!account.address,
    },
  })

  const { data: postCommentsLength } = useReadContracts({
    contracts: authorPosts?.map(post => ({
      ...wagmiContractConfig,
      functionName: 'getCommentsNumberByPost',
      args: [post.cid]
    })) || [],
    query: {
      enabled: authorPosts && authorPosts.length > 0
    }
  })
  
  const { data: likesNumber } = useReadContracts({
    contracts: authorPosts?.map(post => ({
      ...wagmiContractConfig,
      functionName: 'getLikesNumberByPost',
      args: [post.cid]
    })) || [],
    query: {
      enabled: authorPosts && authorPosts.length > 0
    }
  })

  useEffect(() => {
    if (!account.isConnected) {
      localStorage.setItem("status", "disconnected")
      alert("No wallet connected")
      navigate("/")
   }
    

    (async () => { 
      if (authorPosts && postCommentsLength && likesNumber) {
        const populatedPosts = await populatePosts(authorPosts as unknown as Posts)
        setPosts(
          populatedPosts.map((post, index) => ({ ...post, 
            likes: Number(likesNumber?.[index]?.result) || 0, 
            comments: Number(postCommentsLength?.[index]?.result) || 0,
          }))
        )
      }
      if (authorPostsLoading) {
        notifyLoading(authorPostsLoading)
      }
    })()
  }, [authorPosts, postCommentsLength, likesNumber, authorPostsLoading])

  const notifyLoading = (isPending: boolean) => {
    notifyRef.current.innerText = 'Loading...'
    notifyRef.current.style.backgroundColor = '#99a1af'
    for (let i = 0; i <= 100; i+=10) {
      notifyRef.current.style.opacity = `${i}`
    }

    if (!isPending) {
      for (let i = 100; i >= 0; i-=10) {
        notifyRef.current.style.opacity = `${i}`
      }
    }
  }

  return (
    <>
      <Header active={Pages.POSTS} />
      <main className="mt-10">
        <h1 className="text-3xl font-bold text-center">Your Posts</h1>
        {posts && posts.length > 0 ? <div className="flex flex-col items-center justify-center">
          {posts?.map(post => (
            <PostItem post={post} key={post.cid} />
          ))}
          <div ref={notifyRef} 
          className="fixed top-[50vh] z-10 bg-gray-400 opacity-0 rounded w-[90%] text-center">Notify</div>
        </div> : 'No posts'}
      </main>
  </>)
}

export default AuthorPosts