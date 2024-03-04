"use client"

interface HeadingProps {
  text: string
  textSize?: string
  subText?: string
  subTextSize?: string

  border?: boolean
  center?: boolean
  className?: string
}

const Heading: React.FC<HeadingProps> = ({ text, textSize, subText, subTextSize, border, center, className }) => {
  return (
    <div className={`${border && "border-b"} pb-6 mb-6 ${center && "text-center"} ${className && className}`}>
      <div className={`${textSize ? `text-${textSize}` : "text-2xl"}`}>{text}</div>
      {
        subText && <div className={`${subTextSize ? `text-${subTextSize}` : "text-sm"} text-gray-400`}>{subText}</div>
      }
    </div>
  )
}

export default Heading