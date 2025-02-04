import { useState } from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { Trash, Minus, Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "@/redux/cartSlice";
import Footer from "@/components/Footer";
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items); // Obtém os itens
  const dispatch = useDispatch();
  const router = useRouter();
  const [isCheckout, setIsCheckout] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Finaliza a compra e altera o botão
  const handleCheckout = () => {
    setIsCheckout(true);
    setTimeout(() => {
      dispatch(clearCart()); // Limpa o carrinho
      router.push("/"); // Redireciona para a Home
    }, 2000);
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <button className={styles.backButton} onClick={() => router.push("/")}>
          <ArrowLeft size={35} color="#FF8310" />
        </button>
        <h2 className={styles.title}>Mochila de Compras</h2>
      </div>

      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Seu carrinho está vazio.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <Image src={item.image} alt={item.name} width={90} height={90} className={styles.itemImage} />

              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item.name}</h3>
                <p className={styles.itemDescription}>{item.description}</p>

                <div className={styles.priceContainer}>
                  <Image className={styles.itemIcon} src="/assets/icons/ETH.png" alt="Ethereum" width={20} height={20} />
                  <strong className={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)} ETH</strong>
                </div>

                <div className={styles.quantityControlContainer}>
                  <div className={styles.quantityControl}>
                    <button onClick={() => dispatch(decreaseQuantity(item.id))}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))}><Plus size={14} /></button>
                  </div>

                  <button onClick={() => dispatch(removeFromCart(item.id))} className={styles.removeButton}>
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            </div>

          ))}

          <div className={styles.totalContainer}>
            <h3>Total</h3>
            <div className={styles.priceContainer}>
              <Image className={styles.iconContainer} src="/assets/icons/ETH.png" alt="Ethereum" width={15} height={15} />
              <strong>{total.toFixed(2)} ETH</strong>
            </div>
          </div>

          <button
            className={`${styles.checkoutButton} ${isCheckout ? styles.checkoutCompleted : ""}`}
            onClick={handleCheckout}
            disabled={isCheckout}
          >
            {isCheckout ? "Compra Finalizada!" : "Finalizar Compra"}
          </button>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Cart;