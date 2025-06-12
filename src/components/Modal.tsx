function Modal(
    { isOpen, onClose, children }: {isOpen: boolean; onClose: any; children: any}
  ) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-primary bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Modal content */}
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {children}
          
          {/* Close button (optional) */}
          <button 
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal