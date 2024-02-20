"use client"
import { Rating } from "flowbite-react"
import { FaUserCircle } from "react-icons/fa"

const Comment = ({ review }: any) => {
    return (
        <div className="flex flex-row border-b-2 pb-2 mb-4 items-center gap-x-8">
            <div className="w-1/12"><FaUserCircle size={42} /></div>
            <div className="w-full">
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