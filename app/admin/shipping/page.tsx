import getShippingOptions from '@/app/actions/getShippingOptions'
import AdminShippingClient from '@/app/components/admin/shipping/AdminShippingClient'

const Shipping = async () => {

  const shippingOptions = await getShippingOptions()
  return (
    <div>
        <AdminShippingClient shippingOptions={shippingOptions} />
    </div>
  )
}

export default Shipping