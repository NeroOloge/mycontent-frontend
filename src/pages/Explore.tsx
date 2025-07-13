import { useEffect, useState } from "react"
import Header from "../components/Header"
import { execute, FilterPostsBySearchAndTagDocument, FilterPostsByTagDocument, FilterPostsDocument, GetPostsDocument, GetProfileDocument, GetTopAuthorsDocument, GetTopAuthorsQuery, GetTrendingTagsDocument, GetTrendingTagsQuery } from "../../.graphclient"
import Search from "../icons/Search"
import { populatePosts } from "../utils/pinata"
import { PopulatedPost, TopAuthor } from "../utils/types"
import PostItem from "../components/PostItem"
import makeBlockie from "ethereum-blockies-base64"
import { useNavigate } from "react-router"
import { Pages } from "../utils/enums"

function Explore() {
  const navigate = useNavigate()
  const [trendingTags, setTrendingTags] = useState<string[]>([])
  const [posts, setPosts] = useState<PopulatedPost[]>()
  const [topAuthors, setTopAuthors] = useState<TopAuthor[]>()
  const [selectedTag, setSelectedTag] = useState<string>()
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    (async () => {
      const trendingTagsResult = await execute(GetTrendingTagsDocument, {
        time: `${Date.now() - (7 * 24 * 60 * 60 * 1000)}`
      })
      
      if (trendingTagsResult.data && trendingTagsResult.data.tags) {
        const data = trendingTagsResult.data as GetTrendingTagsQuery
        const uniqueTags = [...new Set(data.tags.map(tag => tag.tag))]
        setTrendingTags(uniqueTags.map(tag => tag))
      }

      const topAuthorsResult = await execute(GetTopAuthorsDocument, {})
      if (topAuthorsResult.data && topAuthorsResult.data.authors) {
        const authors = (topAuthorsResult.data as GetTopAuthorsQuery).authors
        console.log(authors)
        const authorProfiles = await Promise.all(authors.map(async (author) => {
          const profileResult = await execute(GetProfileDocument, 
            { id: author.id.toLowerCase() })
          console.log(profileResult)
          if (profileResult.data && profileResult.data.profile) {
            const profile = profileResult.data.profile
            return {
              id: author.id.toLowerCase(),
              username: profile.username,
              address: profile.user,
              totalLikes: author.totalLikes,
              postCount: author.postCount,
              imageCID: profile.imageCID
            }
          }
          return { 
            id: author.id.toLowerCase(), 
            address: author.id.toLowerCase() as `0x${string}`,
            totalLikes: author.totalLikes, 
            postCount: author.postCount 
          }
        }))
        console.log(authorProfiles)
        setTopAuthors(authorProfiles)
        const postsExistResult = await execute(GetPostsDocument, {})
        if (postsExistResult.data && postsExistResult.data.posts) {
          setPosts([])
        }
      }
    })()
  }, [])

  const selectTag = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const tagElements = Array.from(e.currentTarget.parentElement!.children)
    tagElements.forEach(tagElement => {
      tagElement.className = 'tags-home text-base'
    })
    let result
    if (e.currentTarget.id === selectedTag) {
      setSelectedTag('')
      if (searchInput)
        result = await execute(FilterPostsBySearchAndTagDocument, {
          title: searchInput,
          author: searchInput,
          tag: ''
        })
      else
        setPosts([])
        // result = await execute(FilterPostsByTagDocument, {
        //   tag: ''
        // })
          
    } else {
      e.currentTarget.className = `tags-home tags-active-home text-base`
      setSelectedTag(e.currentTarget.id)
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
      setPosts(populatedPosts)
    }
  }

  const handleChange = async (input: string) => {
    setSearchInput(input)
    try {
      let result
      if (input === '') {
        if (selectedTag) {
          result = await execute(FilterPostsByTagDocument, {
            tag: selectedTag
          })
        } else
          setPosts([])
          // result = await execute(FilterPostsDocument, {
          //   searchTerm: input
          // })
      } else {
        if (selectedTag) {
          result = await execute(FilterPostsBySearchAndTagDocument, {
            title: input,
            author: input,
            tag: selectedTag
          })
        } else
          result = await execute(FilterPostsDocument, {
            searchTerm: input
          })
      }
      if (result && result.data && result.data.posts) {
        const [populatedPosts] = await Promise.all([
          populatePosts(result.data.posts)
        ])
        setPosts(populatedPosts)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickAuthor = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`${Pages.PROFILE}/${e.currentTarget.id}`)
  }

  return (
    <>
      <Header />
      <main className="mt-16 mx-auto px-2 space-y-6 md:space-y-0 grid 
        md:grid-cols-4 grid-cols-1 md:gap-2">
        <aside className="space-y-6">
          <section className="space-y-3">
            <h2 className="font-semibold text-xl">Trending Tags</h2>
            <div className="flex flex-wrap gap-1 mt-auto">
              {trendingTags.map(tag => 
                <span onClick={selectTag} id={tag} className='tags-home text-base' key={tag}>
                  {tag}
                </span>
              )}
            </div>
          </section>
          <section className="space-y-3">
            <h2 className="font-semibold text-xl">Top Authors</h2>
            {topAuthors && topAuthors.length > 0 ?
            topAuthors.map(author => 
              author && 
              <div onClick={handleClickAuthor} id={author.id}
                className="cursor-pointer flex items-center space-x-3" key={author.id}>
                <img src={author.imageCID || makeBlockie(author.address)} className="image image-explore" />
                <div>
                  <h2>{author.username || "Anonymous"}</h2>
                  <p className="flex space-x-2">
                    <span>{author.totalLikes} like{author.totalLikes != 1 ? "s" : ""} </span>
                    <span>{author.postCount} post{author.postCount != 1 ? "s" : ""} </span>
                  </p>
                </div>
              </div>
            )  : <div></div>}
          </section>
        </aside>
        <section className="col-span-2 space-y-4">
          <div className="rounded-lg bg-secondary px-2 items-center flex space-x-2">
            <span><Search /></span>
            <input 
              value={searchInput}
              onChange={async (e) => await handleChange(e.target.value)}
              className="outline-none py-3 flex-1" 
              placeholder="Search posts..." />              
          </div>
          {posts ? posts.length > 0 ? 
          <div
            className="md:grid md:grid-cols-2 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
            {posts.map(post => (
              <PostItem author={post.author} post={post} key={post.id} />
            ))}
          </div> : <div className="text-lg md:text-base text-secondary-foreground">No filters selected</div>
          : <div className="text-lg md:text-base text-secondary-foreground">No posts yet</div>}
        </section>
        <aside className=""></aside>
      </main>
    </>
  )
}

export default Explore