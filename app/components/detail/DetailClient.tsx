"use client"
import PageContainer from "../containers/PageContainer"
import Image from "next/image"

import { Roboto } from "next/font/google"
import { Rating } from "@mui/material"

import { FaHeart, FaMinus, FaPlus } from "react-icons/fa6";

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700']
})

import { Flowbite, CustomFlowbiteTheme, Tabs } from 'flowbite-react';
import { MdOutlineDescription, MdOutlineQuestionAnswer, MdOutlineReviews, MdOutlineAssignmentReturn, MdOutlineCreditCard } from 'react-icons/md';


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
                "fullWidth": "px-2"
            }
        },
        "tabpanel": "py-3"
    }
}

const DetailClient = ({ product }: { product: any }) => {

    const productRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / product?.reviews?.length

    return (
        <div>
            <PageContainer>
                <div className="flex flex-1 flex-col py-10 gap-y-5 min-h-96 max-w-screen-lg">
                    <div className="flex">
                        <div className="basis-1/2 bg-white px-5 py-10 border-r-2 border-b-2">
                            <div className="relative w-[400px] h-[400px] m-auto">
                                <Image src={product?.image} fill alt={product?.name} className="rounded-l" />
                            </div>
                        </div>
                        <div className="basis-1/2 space-y-6 bg-neutral-100 py-3 ps-8 pe-2">
                            <div className="flex flex-col gap-y-1">
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
                                <span className="text-base text-gray-600">In Stock</span>
                                <p className="mt-1 text-sm text-orange-500">
                                    Ships from china.&nbsp;
                                    <span className="text-gray-600">
                                        Most customers receive within 3-31 days.
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-between px-4 items-center">
                                <div className="w-28">
                                    <div className="flex flex-row w-full h-10 bg-transparent rounded-lg">
                                        <button className="w-20 h-full text-gray-600 bg-neutral-300 border-neutral-300 border-r rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300">
                                            <FaMinus className="m-auto" />
                                        </button>
                                        <input type="number" className="w-full px-1 border-y-2 border-neutral-300 font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black" placeholder="1" />
                                        <button className="w-20 h-full text-gray-600 bg-neutral-300 border-neutral-300 border-l rounded-r outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300">
                                            <FaPlus className="m-auto" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-orange-600 border rounded-md border-neutral-300 hover:text-gray-50 hover:bg-orange-600 hover:border-orange-600">
                                        <FaHeart size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-2">
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
                                        This is <span className="font-medium text-gray-800">Dashboard tab's associated content</span>.
                                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                                        control the content visibility and styling.
                                    </Tabs.Item>
                                    <Tabs.Item title="Q/A" icon={MdOutlineQuestionAnswer}>
                                        This is <span className="font-medium text-gray-800">Settings tab's associated content</span>.
                                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                                        control the content visibility and styling.
                                    </Tabs.Item>
                                    <Tabs.Item title="Return" icon={MdOutlineAssignmentReturn}>
                                        This is <span className="font-medium text-gray-800">Contacts tab's associated content</span>.
                                        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                                        control the content visibility and styling.
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