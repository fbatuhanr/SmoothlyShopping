import AdminOrdersClient from '@/app/components/admin/orders/AdminOrdersClient'
import getOrders from '@/app/actions/order/getOrders'

const AdminOrders = async() => {
  
  const orders = await getOrders()

  return (
    <div>
      <AdminOrdersClient orders={orders}/>
    </div>
  )
}

export default AdminOrders