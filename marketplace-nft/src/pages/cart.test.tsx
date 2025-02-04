import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import {store} from "@/redux/store";
import Cart from "@/pages/cart";
import "@testing-library/jest-dom";

describe("Cart Page", () => {
  it("deve renderizar a página do carrinho corretamente", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText("Mochila de Compras")).toBeInTheDocument();
  });
});
