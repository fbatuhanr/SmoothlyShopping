"use client"

import Link from "next/link"
import { ClickableProps, colorAdjustment } from "./types"

const LinkButton: React.FC<ClickableProps> = ({ text, iconBegin, iconEnd, target, onClick, disabled, color, size, outlined, uppercased, innerWidth, innerHeight, className }) => {

  const colorClass = colorAdjustment(color, outlined)

  return (
    <Link className={`${colorClass} ${size && "text-"+size} ${uppercased && "uppercase"} ${disabled && "pointer-events-none"} ${innerWidth && "px"+innerWidth} ${innerHeight && "py-"+innerHeight} flex flex-row justify-center items-center gap-x-1 w-full rounded font-semibold ${className}`}
      onClick={onClick}
      href={!disabled ? (target ? target : "") : ""}>
      { iconBegin && <div className="scale-125">{iconBegin}</div> }
      {text}
      { iconEnd && <div className="scale-125">{iconEnd}</div> }
    </Link>
  )
}

export default LinkButton