import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartSlice from './features/cartSlice'
import statisticSlice from './features/statisticSlice'

const persistConfig = {
  key: 'persist',
  storage,
}
const rootReducer = combineReducers({
  cart: cartSlice,
  statistic: statisticSlice
})

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  })

export const makeStore = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return makeConfiguredStore()
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    let store: any = configureStore({
      reducer: persistedReducer,
    })
    store.__persistor = persistStore(store)
    return store
  }
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']