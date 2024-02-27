"use client"

import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks"
import { removeFromCart, updateCart } from "@/libs/redux/features/cartSlice"
import { CartProductProps } from "../detail/DetailClient"
import Image from "next/image"
import Link from "next/link"
import Swal from "sweetalert2";
import { FaMinus, FaPlus } from "react-icons/fa6"
import priceFormat from "@/utils/PriceFormat"
import { useRef, useState } from "react"
import { FaLongArrowAltLeft } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { MdLocalShipping, MdOutlineShoppingCartCheckout } from "react-icons/md"
import LinkButton from "../general/clickable/LinkButton"

import OperationContainer from "../containers/OperationContainer"
import { FaCaretRight } from "react-icons/fa";
import Button from "../general/clickable/Button"


interface ShippingOptionsProps {
    type: string,
    fee: number
}
const CartClient = () => {

    const router = useRouter()

    const dispatch = useAppDispatch()

    const { items } = useAppSelector((state) => state.cart)

    if (!items.length) {

        router.push("/")
        router.refresh()
    }


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


    const handleNextStep = () => {
        // secilen kargoyu + toplam tutarı kaydedecek
    }

    return (
        <OperationContainer step="cart">
            <div className="flex shadow-md py-6 border-l border-r border-b">
                <div className="w-3/4 flex flex-col justify-between bg-white px-10 py-10">
                    <div>
                        <div className="flex justify-between border-b pb-8">
                            <div className="font-normal">
                                <h2 className="text-2xl">Shopping Cart</h2>
                                <p className="text-sm text-gray-400">Check out your items and proceed to view shipping options.</p>
                            </div>
                            <h2 className="font-normal text-2xl">{items && items.length} Items</h2>
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
                                            <span className="text-red-500 text-xs">{item.brand}</span>
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
                    </div>
                    <LinkButton text="Continue Shopping" target="/" size="sm" color="tertiary" iconBegin={<FaLongArrowAltLeft />} innerHeight={0.5} />
                </div>

                <div id="summary" className="w-1/4 px-8 py-10">
                    <div className="border-b pb-8">
                        <div className="font-normal">
                            <h2 className="text-2xl">Order Summary</h2>
                            <p>&nbsp;</p>
                        </div>
                    </div>
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
                    <div className="pt-10 pb-2">
                        <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                        <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                    </div>
                    <Button text="Apply" size="sm" color="quaternary" innerWidth={5} innerHeight={2} uppercased />
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost</span>
                            <span>
                                {priceFormat(totalCost)}
                            </span>
                        </div>
                        <LinkButton text="Shipping" target="/shipping" color="tertiary" size="base" innerHeight={3} uppercased outlined={false} iconBegin={<MdLocalShipping />} iconEnd={<FaCaretRight />} />
                    </div>
                </div>
            </div>
        </OperationContainer>
    )
}

export default CartClient