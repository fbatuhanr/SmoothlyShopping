"use client"
import { Review } from "@prisma/client"
import { Rating } from "flowbite-react"
import Image from "next/image"
import { FaUserCircle } from "react-icons/fa"

const Comment = ({review}: any) => {
    return (
        <div className="flex flex-row border-b-2 pb-2 mb-4 items-center gap-x-4">
            <div className="w-12 h-12 relative">
                {
                    review?.user.image 
                    ? <Image src={review?.user.image} alt={review?.user.name} fill className="object-cover object-center rounded-full border-2" />
                    : <FaUserCircle size={48} />
                }
            </div>
            <div className="w-auto">
                <div className="flex justify-between items-center text-lg font-medium">
                    <div><h6>{review?.user.name}</h6></div>
                    <div><Rating><Rating.Star /><p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{review.rating}</p></Rating></div>
                </div>
                <div className="text-md">
                    <p>{review?.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment