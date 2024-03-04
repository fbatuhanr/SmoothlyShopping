import getAddresses from "../actions/getAddresses"
import { getCurrentUser } from "../actions/getCurrentUser"
import ShippingClient from "../components/shipping/ShippingClient"

const Shipping = async() => {

  const currentUser = await getCurrentUser()
  const addresses = await getAddresses({ userId: currentUser?.id })

  return (
    <div>
        <ShippingClient currentUser={currentUser} addresses={addresses} />
    </div>
  )
}

export default Shipping