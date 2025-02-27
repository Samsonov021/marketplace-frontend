import {  useEffect, useState } from "react";
import { getAllFavorites } from "../../../api/users.api";
import ProductList from "../../../components/product-list/ProductList";
import ProfileLayout from "../../../layouts/profile-layout/ProfileLayout";


const UserFavoritePage = () => {

  const [products, setProducts] = useState([]);

  const getFavorites = async () => {
    const response = await getAllFavorites();
    setProducts(response);
  };

  useEffect(() => {
    getFavorites();
  }, [products]);

  return(
    <ProfileLayout>
      <ProductList 
        products={products}
      />
    </ProfileLayout>
  );
};

export default UserFavoritePage;