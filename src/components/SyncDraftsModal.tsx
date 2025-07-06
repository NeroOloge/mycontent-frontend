type Props = {
  onClose: any;
  onConfirm: any;
}

function SyncDraftsModal({ onClose, onConfirm }: Props) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Welcome</h3>
      <div className="mt-2">
        <p className="text-sm space-x-2 text-gray-900">
          You have local drafts, sync them to a DB?
        </p>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button
          type="button"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => onClose()}
        >
          No
        </button>
        <button
          type="button"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          onClick={() => {
            // Handle action
            onConfirm();
          }}
        >
          Yes
        </button>
      </div>
    </div>
  )
}

export default SyncDraftsModal