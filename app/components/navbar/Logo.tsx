"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"

const Logo = () => {

  const { data } = useSession()
  
  return (
    <Link href="/" className="text-white bg-gradient-to-br from-red-500 to-orange-400 hover:bg-gradient-to-bl px-3 py-2 rounded-lg cursor-pointer">
      <h1 className="text-2xl font-semibold">Smoothly Shopping</h1>
    </Link>
  )
}

export default Logo