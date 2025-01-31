"use client";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/cartSlice'
import { RootState } from '../redux/store'
import styles from '../styles/NFTCard.module.css'

interface NFTCardProps {
  nft: {
    id: string
    name: string
    description: string
    image: string
    price: number
  }
}

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const isInCart = cartItems.some((item) => item.id === nft.id)

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(removeFromCart(nft.id))
    } else {
      dispatch(addToCart(nft))
    }
  }

  return (
    <div className={styles.nftCard}>
      <img src={nft.image} alt={nft.name} className={styles.nftImage} />
      <h3 className={styles.title}>{nft.name}</h3>
      <p>{nft.description}</p>
      <p className={styles.price}><strong>{nft.price} ETH</strong></p>
      <button onClick={handleCartAction} className={`${styles.button} ${isInCart ? styles.added : ''}`}>
  {isInCart ? 'Adicionado ao Carrinho' : 'Comprar'}
</button>

    </div>
  )
}

export default NFTCard
