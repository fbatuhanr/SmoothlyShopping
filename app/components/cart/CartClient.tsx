"use client"

import { useAppDispatch, useAppSelector } from "@/libs/hooks"
import { CartProductProps } from "../detail/DetailClient"
import Image from "next/image"
import { removeFromCart, updateCart } from "@/libs/features/cartSlice"
import Link from "next/link"
import Swal from "sweetalert2";
import { FaMinus, FaPlus } from "react-icons/fa6"
import priceFormat from "@/utils/PriceFormat"
import { useRef, useState } from "react"
import { FaLongArrowAltLeft } from "react-icons/fa"


interface ShippingOptionsProps {
    type: string,
    fee: number
}
const CartClient = () => {

    const { items } = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()

    const itemsCost: number = items?.reduce((acc: number, item: CartProductProps) => acc + item.price * item.quantity, 0) || 0
    
    const shippingOptions: Array<ShippingOptionsProps> = [
        {
            type: "Standard",
            fee: 9.90
        },
        {
            type: "Priority",
            fee: 29.90
        }
    ]
    const [shippingOption, setShippingOption] = useState<String>(shippingOptions[0].type)
    const shippingFee = shippingOptions?.find(i => i?.type == shippingOption)?.fee || 0

    const totalCost: number = itemsCost + shippingFee
    const itemQtyRefs = useRef<Array<HTMLInputElement>>([])


    const handleImageDisplay = (title: string, imageUrl: string) => {

        Swal.fire({
            title,
            imageUrl,
            imageWidth: 400,
            imageAlt: title,
            showConfirmButton: false,
            showCloseButton: true
        });
    }
    const handleChangeItemQty = (index: number, id: string, amount: number) => {

        const currQty = Number(itemQtyRefs.current[index].value)
        if ((currQty >= 9 && amount > 0) || (currQty <= 1 && amount < 0)) return

        const resultQty = currQty + amount
        itemQtyRefs.current[index].value = String(resultQty)

        dispatch(updateCart([id, resultQty]))
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">{items && items.length} Items</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                    </div>

                    {
                        items && items.map((item: CartProductProps, index: number) =>

                            <div key={item.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                <div className="flex w-2/5">
                                    <div className="relative w-20">
                                        <Image src={item.image} onClick={() => handleImageDisplay(item.title, item.image)} alt={item.title} fill className="object-contain cursor-pointer" />
                                    </div>
                                    <div className="flex flex-col justify-between ml-4 flex-grow">
                                        <Link href={`product/${item.id}`}><span className="font-bold text-sm">{item.title}</span></Link>
                                        <span className="text-red-500 text-xs">&nbsp;</span>
                                        <button type="button" onClick={() => dispatch(removeFromCart(item.id))} className="flex font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-1/5">
                                    <button type="button" onClick={() => handleChangeItemQty(index, item.id, -1)}><FaMinus /></button>
                                    <input className="w-12 mx-2 border text-center"
                                        type="text"
                                        ref={e => itemQtyRefs.current[index] = e!}
                                        defaultValue={item.quantity}
                                        readOnly
                                    />
                                    <button type="button" onClick={() => handleChangeItemQty(index, item.id, 1)}><FaPlus /></button>
                                </div>
                                <span className="text-center w-1/5 font-semibold text-sm">{priceFormat(item.price)}</span>
                                <span className="text-center w-1/5 font-semibold text-sm">{priceFormat(item.price * item.quantity)}</span>
                            </div>
                        )
                    }

                    <Link href="/" className="flex items-center gap-x-1 font-semibold text-indigo-600 text-sm mt-10">

                        <FaLongArrowAltLeft size={20}/>
                        Continue Shopping
                    </Link>
                </div>

                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Items {items && items.length}</span>
                        <span className="font-semibold text-sm">
                            {priceFormat(itemsCost)}
                        </span>
                    </div>
                    <div>
                        <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                        <select className="block p-2 text-gray-600 w-full text-sm"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setShippingOption(e.target.value)}
                        >
                            {
                                shippingOptions.map((item: ShippingOptionsProps, index: number) =>
                                    <option key={index} value={item.type}>{item.type} shipping - {priceFormat(item.fee)}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="py-10">
                        <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                        <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost</span>
                            <span>
                                {priceFormat(totalCost)}
                            </span>
                        </div>
                        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartClient