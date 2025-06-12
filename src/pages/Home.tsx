import { useEffect } from "react"
import { useLocation } from "react-router"
import Header from "../components/Header"
import { useToast } from "../providers/ToastProvider"
import { ToastType } from "../utils/enums"

function Home() {
  const location = useLocation()
  const { addToast } = useToast()

  useEffect(() => {
    if (location.state?.loggedIn === false) {
      addToast("No wallet connected!", {
        type: ToastType.WARNING, duration: 3000
      })
    }
  
    if (location.state?.loggedOut === true) {
      addToast("Successfully disconnected!", {
        type: ToastType.SUCCESS, duration: 3000
      })
    }
  
    if (location.state?.cancelled === true) {
      addToast("Wallet connection was cancelled. Connect to create a post.", {
        type: ToastType.WARNING, duration: 3000
      })
    }
  }, [])

  return (
    <>
    <Header />
    </>
  )
}

export default Home