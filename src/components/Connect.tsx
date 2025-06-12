import { useEffect } from "react";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import { useNavigate, useLocation } from "react-router";

function Connect() {
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    
  }, [])

  const onClose = () => {
    const page = location.state?.original
    if (page)
      navigate(`${page}`, { state: { cancelled: true } })
    else
      history.back()
  }

  return (
    <Modal isOpen={true} onClose={() => onClose()}>
      <ModalContent onClose={() => onClose()} />
    </Modal>
  )
}

export default Connect;