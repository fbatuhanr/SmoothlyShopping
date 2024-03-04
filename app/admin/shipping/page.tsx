import getShippingOptions from '@/app/actions/getShippingOptions'
import AdminShippingClient from '@/app/components/admin/shipping/AdminShippingClient'

const AdminShipping = async () => {

  const shippingOptions = await getShippingOptions()
  return (
    <div>
        <AdminShippingClient shippingOptions={shippingOptions} />
    </div>
  )
}

export default AdminShipping