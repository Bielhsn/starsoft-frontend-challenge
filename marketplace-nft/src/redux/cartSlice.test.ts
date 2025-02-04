const cartReducer = require("./cartSlice").default;
const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = require("./cartSlice");

describe("cartSlice", () => {
  it("deve adicionar um item ao carrinho", () => {
    const initialState = { items: [] };
    const newItem = { id: "1", name: "NFT Test", price: 10, image: "", description: "", quantity: 1 };
    const state = cartReducer(initialState, addToCart(newItem));
    
    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe("1");
  });

  it("deve remover um item do carrinho", () => {
    const initialState = { items: [{ id: "1", name: "NFT Test", price: 10, image: "", description: "", quantity: 1 }] };
    const state = cartReducer(initialState, removeFromCart("1"));

    expect(state.items.length).toBe(0);
  });
});
