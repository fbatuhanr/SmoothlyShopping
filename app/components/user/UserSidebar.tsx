
import { FaHeart, FaPerson } from "react-icons/fa6"
import UserSidebarItem from "./UserSidebarItem"
import { FaAddressBook, FaUser } from "react-icons/fa"
import { FiPackage } from "react-icons/fi"
import { MdPayment } from "react-icons/md"

const UserSidebar = () => {

  const navItems = [
    {
      title: "Orders",
      icon: <FiPackage/>,
      redirectUrl: "/user/orders"
    },
    {
      title: "Wish List",
      icon: <FaHeart/>,
      redirectUrl: "/user/wishlist"
    },
    {
      title: "Personal Info",
      icon: <FaUser/>,
      redirectUrl: "/user"
    },
    {
      title: "Addresses",
      icon: <FaAddressBook />,
      redirectUrl: "/user/addresses"
    },
    {
      title: "Payment Methods",
      icon: <MdPayment />,
      redirectUrl: "/user/payment-methods"
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