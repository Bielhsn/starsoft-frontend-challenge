import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Definição da estrutura de um item no carrinho
interface CartItem {
  id: string
  name: string
  price: number
  image: string
}

// Estado inicial do carrinho
interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adiciona um item ao carrinho
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload)
    },
    // Remove um item do carrinho pelo ID
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    // Limpa todo o carrinho
    clearCart: state => {
      state.items = []
    }
  }
})

// Exportando as ações para usar nos componentes
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

// Exportando o reducer para ser usado na store
export default cartSlice.reducer
