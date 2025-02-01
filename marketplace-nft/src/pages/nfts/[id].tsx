"use client";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "../../styles/NFTDetails.module.css";

// Importação dinâmica dos componentes
const Image = dynamic(() => import("next/image"), { ssr: false });

export interface NFT {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const NFTDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [nft, setNFT] = useState<NFT | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNFT = async () => {
      try {
        const response = await fetch(`/api/nfts/${id}`);

        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setNFT(result);
      } catch (error) {
        console.error("Erro ao buscar detalhes do NFT:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFT();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!nft) return <p>Erro ao carregar NFT.</p>;

  return (
    <div className={styles.container}>
      <Image
        src={nft.image}
        alt={nft.name}
        width={300}
        height={300}
        className={styles.nftImage}
        loading="lazy"
      />
      <h1 className={styles.title}>{nft.name}</h1>
      <p className={styles.description}>{nft.description}</p>
      <p className={styles.price}>
        <strong>{nft.price} ETH</strong>
      </p>
    </div>
  );
};

export default NFTDetails;
