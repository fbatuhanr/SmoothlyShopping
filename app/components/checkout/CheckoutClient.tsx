"use client"

import OperationContainer from "../containers/OperationContainer";

import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks"
import { CartProductProps } from "../detail/DetailClient";
import Image from "next/image";
import priceFormat from "@/utils/PriceFormat";
import { MdAlternateEmail, MdCreditCard, MdLocalShipping, MdOutlineFileDownloadDone } from "react-icons/md";
import { Address, OrderStatusEnum, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { GiConvergenceTarget } from "react-icons/gi";
import { CiReceipt } from "react-icons/ci";
import { FaAddressCard, FaReceipt, FaRegAddressCard } from "react-icons/fa";
import Input from "../general/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Button from "../general/clickable/Button";


interface ManageAddressesProps {
    currentUser: User
    addresses: Array<Address>
}
const CheckoutClient: React.FC<ManageAddressesProps> = ({ currentUser, addresses }) => {

    const router = useRouter()

    const dispatch = useAppDispatch()

    const deliveryAddress = addresses.find((address: Address) => address.id == currentUser.deliveryAddressId)
    const billingAddress = addresses.find((address: Address) => address.id == currentUser.billingAddressId)

    console.log(deliveryAddress)
    console.log(billingAddress)
    if (!deliveryAddress || !billingAddress) {
        router.push("/shipping")
        return;
    }

    const { items } = useAppSelector((state) => state.cart)
    const { shippingOption, itemsCost, totalCost } = useAppSelector((state) => state.checkout)

    console.log(items)
    console.log(shippingOption)
    console.log(itemsCost)
    console.log(totalCost)
    if (!items || !shippingOption || !itemsCost || !totalCost) {
        router.push("/cart")
        return;
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            cardHolder: "",
            cardNumber: "", cardExpiration: "", cardCvc: ""
        }
    })
    const onSubmitPlaceOrder: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        if (!data) return;

        // verify card informations then conitnue
        /*
            data.cardHolder
            data.cardNumber
            data.cardExpiration 
            data.cardCvc 
        */
        // then

        const resultData = {
            userId: currentUser.id,
            status: OrderStatusEnum.Processing,
            itemsCost,
            totalCost,
            deliveryAddressId: deliveryAddress.id,
            billingAddressId: billingAddress.id,
            items
        }

        axios.post("/api/order", resultData)
            .then(() => {
                toast.success("Order created successfully!")
                reset();
                router.refresh()
            })
            .catch((error: AxiosError) => {
                console.log(error, "error")
            })
    }

    return (
        <OperationContainer step="checkout">
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <div className="text-xl font-medium">Order Summary</div>
                    <div className="text-gray-400">Check your items. And select a suitable shipping method.</div>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-y-scroll max-h-72">
                        {
                            items.map((item: CartProductProps) =>
                                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                                    <div className="relative m-2 h-24 w-28 border rounded-md">
                                        <Image src={item.image} alt={item.title} fill className="object-cover object-center" />
                                    </div>
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <div className="font-semibold">{item.title}</div>
                                        <div className="float-right text-gray-400">{item.brand}</div>
                                        <div className="flex justify-between">
                                            <div className="text-lg font-bold">{priceFormat(item.price)}</div>
                                            <div className="text-base font-medium">x {item.quantity}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <div className="mt-6 mb-2 text-lg font-medium">Delivery Address</div>
                        <div className="flex items-center rounded-lg border border-gray-300 p-4">
                            <div className="text-5xl text-orange-600">
                                <GiConvergenceTarget />
                            </div>
                            <div className="ml-5">
                                <div className="font-semibold">{deliveryAddress.name}</div>
                                <div>{deliveryAddress.address}</div>
                                <div>
                                    {deliveryAddress.city}
                                    ,&nbsp;
                                    {deliveryAddress.state}
                                </div>
                                <div>
                                    {deliveryAddress.country}
                                    ,&nbsp;
                                    {deliveryAddress.zipcode}
                                    ,&nbsp;
                                    {deliveryAddress.phone}
                                </div>
                                {deliveryAddress.additional && <div>({deliveryAddress.additional})</div>}
                            </div>
                        </div>
                    </div>


                    <div>
                        <div className="mt-6 mb-2 text-lg font-medium">Billing Address</div>
                        <div className="flex items-center rounded-lg border border-gray-300 p-4">
                            <div className="text-5xl text-orange-600">
                                <FaReceipt />
                            </div>
                            <div className="ml-5">
                                <div className="font-semibold">{billingAddress.name}</div>
                                <div>{billingAddress.address}</div>
                                <div>
                                    {billingAddress.city}
                                    ,&nbsp;
                                    {billingAddress.state}
                                </div>
                                <div>
                                    {billingAddress.country}
                                    ,&nbsp;
                                    {billingAddress.zipcode}
                                    ,&nbsp;
                                    {billingAddress.phone}
                                </div>
                                {billingAddress.additional && <div>({billingAddress.additional})</div>}
                            </div>
                        </div>
                    </div>


                    <div>
                        <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                        <div className="mt-5 grid gap-6">
                            <div className="relative">
                                <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
                                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                    <div className="text-5xl text-orange-600">
                                        <MdLocalShipping />
                                    </div>
                                    <div className="ml-5">
                                        <div className="m-0 p-0">
                                            <span className="mr-2 font-semibold">{shippingOption.name}</span>
                                            <span className="text-xs font-medium">({priceFormat(shippingOption.price)})</span>
                                        </div>
                                        <p className="text-slate-500 text-sm leading-6">{shippingOption.id}</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">Complete your order by providing your payment details.</p>
                    <div>
                        <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                        <div className="relative">
                            <input type="text" id="email" name="email" value={currentUser.email!} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none" placeholder="your.email@gmail.com" readOnly />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <MdAlternateEmail />
                            </div>
                        </div>
                        <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
                        <div className="relative">
                            <Input id="cardHolder" type="text" placeholder="Your full name here" register={register} errors={errors} required className="pl-11" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <FaRegAddressCard />
                            </div>
                        </div>
                        <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
                        <div className="flex">
                            <div className="relative w-7/12 flex-shrink-0">
                                <Input id="cardNumber" type="text" placeholder="xxxx-xxxx-xxxx-xxxx" register={register} errors={errors} required className="pl-11" />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <MdCreditCard />
                                </div>
                            </div>
                                <Input id="cardExpiration" type="text" placeholder="MM/YY" register={register} errors={errors} required />
                                <Input id="cardCvc" type="text" placeholder="CVC" register={register} errors={errors} required />
                        </div>

                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                <p className="font-semibold text-gray-900">{priceFormat(itemsCost)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Shipping</p>
                                <p className="font-semibold text-gray-900">{priceFormat(shippingOption.price)}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900">{priceFormat(totalCost)}</p>
                        </div>
                        <Button onClick={handleSubmit(onSubmitPlaceOrder)} text="Place Order" iconEnd={<MdOutlineFileDownloadDone />} color="tertiary" innerHeight={3} className="mt-4" />
                    </div>
                </div>
            </div>
        </OperationContainer>
    )
}

export default CheckoutClient