import { FaUser } from "react-icons/fa6"

const User = () => {
  return (
    <div className="hidden md:flex">
      <button type="button" className="flex justify-between items-center gap-x-3 text-white bg-gradient-to-br from-red-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        <div className="relative w-7 h-7">
          <div className="absolute top-0 mt-[1px]"><FaUser size={26}/></div>          
        </div>
        <div>
          <p className="mt-[1px] text-base font-medium">Login</p>
        </div>
      </button>
    </div>
  )
}

export default User