"use client"

import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface CategoryListProps {
    activeCategory?: string
    categories: Array<Category>
}

const CategoryList:React.FC<CategoryListProps> = ({activeCategory, categories}) => {

    return (
        <div className="flex items-center justify-center w-full px-3 md:px-10 gap-2 md:gap-4 py-8 overflow-x-auto">
            {
                categories.map((category:Category) => {

                    let categoryUrl = encodeURI(category.title)
                    let targetUrl = `/category/${categoryUrl}/?id=${category.id}`
                    let isActive = category.title == activeCategory
                    return <Link href={targetUrl} key={category.id} className={`${isActive ? "bg-white border-gray-400 px-5 py-3 shadow-sm shadow-slate-200" : "bg-slate-100 border-gray-200 px-4 py-2"} border text-slate-800  rounded-full min-w-[130px] flex items-center justify-center gap-x-2`}>
                        <div className="relative w-5 h-5"><Image src={category.logo} alt={category.title} fill className="object-contain object-center" /></div>
                        <div className={`${isActive ? "text-xl font-extrabold" : "text-lg font-semibold"}`}>{category.title}</div>
                    </Link>
                }
                )
            }
        </div>
    )
}

export default CategoryList