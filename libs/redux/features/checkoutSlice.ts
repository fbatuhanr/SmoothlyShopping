import { ShippingOption } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CheckoutState {
  shippingOption: ShippingOption,
  
  itemsCost: number,
  totalCost: number
}
const initialState: CheckoutState = {
  shippingOption: {
    id: "",
    name: "",
    price: 0
  },

  itemsCost: 0,
  totalCost: 0
}

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingOption: (state, action: PayloadAction<ShippingOption>) => {
      state.shippingOption = {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
      }
    },
    setItemsCost: (state, action: PayloadAction<number>) => {
      state.itemsCost = action.payload
    },
    setTotalCost: (state, action: PayloadAction<number>) => {
      state.totalCost = action.payload
    }
  }
})

export const { setShippingOption, setItemsCost, setTotalCost } = checkoutSlice.actions
export default checkoutSlice.reducer