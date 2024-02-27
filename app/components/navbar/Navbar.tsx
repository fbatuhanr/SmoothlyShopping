import { getCurrentUser } from "@/app/actions/getCurrentUser"
import CartCount from "./CartCount"
import HamburgerMenu from "./HamburgerMenu"
import Logo from "./Logo"
import Search from "./Search"
import Account from "./Account"

const Navbar = async () => {

  const currentUser = await getCurrentUser()

  await new Promise((resolve, reject) => setTimeout(resolve, 5000))
  return (
    <div className="flex items-center justify-between gap-3 md:gap-4 px-3 md:px-10 py-2 min-h-16 bg-orange-600 text-slate-100">
      <Logo/>
      <Search/>
      <CartCount/>
      <Account currentUser={currentUser}/>
      <HamburgerMenu/>
    </div>
  )
}

export default Navbar