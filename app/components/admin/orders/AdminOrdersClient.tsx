"use client"

import Heading from "@/app/components/general/Heading"
import priceFormat from "@/utils/PriceFormat"
import { Order, OrderStatusEnum, Prisma } from "@prisma/client"
import Image from "next/image"
import { CartProductProps } from "../../detail/DetailClient"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { MdError } from "react-icons/md"

type OrderWithUser = Prisma.OrderGetPayload<{
  include: { user: true }
}>
type OrderWithPayload = Order & OrderWithUser;

interface AdminOrdersClientProps {
  orders: Array<OrderWithPayload>
}
const AdminOrdersClient: React.FC<AdminOrdersClientProps> = ({ orders }) => {

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>, orderId: string) => {

    const value = event.target.value
    if (!value) return

    console.log(orderId)
    console.log(value)

    const resultData = {
      status: value
    }

    axios.put(`/api/order/${orderId}`, resultData)
      .then((res) => {

        console.log(res)
        toast.success('Successfully updated!')
      })
      .catch((error: AxiosError) => {
        console.log(error)
      })

  }

  return (
    <div className="w-full flex flex-col justify-between gap-y-6 bg-white px-10 py-10">
      <Heading text="All Orders" textSize="3xl" subText="Display orders that placed from users." subTextSize="base" border />
      {
        orders.length ?
        orders.map((order: OrderWithUser) => {

          console.log(order)

          const formattedDeliveryAddress = order.deliveryAddress.name + ", " + order.deliveryAddress.address + ", " + order.deliveryAddress.city + ", " + order.deliveryAddress.state + ", " + order.deliveryAddress.country + ", " + order.deliveryAddress.zipcode + ", " + order.deliveryAddress.phone + (order.deliveryAddress.additional ? ", (" + order.deliveryAddress.additional + ")" : "")
          const formattedBillingAddress = order.billingAddress.name + ", " + order.billingAddress.address + ", " + order.billingAddress.city + ", " + order.billingAddress.state + ", " + order.billingAddress.country + ", " + order.deliveryAddress.zipcode + ", " + order.billingAddress.phone + (order.billingAddress.additional ? ", (" + order.billingAddress.additional + ")" : "")

          return (
            <div className="border-2 p-4">

              <table className="table-fixed border-spacing-5">
                <thead className="text-left border-b text-xl font-semibold">
                  <tr>
                    <th>User</th>
                    <th>Order ID</th>
                    <th>Products</th>
                    <th>Subtotal</th>
                    <th>Shipping</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-4 pr-4 break-words">{order.user.name}</td>
                    <td className="max-w-20 break-words text-sm">{order.id}</td>
                    <td>
                      {
                        order.items && Object.values(order.items).map((item: CartProductProps) =>
                          <div className="flex items-center gap-x-4 rounded-lg bg-white p-2">
                            <div className="relative h-16 w-20 border rounded-md">
                              <Image src={item.image} alt={item.title} fill className="object-contain object-center" />
                            </div>
                            <div className="flex w-full flex-col">
                              <div className="font-medium">{item.title}</div>
                              <div className="float-right text-gray-400 ">{item.brand}</div>
                              <div className="font-medium">{priceFormat(item.price)} x {item.quantity}</div>
                            </div>
                          </div>
                        )
                      }
                    </td>
                    <td className="font-medium">{priceFormat(order.itemsCost)}</td>
                    <td>{order.shippingOption}</td>
                    <td className="font-medium">{priceFormat(order.totalCost)}</td>
                    <td>
                      <select onChange={(e) => handleStatusChange(e, order.id)} defaultValue={order.status}>
                        {
                          Object.keys(OrderStatusEnum).map(key =>
                            <option key={key} value={key}>{key}</option>
                          )
                        }
                      </select>
                    </td>
                  </tr>
                </tbody>
                <tfoot className="border-t">
                  <tr>
                    <td colSpan={3} className="pr-4">Delivery Address: <br/> {formattedDeliveryAddress}</td>
                    <td colSpan={3} className="pl-4">Billing Address: <br/> {formattedBillingAddress}</td>
                  </tr>
                </tfoot>
              </table>

            </div>
          )
        })
        :
        <div className="w-full flex justify-center items-center gap-x-1 text-xl font-medium text-slate-900 py-10">
            There are no orders placed by any user
            <MdError />
        </div>
      }
    </div>
  )
}

export default AdminOrdersClient