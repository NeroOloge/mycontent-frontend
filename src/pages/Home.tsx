import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router"
import Header from "../components/Header"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import Search from "../icons/Search"
import { PopulatedPost } from "../utils/types"
import { execute, FilterMostLikedPostsByTagDocument, FilterPostsByTagDocument, FilterPostsDocument, GetMostLikedPostsDocument, GetPopularTagsDocument, GetPopularTagsQuery, GetPostsDocument } from "../../.graphclient"
import { populatePosts } from "../utils/pinata"
import PostItem from "../components/PostItem"
import { sortPosts } from "../utils/functions"

function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addToast, removeToast } = useToast()
  const [currentTab, setCurrentTab] = useState<string>("recent-posts")
  const [posts, setPosts] = useState<PopulatedPost[]>()
  const [tags, setTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string>()
  const [searchInput, setSearchInput] = useState('')

  const loadingToastId = useRef<number | null>(null)
  const successToastId = useRef<number | null>(null)

  const tabsContainerRef = useRef<HTMLDivElement>(null!)
  const postContainerRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (location.state?.loggedIn === false) {
      addToast("No wallet connected!", {
        type: ToastType.WARNING, duration: 3000
      })
      navigate(`${Pages.HOME}`, { state: {} })
      return;
    }
  
    if (location.state?.loggedOut === true) {
      addToast("Successfully disconnected!", {
        type: ToastType.SUCCESS, duration: 3000
      })
      navigate(`${Pages.HOME}`, { state: {} })
      return;
    }
  
    if (location.state?.cancelled === true) {
      addToast("Wallet connection was cancelled. Connect to create a post.", {
        type: ToastType.WARNING, duration: 3000
      })
      navigate(`${Pages.HOME}`, { state: {} })
      return;
    }

  }, [])
  
  useEffect(() => {
    const postContainer = postContainerRef.current
    if (postContainer) {
      const observer = new IntersectionObserver(entries => {
        console.log(entries)
      })
      const lastPost = Array.from(postContainer.children)[postContainer.children.length]
      observer.observe(lastPost)
    }
  }, [])

  useEffect(() => {
    (async () => {
      try {
        if (loadingToastId.current) {
          removeToast(loadingToastId.current)
          loadingToastId.current = null
        }

        loadingToastId.current = 
          addToast("Loading posts...", { type: ToastType.INFO })
        let result;
        let byLikes = false;
        if (selectedTag) {
          if (currentTab === 'popular-posts') {
            result = await execute(FilterMostLikedPostsByTagDocument, { tag: selectedTag })
            byLikes = true
          } else
            result = await execute(FilterPostsByTagDocument, { tag: selectedTag })
        } else {
          if (currentTab === 'popular-posts') {
            result = await execute(GetMostLikedPostsDocument, {})
            byLikes = true
          } else
            result = await execute(GetPostsDocument, {})
        }
          
        const tagResult = await execute(GetPopularTagsDocument, {})
        if (result.data && result.data.posts) {
          const [populatedPosts] = await Promise.all([
            populatePosts(result.data.posts)
          ])
          setPosts(sortPosts(populatedPosts, byLikes))
    
          if (loadingToastId.current) {
            removeToast(loadingToastId.current)
            loadingToastId.current = null
          }
          if (successToastId.current) {
            removeToast(successToastId.current)
            successToastId.current = null
          }
          successToastId.current = addToast("Posts loaded successfully", { 
            type: ToastType.SUCCESS,
            duration: 3000 
          })
        }
        if (tagResult && tagResult.data) {
          const popularTags = (tagResult.data as GetPopularTagsQuery)
            .tagSummaries.map((summary) => summary.id)
          setTags(popularTags)
        }
      } catch (e) {
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
  }, [currentTab])

  const switchTabs = (e: any) => {
    const tabs = Array.from(tabsContainerRef.current.children)
    tabs.forEach(tab => {
      tab.className = 'tabs-home'
    })
    e.target.className = `tabs-home tabs-active-home`
    setCurrentTab(e.target.id)
  }

  const selectTag = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const tagElements = Array.from(e.currentTarget.parentElement!.children)
    tagElements.forEach(tagElement => {
      tagElement.className = 'tags-home'
    })
    let result
    let byLikes = false;
    if (e.currentTarget.id === selectedTag) {
      setSelectedTag('')
      if (currentTab === 'popular-posts') {
        result = await execute(FilterMostLikedPostsByTagDocument, {
          tag: ''
        })
        byLikes = true
      }
      else
        result = await execute(FilterPostsByTagDocument, {
          tag: ''
        })
          
    } else {
      e.currentTarget.className = `tags-home tags-active-home`
      setSelectedTag(e.currentTarget.id)
      if (currentTab === 'popular-posts') {
        result = await execute(FilterMostLikedPostsByTagDocument, {
          tag: e.currentTarget.id
        })
        byLikes = true
      }
      else  
        result = await execute(FilterPostsByTagDocument, {
          tag: e.currentTarget.id
        })
    }
    if (result && result.data) {
      const [populatedPosts] = await Promise.all([
        populatePosts(result.data.posts)
      ])
      setPosts(sortPosts(populatedPosts, byLikes))
    }
  }

  const handleChange = async (input: string) => {
    setSearchInput(input)
    try {
      const result = await execute(FilterPostsDocument, {
        title: input,
        author: input,
        tag: selectedTag || input
      })
      if (result.data && result.data.posts) {
        const [populatedPosts] = await Promise.all([
          populatePosts(result.data.posts)
        ])          
        setPosts(populatedPosts)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Header />
      <main className="mt-16 flex flex-col mx-auto px-2 space-y-8">
        <div className="md:flex justify-between md:space-x-4 md:space-y-0 space-y-4">
          <div className="space-y-4 bg-secondary self-start px-3 py-5 rounded-lg">
            <h2 className="font-semibold text-lg">Category</h2>
            <div className="space-y-3" ref={tabsContainerRef}>
              <p id="recent-posts" onClick={switchTabs} className={`tabs-home tabs-active-home`}>Recent Posts</p>
              <p id="popular-posts" onClick={switchTabs} className={`tabs-home`}>Popular Posts</p>
            </div>
          </div>
          <div className="space-y-4 md:flex-1">
            <div className="rounded-lg bg-secondary px-2 items-center flex space-x-2">
              <span><Search /></span>
              <input 
              value={searchInput}
              onChange={async (e) => await handleChange(e.target.value)}
              className="outline-none py-3 flex-1" 
              placeholder="Search posts..." />
            </div>
            <div className="flex flex-wrap gap-1 mt-auto">
              {tags.map(tag => 
                <span onClick={selectTag} id={tag} className='tags-home' key={tag}>
                  {tag}
                </span>
              )}
            </div>
            <div 
              className={currentTab === "recent-posts" ? "visible space-y-2" : "hidden"}>
              <h2 className="font-semibold text-xl">Recent Posts</h2>
              {posts && posts.length > 0 ? <div ref={postContainerRef} 
                className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
                {posts.map(post => (
                  <PostItem author={post.author} post={post} key={post.id} />
                ))}
              </div> : <div className="text-lg md:text-base text-secondary-foreground">No posts found</div>}
            </div>
            <div 
              className={currentTab === "popular-posts" ? "visible space-y-2" : "hidden"}>
              <h2 className="font-semibold text-xl">Popular Posts</h2>
              {posts && posts.length > 0 ? <div className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
                {posts.map(post => (
                  <PostItem author={post.author} post={post} key={post.id} />
                ))}
              </div> : <div className="text-lg md:text-base text-secondary-foreground">No posts found</div>}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home