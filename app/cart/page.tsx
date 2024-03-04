import getShippingOptions from "../actions/getShippingOptions"
import CartClient from "../components/cart/CartClient"

const Cart = async () => {

  const shippingOptions = await getShippingOptions()
  return (
    <div>
      <CartClient shippingOptions={shippingOptions}/>
    </div>
  )
}

export default Cart