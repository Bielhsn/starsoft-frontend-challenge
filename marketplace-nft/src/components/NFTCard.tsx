"use client";

import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import styles from "../styles/NFTCard.module.css";

interface NFTCardProps {
  nft: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
  };
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const dispatch = useDispatch();
  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some((item) => item.id === nft.id)
  );

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(removeFromCart(nft.id));
    } else {
      dispatch(addToCart(nft));
    }
  };

  return (
    <div className={styles.nftCard}>
      <Link href={`/nfts/${nft.id}`} passHref>
        <div className={styles.clickable}>
          <Image src={nft.image} alt={nft.name} width={200} height={200} className="nft-image" />
          <h3 className={styles.title}>{nft.name}</h3>
          <p>{nft.description}</p>
          <p className={styles.price}>
            <strong>{nft.price} ETH</strong>
          </p>
        </div>
      </Link>

      <button onClick={handleCartAction} className={`${styles.button} ${isInCart ? styles.added : ''}`}>
        {isInCart ? 'Adicionado ao Carrinho' : 'Comprar'}
      </button>
    </div>
  );
};

export default NFTCard;
