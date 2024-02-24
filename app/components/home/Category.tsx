"use client"

import { FaHome } from "react-icons/fa"
import { FaComputer, FaDumbbell, FaKitchenSet } from "react-icons/fa6"
import { IoDiamond } from "react-icons/io5"
const Category = () => {
    
    const productCategories = [
        {
            title: "Home",
            icon: <FaHome />
        },
        {
            title: "Kitchen",
            icon: <FaKitchenSet />
        },
        {
            title: "Electronic",
            icon: <FaComputer />
        },
        {
            title: "Fashion",
            icon: <IoDiamond />
        },
        {
            title: "Sports",
            icon: <FaDumbbell />
        }
    ]

  return (
    <div className="flex items-center justify-center px-3 md:px-10 gap-3 md:gap-6 py-5 md:py-8 overflow-x-auto">
        {
            productCategories.map((category, index) => 
                <div key={index} className="text-medium font-semibold border text-slate-500 rounded-full min-w-[130px] flex items-center justify-center cursor-pointer gap-x-2 px-4 py-2 text-center">
                    {category.icon}
                    {category.title}
                </div>
            )
        }
    </div>
  )
}

export default Category