"use client"
import { useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter()
  return (
    <div onClick={() => router.push('/')} className="text-white bg-gradient-to-br from-red-500 to-orange-400 hover:bg-gradient-to-bl px-3 py-2 rounded-lg cursor-pointer">
      <h1 className="text-2xl font-semibold">Smoothly Shopping</h1>
    </div>
  )
}

export default Logo