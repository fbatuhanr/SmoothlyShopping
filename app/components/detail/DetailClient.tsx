"use client"
import PageContainer from "../containers/PageContainer"
import Image from "next/image"

import { Roboto } from "next/font/google"
import { Rating } from "@mui/material"

import { FaHeart } from "react-icons/fa6";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700', '900']
})

import { Flowbite, CustomFlowbiteTheme, Tabs } from 'flowbite-react';
import { MdOutlineDescription, MdOutlineQuestionAnswer, MdOutlineReviews, MdOutlineAssignmentReturn, MdOutlineCreditCard } from 'react-icons/md';
import { GiCheckMark, GiHandTruck, GiReturnArrow } from "react-icons/gi"
import Counter from "../general/Counter"
import { useState } from "react"


const customTheme: CustomFlowbiteTheme = {
    tabs: {
        "base": "flex flex-col gap-2",
        "tablist": {
            "base": "flex text-center",
            "styles": {
                "fullWidth": "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col rounded-none"
            },
            "tabitem": {
                "base": "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 focus:ring-2 focus:ring-orange-300 focus:outline-none",
                "styles": {
                    "fullWidth": {
                        "base": "ml-0 first:ml-0 w-full rounded-none flex",
                        "active": {
                            "on": "p-4 text-orange-900 bg-orange-100 active rounded-none",
                            "off": "bg-white hover:text-orange-700 hover:bg-orange-50 rounded-none"
                        }
                    }
                },
                "icon": "mr-2 h-5 w-5"
            }
        },
        "tabitemcontainer": {
            "base": "",
            "styles": {
                "fullWidth": "bg-white px-8 py-4"
            }
        },
        "tabpanel": "py-3"
    }
}

export type CardProductProps = {
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    image: string,
    inStock: boolean
}
const DetailClient = ({ product }: { product: any }) => {

    const [cardProduct, setCardProduct] = useState<CardProductProps>({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: 1,
        image: product.image,
        inStock: product.inStock
    })

    const productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length

    const handleIncrease = () => {
        if(cardProduct.quantity >= 10) return
        setCardProduct(prev => ({...prev, quantity: prev.quantity + 1}))
    }

    const handleDecrease = () => {
        if(cardProduct.quantity <= 1) return
        setCardProduct(prev => ({...prev, quantity: prev.quantity - 1}))
    }

    return (
        <div className={roboto.className}>
            <PageContainer>
                <div className="flex flex-1 flex-col py-10 gap-y-6 min-h-96 max-w-screen-lg">
                    <div className="flex">
                        <div className="basis-1/2 bg-white px-5 py-10 border-r-2 border-b-2">
                            <div className="relative w-[400px] h-[400px] m-auto">
                                <Image src={product?.image} fill alt={product?.name} className="rounded-l" />
                            </div>
                        </div>
                        <div className="basis-1/2 space-y-6 bg-neutral-100 py-4 ps-8 pe-2">
                            <div className="flex flex-col mb-6 gap-y-1">
                                <div>
                                    <span className="px-2.5 py-0.5 text-xs text-orange-600 bg-orange-100 rounded-xl">New Arrival</span>
                                </div>
                                <div>
                                    <h1 className={`${roboto.className} text-xl text-slate-800`}>
                                        {product?.name}
                                    </h1>
                                </div>
                                <div className="flex justify-between items-end ps-1 pt-1">
                                    <div className={`${roboto.className} text-3xl text-slate-800`}>
                                        {product?.price}
                                    </div>
                                    <div>
                                        <Rating name="read-only" value={productRating} readOnly />
                                    </div>
                                </div>
                            </div>

                            <div className="py-2 border-t border-b border-gray-200">
                                {
                                    product?.inStock 
                                    ?
                                    <span className="text-base text-green-600">In Stock</span>
                                    : 
                                    <span className="text-base text-red-600">Out of Stock</span>
                                }
                                <p className="mt-1 text-sm text-orange-500">
                                    Ships from US.&nbsp;
                                    <span className="text-gray-600">
                                        Most customers receive within 2-10 days.
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-wrap pt-6 justify-between px-4 items-center">
                                
                                <Counter handleIncrease={handleIncrease} handleDecrease={handleDecrease} cardProduct={cardProduct} />
                                <div>
                                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-orange-600 border rounded-md border-neutral-300 hover:text-gray-50 hover:bg-orange-600 hover:border-orange-600">
                                        <FaHeart size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col pt-1 gap-y-2">
                                <a href="#" className="w-full px-4 py-3 text-center text-orange-600 bg-orange-100 border border-orange-600 hover:bg-orange-600 hover:text-gray-100 rounded-xl">
                                    Add to cart
                                </a>
                                <a href="#" className="w-full px-4 py-3 text-center text-gray-100 bg-orange-600 border border-transparent hover:border-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded-xl">
                                    Buy now
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="overflow-x-auto">
                            <Flowbite theme={{ theme: customTheme }}>
                                <Tabs aria-label="Full width tabs" style="fullWidth">
                                    <Tabs.Item active title="Description" icon={MdOutlineDescription}>
                                        {product?.description}
                                    </Tabs.Item>
                                    <Tabs.Item title="Reviews" icon={MdOutlineReviews}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit assumenda corrupti enim magni veniam dolorem odio, veritatis non voluptates quam minus sint ipsum eos id libero inventore voluptatem, animi atque?
                                    </Tabs.Item>
                                    <Tabs.Item title="Q/A" icon={MdOutlineQuestionAnswer}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit molestias vel ab quod eius laborum quaerat reiciendis commodi delectus natus iste, quis exercitationem pariatur beatae eveniet provident. Reprehenderit, expedita quibusdam?
                                    </Tabs.Item>
                                    <Tabs.Item title="Return" icon={MdOutlineAssignmentReturn}>

                                        <div className="flex flex-col gap-y-8 items-center">
                                            <div className="text-2xl font-medium mt-2">How to start the easy return process?</div>
                                            <div className="flex flex-col gap-y-5 text-md max-w-xl">
                                                <div className="flex flex-row border-b-2 pb-2 items-center gap-x-4">
                                                    <div className="w-1/12"><GiHandTruck size={42} /></div>
                                                    <div className="w-full">
                                                        <div className="text-lg font-medium">Make a return request</div>
                                                        <div className="text-md">Find the order you want to return on the My Orders page and click Easy return.</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row border-b-2 pb-2 items-center gap-x-4">
                                                    <div className="w-1/12"><GiReturnArrow size={42} className="p-2" /></div>
                                                    <div className="w-full">
                                                        <div className="text-lg font-medium">Choose return method</div>
                                                        <div className="text-md">You can easily return the product you want to return with a refund at your door or choose one of the return to SmoothlyShopping point and cargo delivery options.</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row pb-2 items-center gap-x-4">
                                                    <div className="w-1/12"><GiCheckMark size={42} className="p-2" /></div>
                                                    <div className="w-full">
                                                        <div className="text-lg font-medium">Return approve</div>
                                                        <div className="text-md">Package the order completely with all its equipment and deliver it with the shipment code.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Tabs.Item>
                                    <Tabs.Item disabled title="Credit">
                                        Disabled content
                                    </Tabs.Item>
                                </Tabs>
                            </Flowbite>
                        </div>
                    </div>
                </div>
            </PageContainer >
        </div>
    )
}

export default DetailClient