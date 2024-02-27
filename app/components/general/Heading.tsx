"use client"

interface HeadingProps {
    text: string
    center?: boolean
}

const Heading:React.FC<HeadingProps> = ({text, center}) => {
  return (
    <div className={`text-4xl py-2 font-medium text-slate-600 ${center ? "text-center" : "text-start"}`}>
        {text}
    </div>
  )
}

export default Heading