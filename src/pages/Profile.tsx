import { useLocation, useNavigate } from "react-router"
import makeBlockie from 'ethereum-blockies-base64';
import Header from "../components/Header"
import { useEffect, useRef, useState } from "react"
import { useToast } from "../providers/ToastProvider"
import { Pages, ToastType } from "../utils/enums"
import { useAccount, useEnsName } from "wagmi"
import { displayAddress } from "../utils/functions"

function Profile() {
  const location = useLocation()
  const account = useAccount()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const tabsContainerRef = useRef<HTMLDivElement>(null!)
  const [currentTab, setCurrentTab] = useState<string>("posts")

  const { data: ensName } = useEnsName({
    address: account.address!,
    query: {
      enabled: !!account.address,
    }
  })

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
  }, [account.isConnected])

  const switchTabs = (e: any) => {
    const tabs = Array.from(tabsContainerRef.current.children)
    tabs.forEach(tab => {
      tab.className = "tabs"
    })
    e.target.className = "tabs tabs-active"
    setCurrentTab(e.target.id)
  }

  return (
    <>
      <Header />
      {account.isConnected && <main className="relative mt-16 flex flex-col items-center mx-auto px-4 space-y-8">
        <p className="md:absolute relative top-0 -right-10 md:right-0">Member since [date]</p>
        <img src={makeBlockie(account.address!)} className="image image-profile" />
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-4xl">{ensName || "Anonymous"}</h1>
            <p>{displayAddress(account.address!)}</p>
          </div>
          <p title="Click 'Edit Profile' to add a bio and photo" className="text-xl md:text-lg text-secondary-foreground">Enter bio</p>
        </div>
        <div className="flex justify-between w-full md:max-w-xs">
          <div className="flex flex-col items-center">
            <span className="stats">0</span>
            <span className="stats stats-title">posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="stats">0</span>
            <span className="stats stats-title">followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="stats">0</span>
            <span className="stats stats-title">following</span>
          </div>
        </div>
        <button className="button button-dark text-xl">Edit profile</button>
        <div ref={tabsContainerRef}
          className="flex justify-between w-full md:max-w-xs">
          <span onClick={switchTabs} id="posts" className="tabs tabs-active">Posts</span>
          <span onClick={switchTabs} id="replies" className="tabs">Replies</span>
          <span onClick={switchTabs} id="bookmarks" className="tabs">Bookmarks</span>
        </div>
        <div className={currentTab === "posts" ? "visible" : "hidden"}>Posts</div>
        <div className={currentTab === "replies" ? "visible" : "hidden"}>Replies</div>
        <div className={currentTab === "bookmarks" ? "visible" : "hidden"}>Bookmarks</div>
      </main>}
    </>
  )
}

export default Profile