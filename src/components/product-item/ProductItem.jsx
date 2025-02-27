import React, { useEffect, useState } from 'react';
import cl from './ProductItem.module.css';
import { Link, useParams } from 'react-router-dom';
import { addFavorite, deleteFavorite, getAllFavorites } from '../../api/users.api';
import { useSelector } from 'react-redux';

const ProductItem = ({ product }) => {
  const { isAuthenticated} = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [isInCart, setIsInCart] = useState(false);

  const addToFavorite = async () => {
    await addFavorite(product.id);
}

  const deleteFromFavorite = async () => {
    await deleteFavorite(product.id);
  }

const handleAddToFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isFavorite){
      await addToFavorite();
      setIsFavorite(true);
    } else { 
      await deleteFromFavorite();
      setIsFavorite(false);
    }
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setIsInCart(currentValue => !currentValue)
    console.log(`Товар ${product.id} добавлен в корзину`);
  }

  useEffect(() => {
    if (isAuthenticated){
    const checkIfFavorite = async () => {
      const favorites = await getAllFavorites();
      const isProductInFavorites = favorites.some((favorite) => favorite.id === product.id);
      setIsFavorite(isProductInFavorites);
    };
    checkIfFavorite();
    }else{
      setIsFavorite(false)
    }
  }, [isAuthenticated]); 
  
  
  return (
    <Link to={`/products/${product.id}`} className={cl.productContainer}>
        <div className={cl.buttons__container}> 
          <div 
            className={`${cl.favorite__button} ${isFavorite ? cl.active : ''}`}  
            onClick={
              handleAddToFavorite
            }
          > 
            Жмяк
          </div>
          <div className={cl.cart__button} onClick={handleAddToCart}> Жмяк2</div>
        </div>
        <img src={product.photo} alt={product.name} className={cl.productImage} />
        <div className={cl.productPrice}>{product.price} руб.</div>
        <div className={cl.productName}>{product.name}</div>
        <div className={cl.productRating}>Рейтинг: {product.rating}</div>
    </Link>
  );
};

export default ProductItem;