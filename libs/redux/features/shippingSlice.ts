/* 
import { CartProductProps } from '@/app/components/detail/DetailClient'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ShippingState {
    deliveryAddress
}
const initialState: ShippingState = {
  isEnabled: false,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<boolean>) => {
      state.isEnabled = action.payload
    }
  }
})

export const { toggleCart } = cartSlice.actions
export default cartSlice.reducer
*/