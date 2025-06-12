import { NavLink, useLocation, useNavigate } from "react-router"
import { useAccount, useDisconnect } from "wagmi"
import { Pages } from "../utils/enums"
import Hamburger from "../icons/Hamburger"
import { useState } from "react"
import useDraft from "../hooks/useDraft"

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const account = useAccount()
  const { disconnect } = useDisconnect()
  const [menuOpen, setMenuOpen] = useState(false)

  const drafts = useDraft()

  const openMenu = () => {
    setMenuOpen(prev => !prev)
  }
  
  const handleDisconnect = () => {
    disconnect({}, {
      onSuccess: function() {
        localStorage.setItem("status", "disconnected")
        navigate(Pages.HOME, { state: { loggedOut: true } })
      }
    })
  }

  return (
    <header className="space-y-5 mb-5">
      <nav className="md:text-sm w-[100%] flex justify-between">
        <div onClick={openMenu} className="md:hidden self-start"><Hamburger /></div>
        <div className={`${menuOpen ? "flex" : "hidden"} md:flex md:space-x-10 space-x-2`}>
          <div className="md:space-x-5 grid grid-cols-1 gap-2 md:flex">
            <NavLink to={Pages.HOME} state={{ from: location.pathname }} 
              className={({ isActive }) => (isActive ? 'active' : 'header-link')}>Home</NavLink>
            <NavLink to={Pages.ABOUT} state={{ from: location.pathname }} 
              className="header-link">About</NavLink>
            <NavLink to={Pages.EXPLORE} state={{ from: location.pathname }} 
              className="header-link">Explore</NavLink>
            <NavLink to={Pages.CREATE_POST} state={{ from: location.pathname }} 
              className="header-link">Create</NavLink>
            {drafts.length > 0 && <NavLink to={Pages.DRAFTS} state={{ from: location.pathname }} 
              className="header-link">Drafts ({drafts.length})</NavLink>}
          </div>
          {account.isConnected && <div className="md:space-x-5 grid grid-cols-1 gap-2 md:flex">
            <NavLink to={`${Pages.PROFILE}/${account.address!}`} state={{ from: location.pathname }} 
              className="header-link">Profile</NavLink>
            <NavLink to={Pages.DASHBOARD} state={{ from: location.pathname }} 
              className="header-link">Dashboard</NavLink>
          </div>}
        </div>
        {account.isConnected ? 
        <button className="button button-connect" onClick={() => handleDisconnect()}>
          Disconnect
        </button> : 
        <button className="button button-connect" onClick={() => navigate(Pages.CONNECT)}>
          Connect Wallet
        </button>}
      </nav>
      <hr className="text-secondary" />
    </header>
  )
}

export default Header