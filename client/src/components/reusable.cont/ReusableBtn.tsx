import React from 'react'
import '../../styles/reusable.styles.css'
interface ButtonProps {
  children: React.ReactNode
  onClick?: (e?: React.FormEvent | React.FormEventHandler | undefined) => void
  type?: 'button' | 'submit' | 'reset'
  className?: 'genericBtn' | 'submitBtn' | 'cancelBtn' | 'deletebtn' | 'addBtn'
  disabled?: boolean | false
  styles?: React.CSSProperties
}

const ReusableBtn: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  className,
  disabled,
  styles = {}
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      disabled={disabled}
      style={{ ...styles }}
    >
      {children}
    </button>
  )
}

export default ReusableBtn
