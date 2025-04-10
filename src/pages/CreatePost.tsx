import { useEffect, useRef } from "react"
import { QueryClient } from "@tanstack/react-query"
import Header from "../components/Header"
import { Pages } from "../utils/enums"
import { useAccount, useWriteContract } from "wagmi"
import { useNavigate } from "react-router"
import { wagmiContractConfig } from "../utils/contracts"
import { uploadPost } from "../utils/pinata"

function CreatePost() {
  const account = useAccount()
  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null!)
  const contentRef = useRef<HTMLTextAreaElement>(null!)

  const notifyRef = useRef<HTMLDivElement>(null!)

  const { writeContract: addPost, isPending: addPostPending } = useWriteContract()

  useEffect(() => {
    if (!account.isConnected) {
      localStorage.setItem("status", "disconnected")
      alert("No wallet connected")
      navigate("/")
    }
    if (addPostPending) {
      notifyLoading(addPostPending)
    }
    (async () => {
      
    })()
  }, [addPostPending])

  const handlePost = () => {
    (async () => {
      const title = titleRef.current.value
      const content = contentRef.current.value
      const timestamp = Date.now()
      const fileName = account.address + " " + timestamp
      const data = await uploadPost({
        title, content, author: account.address!, timestamp
      }, fileName)

      addPost({
        ...wagmiContractConfig,
        functionName: 'addPost',
        args: [data.cid, BigInt(timestamp)],
      }, {
        onSuccess: (data) => {
          notifySuccess('Successfully published post.')
          console.log("addPost data: ", data)
          new QueryClient()
            .invalidateQueries({ queryKey: ['readContract'] });
          navigate("/posts")
        },
        onError: (error) => {
          console.error(error)
          notifyError(error.message.split("\n")[0])
        }
      })
    })()
  }

  const notifyLoading = (isPending: boolean) => {
    notifyRef.current.innerText = 'Loading...'
    notifyRef.current.style.backgroundColor = '#6a7282'
    for (let i = 0; i <= 100; i+=10) {
      notifyRef.current.style.opacity = `${i}`
    }

    if (!isPending) {
      for (let i = 100; i >= 0; i-=10) {
        notifyRef.current.style.opacity = `${i}`
      }
    }
  }

  const notifyError = (error: string) => {
    notifyRef.current.innerText = error
    notifyRef.current.style.backgroundColor = '#fb2c36'
    for (let i = 0; i <= 100; i+=10) {
      notifyRef.current.style.opacity = `${i}`
    }
    setTimeout(() => {
      for (let i = 100; i >= 0; i--) {
        notifyRef.current.style.opacity = `${i}`
      }
    }, 2000)
  }

  const notifySuccess = (success: string) => {
    notifyRef.current.innerText = success
    notifyRef.current.style.backgroundColor = '#00c951'
    for (let i = 0; i <= 100; i+=10) {
      notifyRef.current.style.opacity = `${i}`
    }
    setTimeout(() => {
      for (let i = 100; i >= 0; i--) {
        notifyRef.current.style.opacity = `${i}`
      }
    }, 2000)
  }

  return (
    <>
      <Header active={Pages.CREATE_POST} />
      <main className="mt-10">
        <h1 className="text-3xl font-bold text-center">Create</h1>
        <div className="space-y-3">
          <input ref={titleRef} type="text" className="w-full font-bold text-2xl p-2 focus:outline-none focus:border-b" placeholder="Title" />
          <textarea ref={contentRef} placeholder="Content" className="w-full p-2 focus:outline-none focus:border focus:rounded resize-none h-[50vh]"></textarea>
          <button onClick={() => handlePost()} className="w-full cursor-pointer bg-blue-500 rounded px-2 py-1">Publish</button>
        </div>
        <div ref={notifyRef} 
          className="fixed top-[50vh] z-10 bg-gray-500 opacity-0 rounded w-[90%] text-center">Notify</div>
      </main>
    </>
  )
}

export default CreatePost