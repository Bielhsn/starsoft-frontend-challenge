"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { Trash, Minus, Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface NFT {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<NFT[]>([]);
  const [isCheckout, setIsCheckout] = useState(false); // Estado para finalizar compra
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const groupedItems = storedCart.reduce((acc: NFT[], item: NFT) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);

    setCartItems(groupedItems);
  }, []);

  const updateCart = (updatedCart: NFT[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart.flatMap((item) =>
      Array(item.quantity).fill({ id: item.id, name: item.name, price: item.price, image: item.image })
    )));
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //Finaliza a compra e altera o botão
  const handleCheckout = () => {
    setIsCheckout(true);
    setTimeout(() => {
      setCartItems([]); // Limpa o carrinho após a finalização
      localStorage.removeItem("cart"); // Remove do localStorage
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.push("/")}>
        <ArrowLeft size={24} color="#FF8310" />
      </button>

      <h2 className={styles.title}>Mochila de Compras</h2>

      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Seu carrinho está vazio.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <Image src={item.image} alt={item.name} width={50} height={50} className={styles.itemImage} />
              
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <div className={styles.priceContainer}>
                  <Image src="/assets/icons/ETH.png" alt="Ethereum" width={15} height={15} />
                  <strong>{(item.price * item.quantity).toFixed(2)} ETH</strong>
                </div>
              </div>

              <div className={styles.quantityControl}>
                <button onClick={() => decreaseQuantity(item.id)}><Minus size={14} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}><Plus size={14} /></button>
              </div>

              <button onClick={() => removeItem(item.id)} className={styles.removeButton}>
                <Trash size={18} />
              </button>
            </div>
          ))}

          <div className={styles.totalContainer}>
            <h3>Total</h3>
            <div className={styles.priceContainer}>
              <Image src="/assets/icons/ETH.png" alt="Ethereum" width={15} height={15} />
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
    </div>
  );
};

export default Cart;
