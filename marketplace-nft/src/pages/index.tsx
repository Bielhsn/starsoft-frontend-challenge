"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";

interface NFT {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Home = () => {
  const dispatch = useDispatch();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [visibleCount, setVisibleCount] = useState(8); // Começa com 8 NFTs visíveis
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch("https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?limit=20");
        const result = await response.json();
        setNfts(result.data);
      } catch (error) {
        console.error("Erro ao buscar NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const loadMoreNFTs = () => {
    if (visibleCount < nfts.length) {
      setVisibleCount((prevCount) => prevCount + 4);
    }
  };

  const addItemToCart = (nft: NFT) => {
    dispatch(addToCart({ ...nft, quantity: 1 }));

    // Define o estado do botão como "Adicionado ao Carrinho"
    setAddedToCart((prev) => ({ ...prev, [nft.id]: true }));

    // Reverte para "COMPRAR" após 5 segundos
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [nft.id]: false }));
    }, 2000);
  };

  const progress = (visibleCount / nfts.length) * 100;

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.grid}>
          {nfts.slice(0, visibleCount).map((nft) => (
            <div key={nft.id} className={styles.card}>
              <Link href={`/nfts/${nft.id}`}>
                <Image src={nft.image} alt={nft.name} width={200} height={200} className={styles.nftImage} />
              </Link>
              <h3 className={styles.title}>{nft.name}</h3>
              <div className={styles.cardContent}>
                <div className={styles.cardText}>
                  <p className={styles.description}>{nft.description}</p>
                </div>

                <div className={styles.priceContainer}>
                  <Image
                    src="/assets/icons/ETH.png"
                    alt="Ethereum"
                    width={20}
                    height={20}
                    className={styles.ethIcon}
                  />
                  <strong className={styles.price}>{nft.price} ETH</strong>
                </div>
                <button className={styles.buyButton} onClick={() => addItemToCart(nft)}>
                  {addedToCart[nft.id] ? "ADICIONADO AO CARRINHO" : "COMPRAR"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
        </div>

        {visibleCount < nfts.length ? (
          <button className={styles.loadMore} onClick={loadMoreNFTs}>
            Carregar mais
          </button>
        ) : (
          <button className={styles.loadMore} disabled>
            Você já viu tudo
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
