import styles from "../style/Profile.module.css"
import { useLocation, useNavigate, useParams } from "react-router"
import makeBlockie from 'ethereum-blockies-base64';
import moment from 'moment'
import Header from "../components/Header"
import { useEffect, useRef, useState } from "react"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import { useAccount, useEnsName, useWriteContract } from "wagmi"
import { displayAddress } from "../utils/functions"
import { PopulatedComment, PopulatedPost, PostComment, SolidityPost } from "../utils/types";
import { populateComments, populatePosts } from "../utils/pinata";
import { execute, GetCommentsByUserDocument, GetFollowersDocument, GetManyPostsDocument, GetPostsBookmarkedByUserDocument, GetPostsBookmarkedByUserQuery, GetPostsByAuthorDocument } from "../../.graphclient";
import PostItem from "../components/PostItem";
import Copy from "../icons/Copy";
import { wagmiContractConfig } from "../utils/contracts";
import Trash from "../icons/Trash";

function Profile() {
  const location = useLocation()
  const account = useAccount()
  const params = useParams()
  const navigate = useNavigate()
  const { addToast, removeToast } = useToast()
  const tabsContainerRef = useRef<HTMLDivElement>(null!)
  const [currentTab, setCurrentTab] = useState<string>("posts")
  
  const [posts, setPosts] = useState<PopulatedPost[]>()
  const [replies, setReplies] = useState<PostComment>({})
  const [repliedPosts, setRepliedPosts] = useState<SolidityPost[]>()
  const [followers, setFollowers] = useState<number>()
  const [following, setFollowing] = useState<number>()
  
  const loadingToastId = useRef<number | null>(null)

  const { data: ensName } = useEnsName({
    address: params.authorAddress! as `0x${string}`,
    query: {
      enabled: !!params.authorAddress,
    }
  })

  const { writeContract: deleteComment } = useWriteContract()

  useEffect(() => {
    if (!account.isConnected) {
      navigate(Pages.HOME, { state: { loggedIn: false } })
      return;
    }
    if (location.state?.loggedIn === true) {
      addToast("Welcome! Customize your profile so others can find and follow you.", {
        type: ToastType.SUCCESS, duration: 3000
      })
    }
    (async () => {
      try {
        setPosts([])
        const followersResult = await execute(GetFollowersDocument, {
          user: params.authorAddress!
        })
        if (followersResult.data && followersResult.data.followers && 
          followersResult.data.following) {
          setFollowers(followersResult.data.followers.length)
          setFollowing(followersResult.data.following.length)
        }
        if (loadingToastId.current) {
          removeToast(loadingToastId.current)
          loadingToastId.current = null
        }

        loadingToastId.current = 
          addToast("Loading posts...", { type: ToastType.INFO })
          if (currentTab === "replies") {
            const result = await execute(GetCommentsByUserDocument, { user: params.authorAddress! })
            if (result.data && result.data.comments) {
              const [populatedComments] = await Promise.all([
                populateComments(result.data.comments)
              ])
              const { postComments, postsRepliedTo } = formatComments(populatedComments)
              setReplies(postComments)
              setRepliedPosts(postsRepliedTo)
            }
          } else {
            let result
            if (currentTab === "bookmarks") {
              const bookmarkResult = await execute(GetPostsBookmarkedByUserDocument, { user: params.authorAddress! })
              if (bookmarkResult && bookmarkResult.data) {
                const postIds = (bookmarkResult.data as GetPostsBookmarkedByUserQuery)
                  .bookmarks.map((bookmark) => bookmark.post.id)
                if (postIds.length > 0)
                  result = await execute(GetManyPostsDocument, { ids: postIds })
              }
            } else {
              result = await execute(GetPostsByAuthorDocument, { author: params.authorAddress! })
            }
            
            if (result?.data && result?.data.posts) {
              const [populatedPosts] = await Promise.all([
                populatePosts(result.data.posts)
              ])
              setPosts(populatedPosts)
        
              if (loadingToastId.current) {
                removeToast(loadingToastId.current)
                loadingToastId.current = null
              }
        
              addToast("Posts loaded successfully", { 
                type: ToastType.SUCCESS,
                duration: 3000 
              })
            } else {
              setPosts([])
            }
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
    
  }, [currentTab, params.authorAddress])

  const handleDeleteComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const loadingToastId = addToast("Deleting comment...", 
      { type: ToastType.INFO })
    deleteComment({
      ...wagmiContractConfig,      
      functionName: 'deleteComment',      
      args: [BigInt(Number(e.currentTarget.id))]
    }, {
      onSuccess: () => {
        removeToast(loadingToastId)
        addToast("Successfully deleted comment", 
          { type: ToastType.SUCCESS, duration: 3000 })
        navigate(`${Pages.POSTS}`)
      }
    })
  } 

  const formatComments = (populatedComments: PopulatedComment[]) => {
    const postComments: PostComment = {}
    const postsRepliedTo = []
    for (const comment of populatedComments) {
      if (comment.post) {
        if (postComments[comment.post.id]) {
          postComments[comment.post.id].push(comment)
        } else {
          postComments[comment.post.id] = [comment]
          postsRepliedTo.push(comment.post)
        }
      }
    }
    return { postComments, postsRepliedTo }
  }

  const switchTabs = (e: any) => {
    const tabs = Array.from(tabsContainerRef.current.children)
    tabs.forEach(tab => {
      tab.className = `${styles.tabs}`
    })
    e.target.className = `${styles.tabs} ${styles.tabsActive}`
    setCurrentTab(e.target.id)
  }

  const isAuthor = (author: string) => {
    return account.address === author
  }

  const handleCopy = () => {
    const author = params.authorAddress || "Anonymous"
    navigator.clipboard.writeText(author)
    addToast("Copied to clipboard", {
      type: ToastType.INFO, duration: 1000
    })
  }

  const handleAuthorClick = (author: string) => {
    navigate(`${Pages.PROFILE}/${author}`)
  }

  const handlePostClick = (postId: string) => {
    navigate(`${Pages.POST_DETAIL}/${postId}`)
  }

  return (
    <>
      <Header />
      {account.isConnected && <main className="relative mt-16 flex flex-col items-center mx-auto px-4 space-y-8">
        <p className="md:absolute relative top-0 -right-10 md:right-0">Member since [date]</p>
        <img src={makeBlockie(params.authorAddress!)} className="image image-profile" />
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-4xl">{ensName || "Anonymous"}</h1>
            <p className="flex justify-center space-x-1 items-center">
              <span>{displayAddress(params.authorAddress! as `0x${string}`)}</span>
              <span className='cursor-pointer' onClick={handleCopy}><Copy /></span>
            </p>
          </div>
          <p title="Click 'Edit Profile' to add a bio and photo" className="text-xl md:text-lg text-secondary-foreground">Enter bio</p>
        </div>
        <div className="flex justify-between w-full md:max-w-xs">
          <div className="flex flex-col items-center">
            <span className="stats">{posts ? posts.length : 0}</span>
            <span className="stats stats-title">posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="stats">{followers ? followers : 0}</span>
            <span className="stats stats-title">followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="stats">{following ? following : 0}</span>
            <span className="stats stats-title">following</span>
          </div>
        </div>
        <button className="button button-dark text-xl">Edit profile</button>
        <div ref={tabsContainerRef}
          className="flex justify-between w-full md:max-w-xs">
          <span onClick={switchTabs} id="posts" className={`${styles.tabs} ${styles.tabsActive}`}>Posts</span>
          <span onClick={switchTabs} id="replies" className={`${styles.tabs}`}>Replies</span>
          <span onClick={switchTabs} id="bookmarks" className={`${styles.tabs}`}>Bookmarks</span>
        </div>
        <div className={currentTab === "posts" ? "visible" : "hidden"}>
          {posts && posts.length > 0 ? <div className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
              {posts.map(post => (
                <PostItem post={post} key={post.id} />
              ))}
            </div> : <div className={styles.tabContent}>No posts found</div>}
        </div>
        <div className={currentTab === "replies" ? "visible" : "hidden"}>
          {repliedPosts && repliedPosts.length > 0 ? <div className="space-y-4">
            {repliedPosts.map(post => 
              <div key={post.id} className="space-y-2">
                <p className="flex space-x-1 items-center flex-wrap">
                  <span>Replying to </span>
                  <span onClick={() => handleAuthorClick(post.author)} className="cursor-pointer hover:underline text-secondary-foreground">
                    {ensName || displayAddress(post.author)}
                  </span>
                  <h2 onClick={() => handlePostClick(post.id)} className="cursor-pointer font-semibold text-lg">{post.title}</h2>
                </p>
                <div className="space-y-3 ml-2">
                  {replies[post.id].map(comment => 
                    <div key={comment.id} className="space-y-1">
                      <div className="flex space-x-4 items-center">
                        <p onClick={() => handleAuthorClick(comment.commenter)} className="cursor-pointer hover:underline text-sm text-secondary-foreground">
                          {displayAddress(comment.commenter)}
                        </p>
                        <p className="text-xs text-secondary-foreground">
                          {moment(new Date(Number(comment.timestamp))).fromNow()}
                        </p>
                      </div>
                      <div className="flex space-x-4">
                        <p>{comment.content}</p>
                        {isAuthor(comment.commenter) && 
                        <button id={comment.id} className="cursor-pointer" onClick={handleDeleteComment}><Trash /></button>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            </div> : <div className={styles.tabContent}>No replies yet</div>}
        </div>
        <div className={currentTab === "bookmarks" ? "visible" : "hidden"}>
          {posts && posts.length > 0 ? <div className="md:grid md:grid-cols-3 md:gap-3 md:items-stretch space-y-3 md:space-y-0">
              {posts.map(post => (
                <PostItem post={post} key={post.id} />
              ))}
            </div> : <div className={styles.tabContent}>No posts bookmarked</div>}
        </div>
      </main>}
    </>
  )
}

export default Profile