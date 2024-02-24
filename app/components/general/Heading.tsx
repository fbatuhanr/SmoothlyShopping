
interface HeadingProps {
    center?: boolean
    text: string
    spacex?: number | 0
    spacey?: number | 0
}

const Heading:React.FC<HeadingProps> = ({center, text, spacex, spacey}) => {
  return (
    <div className={`text-4xl font-medium text-slate-600 ${center ? "text-center" : "text-start"} px-${spacex} py-${spacey}`}>
        {text}
    </div>
  )
}

export default Heading