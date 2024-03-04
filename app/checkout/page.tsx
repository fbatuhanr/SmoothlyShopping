import getAddresses from "../actions/getAddresses"
import { getCurrentUser } from "../actions/getCurrentUser"
import CheckoutClient from "../components/checkout/CheckoutClient"

const Checkout = async() => {

  const currentUser = await getCurrentUser()
  const addresses = await getAddresses({ userId: currentUser?.id })

  return (
    <div>
        <CheckoutClient currentUser={currentUser} addresses={addresses} />
    </div>
  )
}

export default Checkout