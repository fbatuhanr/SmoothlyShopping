import { getCurrentUser } from "@/app/actions/getCurrentUser"
import getOrderItemsByOrderId from "@/app/actions/order/getOrderItemsByOrderId"
import getOrdersByUserId from "@/app/actions/order/getOrdersByUserId"
import UserOrdersClient from "@/app/components/user/orders/UserOrdersClient"
import { Order } from "@prisma/client"

const UserOrders = async() => {

  const currentUser = await getCurrentUser()
  const orders = await getOrdersByUserId({ userId: currentUser?.id })

  return (
    <div>
      <UserOrdersClient orders={orders} />
    </div>
  )
}

export default UserOrders