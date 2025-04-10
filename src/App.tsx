import { useEffect, useRef } from "react"
import { NavLink, useNavigate } from "react-router"
import { useAccount, useConnect, useDisconnect, Connector } from "wagmi"

function App() {
  const navigate = useNavigate()
  const account = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const connectionsRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (account.isConnected) {
      navigate("/profile")
    }
  }, [])
  
  const handleClick = () => {
    const connections = connectionsRef.current
    if (account.status === 'connected') return disconnect()
    connections.style.display = "block"
  }

  const connectToBlockchain = (connector: Connector) => {
    connect({ connector }, {
      onSuccess: function() {
        localStorage.setItem("status", "connected")
        navigate("/profile")
      }
    })
  }

  return (
    <>
      <header className="space-y-5">
        {account.status === 'connected' && <nav className="flex flex-col md:flex-row rounded-md justify-between items-center bg-gray-700 px-3 py-3 sticky text-center top-0 w-[100%]">
          <div className="block md:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div className=" block flex-grow md:flex md:items-center">
            <div className="text-sm md:flex-grow md:space-x-6">
              <NavLink to={"/"}><a className="block cursor-pointer md:inline-block md:mt-0">Home</a></NavLink>
              <NavLink to={"/explore"}><a className="block cursor-pointer md:inline-block md:mt-0">Explore</a></NavLink>
              <NavLink to={"/create-post"}><a className="block cursor-pointer md:inline-block md:mt-0">Create Post</a></NavLink>
              <NavLink to={"/profile"}><a className="block cursor-pointer md:inline-block md:mt-0">Profile</a></NavLink>
            </div>
          </div>
          <button onClick={() => handleClick()} className="bg-blue-500 cursor-pointer text-white px-3 py-2 mr-2 rounded-md">
            {account.status === 'connected' ? "Disconnect" : "Connect"}
          </button>
        </nav>}
        <h1 className="font-bold text-2xl md:text-3xl text-left md:text-center">Welcome to MyContent, your decentralised blogging platform</h1>
        <h3 className="text-left md:text-center text-lg md:text-xl">Empowering Writers with Blockchain Technology</h3>
        <div className="text-center">
          <button onClick={() => handleClick()} className="text-xl cursor-pointer bg-blue-500 px-3 py-2 rounded-md">Connect Ethereum Wallet</button>
        </div>
      </header>
      <main className="space-y-5">
        <p className="md:px-40 mt-10 text-left md:text-center">
        MyContent is a decentralized blogging platform where you can publish,
        share, and monetize your content without intermediaries. Connect 
        your Ethereum wallet to get started.
        </p>
        <ul className="list-disc mt-10 space-y-3 grid grid-cols-1 md:grid-cols-3">
          <li>Fully decentralized and secure</li>
          <li>Monetize your content with cryptocurrency</li>
          <li>Ownership and control over your data</li>
        </ul>
        {account.status === 'disconnected' && <div ref={connectionsRef} className="text-center hidden space-x-3" id="connections">
          {connectors.map((connector) => (
            <button className="bg-green-700 rounded-md p-2 cursor-pointer" key={connector.uid} onClick={() => connectToBlockchain(connector)}
            >{connector.name}</button>
          ))}
        </div>}
      </main>
    </>
  )
}

export default App
