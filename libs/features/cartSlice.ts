import { CartProductProps } from '@/app/components/detail/DetailClient'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CartState {
  items: Array<CartProductProps>
}

// Define the initial state using that type
const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProductProps>) => {

      const itemIndexInCart = state.items.findIndex((item) => item.id === action.payload.id)
      if(itemIndexInCart === -1)
        state.items.push(action.payload)
      else
        state.items[itemIndexInCart].quantity += action.payload.quantity
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(i => i.id != action.payload)
    },
    clearCart: (state) => {
      state.items = []
    }
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default cartSlice.reducer