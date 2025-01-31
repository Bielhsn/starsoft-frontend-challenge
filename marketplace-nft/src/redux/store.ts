import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice' // Importando o reducer do carrinho

export const store = configureStore({
  reducer: {
    cart: cartReducer // Registrando o reducer do carrinho na store
  }
})

// Tipagens para facilitar o uso do Redux no TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
