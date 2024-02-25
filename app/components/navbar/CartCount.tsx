"use client"
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks"
import { FaCartShopping, FaCircle } from "react-icons/fa6"

import { Lato } from "next/font/google"
import { Button } from "flowbite-react"
import ShoppingCart from "../cart/CartSlide"
import { useState } from "react"
import { toggleCart } from "@/libs/redux/features/cartSlice"
import { toast } from "react-toastify"

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700']
})

const CartCount = () => {

  const { items } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()

  const handleCartClick = () => {
    if (items.length <= 0) {
      toast.info("Your cart is empty!")
      return;
    }

    dispatch(toggleCart(true))
  }

  return (
    <div className="hidden md:flex">
      <button type="button" onClick={handleCartClick}
        className="flex justify-between items-center gap-x-3 text-white bg-gradient-to-br from-red-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        <div className="relative w-7 h-7">
          <div className="absolute top-0 mt-[1px]"><FaCartShopping size={27} /></div>
          {
            items &&
            <div className="absolute -top-1 -right-2">
              <div className="relative">
                <FaCircle size={19} color="#ffffff" className="border rounded-full border-orange-600" />
                <div className="absolute w-full text-center -top-1 mt-[2.75px]">
                  <span className={`${lato.className} text-xs text-slate-800 font-bold`}>
                    {items.length < 10 ? items.length : "9+"}
                  </span>
                </div>
              </div>
            </div>
          }

        </div>
        <div>
          <p className="mt-[1px] text-base font-medium">Cart</p>
        </div>
      </button>
    </div>
  )
}

export default CartCount