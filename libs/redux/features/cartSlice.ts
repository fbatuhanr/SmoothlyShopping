import { CartProductProps } from '@/app/components/detail/DetailClient'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface CartState {
  isEnabled: boolean
  items: Array<CartProductProps>
}
const initialState: CartState = {
  isEnabled: false,
  items: []
}

/*
export const createStream = createAsyncThunk(
  'streams/createStream',
  async (formValues, thunkAPI) => {
    const { userId } = thunkAPI.getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });
    return response.data;
  }
);
*/

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<boolean>) => {
      state.isEnabled = action.payload
    },
    addToCart: (state, action: PayloadAction<CartProductProps>) => {
      const itemIndexInCart = state.items.findIndex((item) => item.id === action.payload.id)
      if (itemIndexInCart === -1)
        state.items.push(action.payload)
      else
        state.items[itemIndexInCart].quantity += action.payload.quantity
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id != action.payload)
    },
    updateCart: (state, action: PayloadAction<Array<any>>) => {
      const itemIndexInCart = state.items.findIndex((item) => item.id == action.payload[0])
      state.items[itemIndexInCart].quantity = action.payload[1]
    },
    clearCart: (state) => {
      state.items = []
    }
  },
  /*
  I will use it when async request (for example axios call)
  extraReducers: (builder) => {
    builder.addCase(createStream.fulfilled, (state, action) => {
      const navigate = useNavigate()
      state[action.payload.id] = action.payload;
      navigate("/")
    });
  },*/
})

export const { toggleCart, addToCart, removeFromCart, updateCart, clearCart } = cartSlice.actions
export default cartSlice.reducer