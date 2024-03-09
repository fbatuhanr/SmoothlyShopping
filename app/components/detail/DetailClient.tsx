"use client"
import PageContainer from "../containers/PageContainer"
import Image from "next/image"

import { FaCartShopping, FaHeart } from "react-icons/fa6";

import { Roboto } from "next/font/google"
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

import { Flowbite, CustomFlowbiteTheme, Tabs, Modal, Textarea } from 'flowbite-react';
import { MdOutlineDescription, MdOutlineQuestionAnswer, MdOutlineReviews, MdOutlineAssignmentReturn } from 'react-icons/md';
import Counter from "../general/Counter"
import { useEffect, useState } from "react"
import Button from "../general/clickable/Button"

import { Rating as MuiRating, Rating } from "@mui/material";
import Reviews from "./reviews/Reviews";

import { useAppDispatch } from "@/libs/redux/hooks";
import { addToCart } from "@/libs/redux/features/cartSlice";
import { visitProduct } from "@/libs/redux/features/statisticSlice"

import priceFormat from "@/utils/PriceFormat";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Faq from "./faq/Faq";
import Description from "./description/Description";
import Return from "./return/Return";
import { Category, Order, Prisma, Product, Review, User } from "@prisma/client";
import Link from "next/link";
import LeaveFeedback from "./leave-feedback/LeaveFeedback";
import LoadingSpinnerFullScreen from "../general/LoadingSpinnerFullScreen";

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
            "base": "flex flex-col items-center",
            "styles": {
                "fullWidth": "bg-white px-8 py-4"
            }
        },
        "tabpanel": "w-full pt-3 pb-8"
    }
}

export type CartProductProps = {
    id: string,
    title: string,
    description: string,
    brand: string
    price: number,
    category: string,
    quantity: number,
    image: string,
    inStock: boolean
}

type UserWithOrdersReviews = Prisma.UserGetPayload<{ include: {orders: true, reviews: true} }>
type UserWithPayload = User & UserWithOrdersReviews;

type ProductWithBrandCategoryReviews = Prisma.ProductGetPayload<{ include: { brand: true, category: true, reviews: true }}>
type ProductWithPayload = Product & ProductWithBrandCategoryReviews;

interface DetailClientProps {
    categories: Array<Category>
    product: ProductWithPayload
    currentUser: UserWithPayload
}
const DetailClient: React.FC<DetailClientProps> = ({ categories, product, currentUser }) => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const [cartProduct, setCartProduct] = useState<CartProductProps>({
        id: product.id,
        title: product.title,
        description: product.description,
        brand: product.brand.title,
        price: product.price,
        category: product.category.title,
        quantity: 1,
        image: product.image,
        inStock: product.inStock
    })

    const reviewCount = product?.reviews?.length
    const reviewRating = product?.reviews?.reduce((acc: number, item: any) => acc + item.rating, 0) / reviewCount || null

    const handleIncrease = () => {
        if (cartProduct.quantity >= 9) return
        setCartProduct(prev => ({ ...prev, quantity: prev.quantity + 1 }))
    }

    const handleDecrease = () => {
        if (cartProduct.quantity <= 1) return
        setCartProduct(prev => ({ ...prev, quantity: prev.quantity - 1 }))
    }

    const handleAddToCart = (isRedirection: boolean = false) => {

        if (!currentUser) {
            router.push("/login")
            return
        }

        dispatch(addToCart(cartProduct))
        toast.success('Successfully added to cart!');

        if (isRedirection){
            router.push("/cart")
        }
    }


    useEffect(() => {

        dispatch(visitProduct(product))
    }, [])

    
    const currentUserFeedback = currentUser?.reviews?.find((review: Review) => review.productId == product.id)
    const isUserBoughtBefore = currentUser?.orders?.some((order: Order) => Object.values(order.items as Product[]).some((item:Product) => item.id == product.id))
    console.log("currentUserFeedback", currentUserFeedback)
    console.log("isUserBoughtBefore", isUserBoughtBefore)

    return (
        <PageContainer activeCategory={product?.category.title} categories={categories}>
            <div className="flex flex-1 flex-col gap-y-6 min-h-96 w-full max-w-screen-lg mt-8">
                <div className="flex">
                    <div className="basis-1/2 bg-white px-5 py-10 border-r-2 border-b-2">
                        <div className="relative w-[400px] h-[400px] m-auto">
                            <Image src={product?.image} fill alt={product?.title} className="rounded-l object-contain object-center" />
                        </div>
                    </div>
                    <div className="basis-1/2 space-y-6 bg-neutral-100 py-4 ps-8 pe-2">
                        <div className="flex flex-col mb-6 gap-y-1">
                            <div>
                                <span className="px-2.5 py-0.5 text-xs text-orange-600 bg-orange-100 rounded-xl">New Arrival</span>
                            </div>
                            <div className="flex justify-between">
                                <h1 className={`${roboto.className} text-2xl text-slate-800`}>
                                    {product?.title}
                                </h1>
                                <h2 className={`${roboto.className} text-lg text-slate-600 font-semibold`}>
                                    <Link href={`/brand/${product?.brand.title}?id=${product?.brand.id}`}>{product?.brand.title}</Link>
                                </h2>
                            </div>
                            <div className="flex justify-between items-end ps-1 pt-1">
                                <div className={`${roboto.className} text-3xl text-slate-800`}>
                                    {priceFormat(product?.price)}
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <div className="text-lg">{reviewRating}</div>
                                    <div className="pt-1">
                                        <MuiRating name="product-rating" value={reviewRating} precision={0.5} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                {
                                    currentUser?.id && isUserBoughtBefore &&
                                    <LeaveFeedback userId={currentUser.id} productId={product.id} brandName={product.brand.title} productName={product.title} currentUserFeedback={currentUserFeedback} />
                                }
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

                            <Counter handleIncrease={handleIncrease} handleDecrease={handleDecrease} cartProduct={cartProduct} />
                            <div>
                                <Button iconBegin={<FaHeart size={18} />} outlined innerHeight={3} color="primary" />
                            </div>
                        </div>

                        <div className="flex flex-col pt-1 gap-y-2">
                            <Button text="Add to Cart" onClick={() => handleAddToCart()} color="primary" iconBegin={<FaCartShopping />} innerHeight={4} />
                            <Button text="Buy now" onClick={() => handleAddToCart(true)} color="secondary" innerHeight={4} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 mb-6">
                    <div className="overflow-x-auto">
                        <Flowbite theme={{ theme: customTheme }}>
                            <Tabs aria-label="Full width tabs" style="fullWidth">
                                <Tabs.Item active title="Description" icon={MdOutlineDescription}>
                                    <Description description={product?.description} />
                                </Tabs.Item>
                                <Tabs.Item title="Reviews" icon={MdOutlineReviews}>
                                    <Reviews reviews={product?.reviews} />
                                </Tabs.Item>
                                <Tabs.Item title="F.A.Q." icon={MdOutlineQuestionAnswer}>
                                    <Faq />
                                </Tabs.Item>
                                <Tabs.Item title="Return" icon={MdOutlineAssignmentReturn}>
                                    <Return />
                                </Tabs.Item>
                                <Tabs.Item disabled title="Credit">
                                    &nbsp;
                                </Tabs.Item>
                            </Tabs>
                        </Flowbite>
                    </div>
                </div>
            </div>
        </PageContainer >
    )
}

export default DetailClient