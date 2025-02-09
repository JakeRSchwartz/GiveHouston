import { ReactNode } from 'react'
import '../../styles/reusable.styles.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

function ReusableModal ({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <button onClick={onClose} className='close-btn'>
          ✖
        </button>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  )
}
export default ReusableModal
