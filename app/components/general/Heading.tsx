"use client"

interface HeadingProps {
  text: string
  subText?: string
  border?: boolean
  center?: boolean
  className?: string
}

const Heading: React.FC<HeadingProps> = ({ text, subText, border, center, className }) => {
  return (
    <div className={`${border && "border-b"} pb-6 mb-6 ${center && "text-center"} ${className && className}`}>
      <div className="text-2xl">{text}</div>
      {
        subText && <div className="text-sm text-gray-400">{subText}</div>
      }
    </div>
  )
}

export default Heading