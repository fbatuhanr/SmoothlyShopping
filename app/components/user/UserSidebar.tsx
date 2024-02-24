import { FaCartShopping } from "react-icons/fa6"
import { MdCreate, MdDashboard } from "react-icons/md"
import UserSidebarItem from "./UserSidebarItem"

const UserSidebar = () => {

  const navItems = [
    {
      title: "Account",
      icon: <MdDashboard/>,
      redirectUrl: "/user"
    }
  ]

  return (
    <div className="w-1/5 border-r min-h-screen bg-orange-600 p-5">
        {
          navItems.map((item, index) =>
            <UserSidebarItem key={index} title={item.title} icon={item.icon} redirectUrl={item.redirectUrl}/>
          )
        }
    </div>
  )
}

export default UserSidebar