"use client"

import Heading from "@/app/components/general/Heading"
import priceFormat from "@/utils/PriceFormat"
import { Order } from "@prisma/client"
import Image from "next/image"
import { CartProductProps } from "../../detail/DetailClient"
import { MdError } from "react-icons/md"
import Link from "next/link"

interface UserOrdersClientProps {
  orders: Array<Order>
}
const UserOrdersClient: React.FC<UserOrdersClientProps> = ({ orders }) => {

  return (
    <div className="w-full flex flex-col justify-between gap-y-6 bg-white px-10 py-10">
      <Heading text="My Orders" textSize="3xl" subText="Display your created orders." subTextSize="base" border />
      {
        orders.length ? 
          orders.map((order: Order) => {

          const formattedDeliveryAddress = order.deliveryAddress.name + ", " + order.deliveryAddress.address + ", " + order.deliveryAddress.city + ", " + order.deliveryAddress.state + ", " +order.deliveryAddress.country + ", " + order.deliveryAddress.zipcode + ", " + order.deliveryAddress.phone + ( order.deliveryAddress.additional ? ", (" +  order.deliveryAddress.additional + ")" : "")
          const formattedBillingAddress = order.billingAddress.name + ", " + order.billingAddress.address + ", " + order.billingAddress.city + ", " + order.billingAddress.state + ", " +order.billingAddress.country + ", " + order.deliveryAddress.zipcode + ", " + order.billingAddress.phone + ( order.billingAddress.additional ? ", (" +  order.billingAddress.additional + ")" : "")

          return (
            <div className="border-2 p-4">
              <div className="flex justify-between gap-x-10 border-b text-xl font-semibold">
                <div className="w-1/12">Order ID</div>
                <div className="w-4/12">Products</div>
                <div className="w-2/12">Subtotal</div>
                <div className="w-2/12">Total</div>
                <div className="w-2/12">Status</div>
              </div>
              <div className="flex items-center justify-between text-lg">
                <div className="w-1/12 break-words">{order.id}</div>
                <div className="w-4/12">
                  {
                    order.items && Object.values(order.items).map((item: CartProductProps) =>
                      <div className="flex items-center gap-x-4 rounded-lg bg-white p-2">
                        <div className="relative h-16 w-20 border rounded-md">
                          <Image src={item.image} alt={item.title} fill className="object-contain object-center" />
                        </div>
                        <div className="flex w-full flex-col">
                          <div className="font-semibold">{item.title}</div>
                          <div className="float-right text-gray-400 ">{item.brand}</div>
                          <div className="text-lg font-bold">{priceFormat(item.price)} x {item.quantity}</div>
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className="w-2/12 font-semibold">{priceFormat(order.itemsCost)}</div>
                <div className="w-2/12 font-semibold">{priceFormat(order.totalCost)}</div>
                <div className="w-2/12 font-bold">{order.status}</div>
              </div>
              <div className="flex items-center justify-between border-t pt-2">
                <div className="flex items-center">
                  <div className="text-lg font-semibold">Delivery Address&nbsp;</div>
                  <div className="text-base">{formattedDeliveryAddress}</div>
                </div>
                <div className="flex items-center">
                  <div className="text-lg font-semibold">Billing Address&nbsp;</div>
                  <div className="text-base">{formattedBillingAddress}</div>
                </div>
              </div>
            </div>
          )
        })
        :
        <div className="w-full flex justify-center items-center gap-x-1 text-xl font-medium text-slate-900 py-10">
            <Link href="/">You don't have an order yet, you can start shopping by clicking here.</Link>
            <MdError />
        </div>
      }
    </div>
  )
}

  export default UserOrdersClient