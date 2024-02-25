"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface UserSidebarItemProps {
    title: string,
    icon?: JSX.Element,
    redirectUrl: string
}
const UserSidebarItem = ({title, icon, redirectUrl}: UserSidebarItemProps) => {
  const pathname = usePathname()
  const isActive = pathname == redirectUrl
  return (
    <Link href={redirectUrl} className={`${isActive ? "ms-2 font-semibold border-b-2 border-white text-white" : "ms-0 font-normal border-b border-gray-200 text-gray-200"} flex items-center gap-2 py-1 my-2 text-lg hover:border-gray-50 hover:text-gray-50`}>
        {icon}
        {title}
    </Link>
  )
}

export default UserSidebarItem