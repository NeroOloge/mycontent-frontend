import { NavLink, useNavigate } from "react-router"
import { useAccount, useDisconnect } from "wagmi"
import { Pages } from "../utils/enums"

function Header({ active }: { active?: Pages }) {
  const navigate = useNavigate()
  const account = useAccount()
  const { disconnect } = useDisconnect()
  
  const handleClick = () => {
    disconnect({}, {
      onSuccess: function() {
        localStorage.setItem("status", "disconnected")
        navigate("/")
      }
    })
  }

  return (
    <header className="space-y-5 ">
        {account.status === 'connected' && <nav className="flex flex-col md:flex-row rounded-md justify-between items-center bg-gray-700 px-3 py-3 sticky text-center top-0 w-[100%]">
          <div className="block md:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div className="block flex-grow md:flex md:items-center">
            <div className="text-sm md:flex-grow md:space-x-6">
              <NavLink to={"/posts"}><a className={`${active === Pages.POSTS && "text-blue-500"} header-link`}>Posts</a></NavLink>
              <NavLink to={"/explore"}><a className={`${active === Pages.EXPLORE && "text-blue-500"} header-link`}>Explore</a></NavLink>
              <NavLink to={"/create-post"}><a className={`${active === Pages.CREATE_POST && "text-blue-500"} header-link`}>Create Post</a></NavLink>
              <NavLink to={"/profile"}><a className={`${active === Pages.PROFILE && "text-blue-500"} header-link`}>Profile</a></NavLink>
            </div>
          </div>
          <button onClick={() => handleClick()} className="bg-blue-500 cursor-pointer text-white px-3 py-2 mr-2 rounded-md">
            Disconnect
          </button>
        </nav>}
      </header>
  )
}

export default Header