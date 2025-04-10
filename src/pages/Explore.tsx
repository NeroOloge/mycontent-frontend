import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useAccount, useReadContract, useReadContracts } from "wagmi"
import { FormattedPost, Posts } from "../utils/types"
import PostItem from "../components/PostItem"
import Header from "../components/Header"
import { Pages } from "../utils/enums"
import { populatePosts } from "../utils/pinata"
import { wagmiContractConfig } from "../utils/contracts"

function Explore() {
  const navigate = useNavigate()
  const account = useAccount()
  const [posts, setPosts] = useState<FormattedPost[]>([])
  const [selectedAuthor, setSelectedAuthor] = useState<`0x${string}`>()
  const authorRef = useRef<HTMLSelectElement>(null!)

  const { data: authorPosts } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getPostsByAuthor',
    args: [selectedAuthor!],
    query: {
      enabled: !!selectedAuthor,
    },
  })

  const { data: authors } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getAuthors',
    args: [],
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
      if (authors && authors.length > 0 && !selectedAuthor) {
        setSelectedAuthor(authors[0])
      }
      if (authorPosts && postCommentsLength && likesNumber) {
        const populatedPosts = await populatePosts(authorPosts as unknown as Posts)
        setPosts(
          populatedPosts.map((post, index) => ({ ...post, 
            likes: Number(likesNumber?.[index]?.result) || 0, 
            comments: Number(postCommentsLength?.[index]?.result) || 0
          }))
        )
      }
    })()
  }, [authors, authorPosts, postCommentsLength, likesNumber])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthor(e.target.value as `0x${string}`)
  }

  return (
    <>
      <Header active={Pages.EXPLORE} />
      <main className="mt-10">
        <h1 className="text-3xl font-bold text-center">Explore</h1>
        {authors && authors.length > 0 ? <div>
          <div>
            <label htmlFor="authors" className="block mb-2 text-sm font-medium">Explore by post authors</label>
            <select 
            onChange={handleChange} 
            value={selectedAuthor || ''} 
            ref={authorRef} id="authors" 
            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block">
              {authors?.map(author => <option value={author} key={author}>{author.slice(0, 5)}...{author?.slice(author.length-3)}</option>)}
            </select>
          </div>
          <div className="flex flex-col items-center justify-center">
            {posts.map(post => (
              <PostItem key={post.cid} post={post} />
            ))}
          </div>
        </div> : 'No posts'}
      </main>
  </>)
}

export default Explore