"use client"

import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { CartProductProps } from '../detail/DetailClient'
import priceFormat from '@/utils/PriceFormat'
import { useAppSelector, useAppDispatch } from '@/libs/redux/hooks'
import { removeFromCart, toggleCart } from '@/libs/redux/features/cartSlice'
import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'
import { ClickAwayListener, Slide } from '@mui/material'

const CartSlide = () => {

    const { isEnabled, items } = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()

    const [canSlide, setCanSlide] = useState<boolean>(true);

    const handleSlideOut = () => {
        dispatch(toggleCart(false))
        setCanSlide(true)
    }

    const handleClosePanel = () => {
        setCanSlide(false)
    }

    return <>
        {
            isEnabled &&
            <div className="relative" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <div className="fixed z-20 inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <Slide direction="left" in={canSlide} onExited={handleSlideOut}>
                    <div className="fixed z-30 inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">

                            <ClickAwayListener onClickAway={handleClosePanel}>
                                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                    <div className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                                    <div className="ml-3 flex h-7 items-center">

                                                        <button type="button" onClick={handleClosePanel} className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                            <span className="absolute -inset-0.5"></span>
                                                            <span className="sr-only">Close panel</span>
                                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {
                                                                items.map((item: CartProductProps) =>
                                                                    <li key={item.id} className="flex py-6">
                                                                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                            <Image src={item.image} alt={item.title} fill className="h-full w-full object-contain object-center" />
                                                                        </div>

                                                                        <div className="ml-4 flex flex-1 flex-col">
                                                                            <div>
                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <h3>
                                                                                        <Link href={`product/${item.id}`}>{item.title}</Link>
                                                                                    </h3>
                                                                                    <p className="ml-4">{priceFormat(item.price * item.quantity)}</p>
                                                                                </div>
                                                                                <p className="mt-1 text-sm text-gray-500">Salmon</p>
                                                                            </div>
                                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                                <p className="text-gray-500">Qty {item.quantity}</p>

                                                                                <div className="flex">
                                                                                    <button type="button" onClick={() => dispatch(removeFromCart(item.id))} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                                        Remove
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>{priceFormat(items.reduce((acc: number, item: CartProductProps) => acc + (item.price * item.quantity), 0))}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <Link onClick={handleClosePanel} href="/cart" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                                        Checkout
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or&nbsp;
                                                        <button type="button" onClick={handleClosePanel} className="flex items-center gap-x-1 font-semibold text-indigo-600 hover:text-indigo-500">
                                                            Continue Shopping
                                                            <FaArrowRightLong size={18} />
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </div>
                    </div>
                </Slide>
            </div>
        }
    </>
}

export default CartSlide