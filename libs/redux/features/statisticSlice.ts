import { Product } from '@prisma/client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface statisticState {
    visitedProducts: Array<Product>
}
const initialState: statisticState = {
    visitedProducts: []
}

export const statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        visitProduct: (state, action: PayloadAction<Product>) => {

            const items = state.visitedProducts
            const newItem = action.payload
            const maxCapacity = 5
            
            if(!items.some((i:Product) => i.id === newItem.id)) {
            
                if (items.length < maxCapacity) {
                    items.unshift(newItem);
                }
            } else {
                let existingIndex = items.findIndex((i:Product) => i.id === newItem.id)
                items.unshift(items.splice(existingIndex, 1)[0]);
            }

            state.visitedProducts = items
        }
    }
})

export const { visitProduct } = statisticSlice.actions
export default statisticSlice.reducer