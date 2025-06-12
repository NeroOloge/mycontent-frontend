import { useLocation, useNavigate } from "react-router"
import { Connector, useAccount, useConnect } from "wagmi"
import { Pages } from "../utils/enums"

function ModalContent({ onClose }: { onClose: any }) {
  const navigate = useNavigate()
  const account = useAccount()
  const location = useLocation()
  const { connectors, connect } = useConnect()

  const connectToBlockchain = (connector: Connector) => {
    connect({ connector }, {
      onSuccess: function(data) {
        localStorage.setItem("status", "connected")
        const page = location.state?.from || `${Pages.PROFILE}/${data.accounts[0]}`
        navigate(page, { state: { from: 'connect', loggedIn: true } })
      }
    })
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Connect with</h3>
      <div className="mt-2">
        <p className="text-sm space-x-2">
          {connectors.map((connector) => (
          <button className="button button-connections" key={connector.uid} onClick={() => connectToBlockchain(connector)}
            >{connector.name}</button>
          ))}
        </p>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button
          type="button"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => onClose()}
        >
          Cancel
        </button>
        {/* <button
          type="button"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          onClick={() => {
            // Handle action
            setIsModalOpen(false);
          }}
        >
          Confirm
        </button> */}
      </div>
    </div>
  )
}

export default ModalContent