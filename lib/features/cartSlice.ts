import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CartState {
  items: Array<any>
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
    addToCart: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
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