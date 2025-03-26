import { useEffect, useState } from "react";
import ProductList from "../../../components/product-list/ProductList";
import ProfileLayout from "../../../layouts/profile-layout/ProfileLayout";
import { useSelector } from "react-redux";
import cl from './UserFavoritePage.module.css'


const UserFavoritePage = () => {

  const [products, setProducts] = useState([]);
  const { favorites } = useSelector((state) => state.auth);

  useEffect(() => {
    setProducts(favorites);
  }, [favorites]);

  return(
    <ProfileLayout>
      {products.length > 0 ? (
                <ProductList 
                products={products}
              />
            ) : (
                <p className={cl.noProductsMessage}>Избранные товары отсутствуют</p>
            )}
      
    </ProfileLayout>
  );
};


export default UserFavoritePage;