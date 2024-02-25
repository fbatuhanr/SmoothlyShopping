"use client"

interface ButtonProps {
    text?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    isPrimary?: boolean
    small?: boolean
    outlined?: boolean
    icon?: JSX.Element
    disabled?: boolean
}

const Button:React.FC<ButtonProps> = ({text, onClick, isPrimary, outlined, icon, disabled}) => {
  return (
    <button className={`flex justify-center items-center gap-x-1 w-full px-4 py-3 text-center font-medium border rounded-xl ${isPrimary ? "text-orange-600 bg-orange-100 border-orange-600 hover:bg-orange-500 hover:text-gray-100" : "text-gray-100 bg-orange-600 border-transparent hover:border-orange-500 hover:text-orange-700 hover:bg-orange-100"} ${outlined ? "bg-transparent" : ""}`} 
        onClick={onClick}
        disabled={disabled}>
        {icon}
        {text}
    </button>
  )
}

export default Button