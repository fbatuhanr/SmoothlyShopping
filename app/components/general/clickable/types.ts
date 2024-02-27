export interface ClickableProps {
    text?: string
    iconBegin?: JSX.Element
    iconEnd?: JSX.Element
    target?: string | ""
    onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
    disabled?: boolean
    color?: "primary" | "secondary" | "tertiary" | "quaternary" | "transparent" | null
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"
    outlined?: boolean
    uppercased?: boolean
    innerWidth?: number
    innerHeight?: number
    className?: string
}

export const colorAdjustment = (color?: string | null, outlined?: boolean) => {

    switch (color) {
      case "primary":
        return `text-orange-600 bg-orange-100 hover:text-gray-100 hover:bg-orange-500 ${outlined && "border border-orange-600 hover:border-orange-400"}`
    
        case "secondary":
          return `text-gray-100 bg-orange-600 hover:text-orange-700 hover:bg-orange-100 ${outlined && "border border-orange-600 hover:border-orange-500"}`
          
      case "tertiary": 
          return `text-white bg-indigo-500 hover:bg-indigo-600 ${outlined && "border border-indigo-600 hover:border-indigo-800"}`
  
      case "quaternary":
        return `text-white bg-red-500 hover:bg-red-600 ${outlined && "border border-red-600 hover:border-red-800"}`

      case "transparent":
        return `bg-transparent ${outlined && "border border-orange-600 hover:border-orange-500"}`
  
      default:
        return `text-orange-600 bg-orange-100 hover:text-gray-100 hover:bg-orange-500 ${outlined && "border border-orange-600 hover:border-orange-400"}`
    }
}