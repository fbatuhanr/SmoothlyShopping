"use client"

import { FaMinus, FaPlus } from "react-icons/fa6";
import { CartProductProps } from "../detail/DetailClient";

interface CounterProps {
    cartProduct: CartProductProps,
    handleIncrease: () => void,
    handleDecrease: () => void
}

const Counter: React.FC<CounterProps> = ({ cartProduct, handleIncrease, handleDecrease }) => {
    return (
        <div className="w-28">
            <div className="flex flex-row w-full h-10 bg-transparent rounded-lg">
                <button 
                    className="w-20 h-full text-gray-600 bg-neutral-300 border-neutral-300 border-r rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300"
                    onClick={handleDecrease}>
                    <FaMinus className="m-auto" />
                </button>
                <div className="w-full h-full flex items-center justify-center border-y-2 border-neutral-300 font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none">
                    <div className="text-xl">{cartProduct.quantity}</div>
                </div>
                <button 
                    className="w-20 h-full text-gray-600 bg-neutral-300 border-neutral-300 border-l rounded-r outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300"
                    onClick={handleIncrease}>
                    <FaPlus className="m-auto" />
                </button>
            </div>
        </div>
    )
}

export default Counter