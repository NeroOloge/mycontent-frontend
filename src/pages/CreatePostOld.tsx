import { useEffect, useRef } from "react"
import { QueryClient } from "@tanstack/react-query"
import Header from "../components/Header"
import { useAccount, useWriteContract } from "wagmi"
import { useNavigate } from "react-router"
import { wagmiContractConfig } from "../utils/contracts"
import { uploadPost } from "../utils/pinata"
import { Pages } from "../utils/enums"

function CreatePost() {
  const account = useAccount()
  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null!)
  const contentRef = useRef<HTMLTextAreaElement>(null!)

  const { writeContract: addPost } = useWriteContract()

  useEffect(() => {
    // if (!account.isConnected) {
    //   localStorage.setItem("status", "disconnected")
    //   navigate(`/connect`, 
    //     { state: { original: location.state.from, from: location.pathname } })
    //   return;
    // }
    // if (location.state?.from === 'connect') {
    //   addToast("Wallet connected! You can now create a post.", {
    //     type: ToastType.SUCCESS,
    //     duration: 3000
    //   })
    // }
    // if (addPostPending) {
      // notifyLoading(addPostPending)
    // }
    (async () => {
      
    })()
  }, [])

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
          // notifySuccess('Successfully published post.')
          console.log("addPost data: ", data)
          new QueryClient()
            .invalidateQueries({ queryKey: ['readContract'] });
          navigate(Pages.POSTS)
        },
        onError: (error) => {
          console.error(error)
          // notifyError(error.message.split("\n")[0])
        }
      })
    })()
  }

  return (
    <>
      <Header />
      <main className="mt-10">
        <h1 className="text-3xl font-bold text-center">Create</h1>
        <div className="space-y-3">
          <input ref={titleRef} type="text" className="w-full font-bold text-2xl p-2 focus:outline-none focus:border-b" placeholder="Title" />
          <textarea ref={contentRef} placeholder="Content" className="w-full p-2 focus:outline-none focus:border focus:rounded resize-none h-[50vh]"></textarea>
          <button onClick={() => handlePost()} className="w-full cursor-pointer bg-blue-500 rounded px-2 py-1">Publish</button>
        </div>
      </main>
    </>
  )
}

export default CreatePost