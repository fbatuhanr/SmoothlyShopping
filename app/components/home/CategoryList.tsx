"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaHome } from "react-icons/fa"
import { FaComputer, FaDumbbell, FaKitchenSet } from "react-icons/fa6"
import { IoDiamond } from "react-icons/io5"

const CategoryList = ({activeCategory}:{activeCategory?:string}) => {

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
        <div className="flex items-center justify-center px-3 md:px-10 gap-2 md:gap-4 py-5 md:py-8 overflow-x-auto">
            {
                productCategories.map((category, index) => {

                    let categoryUrl = encodeURI(category.title)
                    let targetUrl = `/category/${categoryUrl}`
                    let isActive = category.title == activeCategory
                    return <Link href={targetUrl} key={index} className={`${isActive ? "font-bold border-gray-600" : "font-medium"} border text-slate-600 rounded-full min-w-[130px] flex items-center justify-center gap-x-2 px-4 py-2 text-center`}>
                        {category.icon}
                        {category.title}
                    </Link>
                }
                )
            }
        </div>
    )
}

export default CategoryList