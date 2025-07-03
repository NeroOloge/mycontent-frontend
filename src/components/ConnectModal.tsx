import { Connector, useConnect } from "wagmi"
import useDrafts from "../hooks/useDrafts";

type Props = {
  onClose: any;
  setIsConnectOpen: any;
  setIsSyncOpen: any;
}

function ConnectModal({ onClose, setIsConnectOpen, setIsSyncOpen }: Props) {
  const { connectors, connect } = useConnect()

  const drafts = useDrafts(true)

  const connectToBlockchain = (connector: Connector) => {
    connect({ connector }, {
      onSuccess: function() {
        if (drafts.length > 0) {
          setIsConnectOpen(false)
          setIsSyncOpen(true)
        } else {
          onClose()
        }
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

export default ConnectModal