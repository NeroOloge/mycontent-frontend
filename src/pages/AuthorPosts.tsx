import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAccount, useReadContracts } from "wagmi"
import { FormattedPost, Posts } from "../utils/types"
import PostItem from "../components/PostItem"
import Header from "../components/Header"
import { populatePosts } from "../utils/pinata"
import { wagmiContractConfig } from "../utils/contracts"
import { useReadContract } from "wagmi"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"


function AuthorPosts() {
  const navigate = useNavigate()
  const account = useAccount()
  const { addToast } = useToast()
  const [posts, setPosts] = useState<FormattedPost[]>(null!)

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
      navigate(Pages.HOME, { state: { loggedIn: false } })
      return;
   }

    (async () => { 
      if (authorPostsLoading) {
        // notifyLoading(authorPostsLoading)
        addToast("Loading posts...", { type: ToastType.INFO })
      }
      if (authorPosts && postCommentsLength && likesNumber) {
        console.log(authorPosts)
        const populatedPosts = await populatePosts(authorPosts as unknown as Posts)
        setPosts(
          populatedPosts.map((post, index) => ({ ...post, 
            likes: Number(likesNumber?.[index]?.result) || 0, 
            comments: Number(postCommentsLength?.[index]?.result) || 0,
          }))
        )
        // notifySuccess('Successfully loaded posts.')
        addToast("Successfully loaded posts.", 
          { type: ToastType.SUCCESS, duration: 3000 })
      }
      
    })()
  }, [authorPosts, postCommentsLength, likesNumber, authorPostsLoading])

  return (
    <>
      <Header />
      <main className="mt-10">
        <h1 className="text-3xl font-bold text-center">Your Posts</h1>
        {posts && posts.length > 0 ? <div className="flex flex-col items-center justify-center">
          {posts?.map(post => (
            <PostItem post={post} key={post.cid} />
          ))}
        </div> : 'No posts'}
      </main>
  </>)
}

export default AuthorPosts