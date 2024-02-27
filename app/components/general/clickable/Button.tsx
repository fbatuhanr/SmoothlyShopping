"use client"

import { ClickableProps, colorAdjustment } from "./types"

const Button: React.FC<ClickableProps> = ({ text, iconBegin, iconEnd, onClick, disabled, color, size, outlined, uppercased, innerWidth, innerHeight, className }) => {

  const colorClass = colorAdjustment(color, outlined)

  return (
    <button className={`${colorClass} ${size && "text-"+size} ${uppercased && "uppercase"} ${disabled && "pointer-events-none"} ${innerWidth && "px"+innerWidth} ${innerHeight && "py-"+innerHeight} flex flex-row justify-center items-center gap-x-1 w-full rounded font-semibold px-4 ${className}`}
      onClick={onClick}
      disabled={disabled}>
      { iconBegin && <div className="scale-125">{iconBegin}</div> }
      {text}
      { iconEnd && <div className="scale-125">{iconEnd}</div> }
    </button>
  )
}

export default Button