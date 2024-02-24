import { FaCartShopping } from "react-icons/fa6"
import { MdCreate, MdDashboard } from "react-icons/md"
import AdminSidebarItem from "./AdminSidebarItem"

const AdminSidebar = () => {

  const navItems = [
    {
      title: "Dashboard",
      icon: <MdDashboard/>,
      redirectUrl: "/admin"
    },
    {
      title: "Products",
      icon: <MdCreate/>,
      redirectUrl: "/admin/products"
    },
    {
      title: "Orders",
      icon: <FaCartShopping/>,
      redirectUrl: "/admin/orders"
    }
  ]

  return (
    <div className="w-1/5 border-r min-h-screen bg-orange-600 p-5">
        {
          navItems.map((item, index) =>
            <AdminSidebarItem key={index} title={item.title} icon={item.icon} redirectUrl={item.redirectUrl}/>
          )
        }
    </div>
  )
}

export default AdminSidebar