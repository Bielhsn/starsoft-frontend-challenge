"use client";
import React from 'react';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NFT } from "./nfts/[id]";
import dynamic from "next/dynamic";

const NFTCard = dynamic(() => import("@/components/NFTCard"), { ssr: false });

const fetchNFTs = async () => {
  try {
    const response = await axios.get('https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products?page=1&limit=20');
    console.log('Resposta da API:', response.data); // Verifica o formato
    return response.data.data; // Retorna o array de NFTs
  } catch (error) {
    console.error('Erro ao buscar NFTs:', error);
    return []; // Retorna array vazio para evitar erro no .map()
  }
};

const HomePage = () => {
  const { data: nfts = [], isLoading, isError } = useQuery({
    queryKey: ['nfts'],
    queryFn: fetchNFTs
  });

  if (isLoading) return <p>Carregando NFTs...</p>;
  if (isError) return <p>Erro ao carregar NFTs.</p>;

  return (
    <div className="nft-grid">
      {nfts.length > 0 ? (
        nfts.map((nft: NFT) => <NFTCard key={nft.id} nft={nft} />)
      ) : (
        <p>Nenhum NFT encontrado.</p>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['nfts'], queryFn: fetchNFTs });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
