import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router"
import { v4 as uuidv4 } from 'uuid';
import Header from "../components/Header"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import Search from "../icons/Search"
import { PopulatedPost } from "../utils/types"
import { execute, FilterMostLikedPostsBySearchAndTagDocument, FilterMostLikedPostsByTagDocument, FilterPostsBySearchAndTagDocument, FilterPostsByTagDocument, FilterPostsDocument, GetMostLikedPostsDocument, GetPopularTagsDocument, GetPopularTagsQuery, GetPostsDocument } from "../../.graphclient"
import { populatePosts } from "../utils/pinata"
import PostItem from "../components/PostItem"
import { sortPosts } from "../utils/functions"
import { POST_LIMIT } from "../utils/constants"

function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addToast, removeToast } = useToast()
  const [currentTab, setCurrentTab] = useState<string>("recent-posts")
  const [posts, setPosts] = useState<PopulatedPost[]>()
  const skipRef = useRef(0)
  const isLoadingRef = useRef(false)
  const [tags, setTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string>()
  const [searchInput, setSearchInput] = useState('')

  const loadingToastId = useRef<number | null>(null)
  const successToastId = useRef<number | null>(null)

  const tabsContainerRef = useRef<HTMLDivElement>(null!)
  const postContainerRef = useRef<HTMLDivElement>(null!)
  const observerRef = useRef<IntersectionObserver>()

  const loadMorePosts = async (observer: IntersectionObserver) => {
    console.log('Loading more posts')
    if (isLoadingRef.current) return
    isLoadingRef.current = true
    if (loadingToastId.current) {
      removeToast(loadingToastId.current)
      loadingToastId.current = null
    }
    loadingToastId.current = 
      addToast("Loading more posts...", { type: ToastType.INFO })
    
    // const result = await execute(GetPostsDocument, { skip: skipRef.current + POST_LIMIT })
    const { result, byLikes } = await getRelevantResult(true);
    if (result.data && result.data.posts.length > 0) {
      const [populatedPosts] = await Promise.all([
        populatePosts(result.data.posts)
      ])
      skipRef.current += POST_LIMIT
      setPosts(prev => prev ? [...prev, ...sortPosts(populatedPosts, byLikes)] : sortPosts(populatedPosts, byLikes))
      if (loadingToastId.current) {
        removeToast(loadingToastId.current)
        loadingToastId.current = null
      }
      successToastId.current = 
        addToast("Posts loaded successfully", {
          type: ToastType.SUCCESS, duration: 3000
        })
    } else {
      observer.disconnect()
      addToast("End of feed", { type: ToastType.INFO, duration: 2000 })
      if (loadingToastId.current) {
        removeToast(loadingToastId.current)
        loadingToastId.current = null
      }
    }
    isLoadingRef.current = false
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries, observer) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        loadMorePosts(observer)
      }
    }, { threshold: 1 })
    const postContainer = postContainerRef.current
    if (postContainer && postContainer.lastElementChild) {
      console.log('observing last post')
      observerRef.current.observe(postContainer.lastElementChild)
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [currentTab])

  useEffect(() => {
    if (!localStorage.getItem('guestId')) {
      localStorage.setItem('guestId', `${uuidv4()}`)
    }
    if (location.state?.loggedIn === false) {
      addToast("No wallet connected!", {
        type: ToastType.WARNING, duration: 3000
      })
      navigate(`${Pages.HOME}`, { state: {} })
      return
    }
  
    if (location.state?.loggedOut === true) {
      addToast("Successfully disconnected!", {
        type: ToastType.SUCCESS, duration: 3000
      })
      navigate(`${Pages.HOME}`, { state: {} })
      return
    }
  
    if (location.state?.cancelled === true) {
      addToast("Wallet connection was cancelled. Connect to create a post.", {
        type: ToastType.WARNING, duration: 3000
      })
      navigate(`${Pages.HOME}`, { state: {} })
      return
    }
  }, [])

  


  
  useEffect(() => {
    if (!postContainerRef.current || !observerRef.current) return
    const lastPost = postContainerRef.current.lastElementChild
    if (lastPost) {
      observerRef.current.observe(lastPost)
    }
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [posts])

  useEffect(() => {
    (async () => {
      try {
        if (loadingToastId.current) {
          removeToast(loadingToastId.current)
          loadingToastId.current = null
        }

        loadingToastId.current = 
          addToast("Loading posts...", { type: ToastType.INFO })
        const { result, byLikes } = await getRelevantResult()
          
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
        if (tagResult && tagResult.data && tagResult.data.tagSummaries) {
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

  const getRelevantResult = async (skip?: boolean) => {
    let result
    let byLikes
    // TODO: possibly query all filters and switch
    // based on changes in tab and tag/search
    // TODO: score = likes*3 + replies*2 + bookmarks*4 + views*0.
    if (selectedTag) {
      if (currentTab === 'popular-posts') {
        result = await execute(FilterMostLikedPostsByTagDocument, { tag: selectedTag })
        byLikes = true
      } else
        result = await execute(FilterPostsByTagDocument, { tag: selectedTag })
    } else {
      if (currentTab === 'popular-posts') {
        result = await execute(GetMostLikedPostsDocument, { skip: skip ? skipRef.current + POST_LIMIT : skipRef.current })
        byLikes = true
      } else
        result = await execute(GetPostsDocument, { skip: skip ? skipRef.current + POST_LIMIT : skipRef.current })
    }
    return { result, byLikes }
  }

  const switchTabs = (e: any) => {
    const tabs = Array.from(tabsContainerRef.current.children)
    tabs.forEach(tab => {
      tab.className = 'tabs-home'
    })
    e.target.className = `tabs-home tabs-active-home`
    setCurrentTab(e.target.id)
    skipRef.current = 0
  }

  const selectTag = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const tagElements = Array.from(e.currentTarget.parentElement!.children)
    tagElements.forEach(tagElement => {
      tagElement.className = 'tags-home'
    })
    let result
    let byLikes = false
    if (e.currentTarget.id === selectedTag) {
      setSelectedTag('')
      if (currentTab === 'popular-posts') {
        if (searchInput) {
          result = await execute(FilterMostLikedPostsBySearchAndTagDocument, {
            title: searchInput,
            author: searchInput,
            tag: ''
          })
          byLikes = true
        } else {
          result = await execute(FilterMostLikedPostsByTagDocument, {
            tag: ''
          })
          byLikes = true
        }
      } else {
        if (searchInput)
          result = await execute(FilterPostsBySearchAndTagDocument, {
            title: searchInput,
            author: searchInput,
            tag: ''
          })
        else
          result = await execute(FilterPostsByTagDocument, {
            tag: ''
          })
      }
          
    } else {
      e.currentTarget.className = `tags-home tags-active-home`
      setSelectedTag(e.currentTarget.id)
      if (currentTab === 'popular-posts') {
        if (searchInput) {
          result = await execute(FilterMostLikedPostsBySearchAndTagDocument, {
            title: searchInput,
            author: searchInput,
            tag: e.currentTarget.id
          })
          byLikes = true
        } else {
          result = await execute(FilterMostLikedPostsByTagDocument, {
            tag: e.currentTarget.id
          })
          byLikes = true
        }
      }
      else  
        if (searchInput)
          result = await execute(FilterPostsBySearchAndTagDocument, {
            title: searchInput,
            author: searchInput,
            tag: e.currentTarget.id
          })
        else
          result = await execute(FilterPostsByTagDocument, {
            tag: e.currentTarget.id
          })
    }
    if (result && result.data && result.data.posts) {
      const [populatedPosts] = await Promise.all([
        populatePosts(result.data.posts)
      ])
      setPosts(sortPosts(populatedPosts, byLikes))
    }
  }

  const handleChange = async (input: string) => {
    setSearchInput(input)
    // TODO: full text search
    // search inside content (body)
    // fuzzy matching (“readablity” still finds “readability”)
    // tag suggestions/autocomplete
    try {
      let result
      if (selectedTag) 
        result = await execute(FilterPostsBySearchAndTagDocument, {
          title: input,
          author: input,
          tag: selectedTag
        })
      else
        result = await execute(FilterPostsDocument, {
          searchTerm: input
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
              {posts && posts.length > 0 ? <div ref={postContainerRef} id="post-container"
                className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
                {posts.map(post => (
                  <PostItem author={post.author} post={post} key={`${post.id}`} />
                ))}
              </div> : <div className="text-lg md:text-base text-secondary-foreground">No posts found</div>}
            </div>
            <div 
              className={currentTab === "popular-posts" ? "visible space-y-2" : "hidden"}>
              <h2 className="font-semibold text-xl">Popular Posts</h2>
              {posts && posts.length > 0 ? <div className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
                {posts.map(post => (
                  <PostItem author={post.author} post={post} key={`${post.id}`} />
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