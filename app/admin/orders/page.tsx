import { getCurrentUser } from '@/app/actions/getCurrentUser'
import getOrders from '@/app/actions/order/getOrders'
import getOrdersByUserId from '@/app/actions/order/getOrdersByUserId'
import AdminOrdersClient from '@/app/components/admin/orders/AdminOrdersClient'
import React from 'react'

const AdminOrders = async() => {
  
  const orders = await getOrders()

  return (
    <div>
      <AdminOrdersClient orders={orders}/>
    </div>
  )
}

export default AdminOrders