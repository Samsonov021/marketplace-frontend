import {  useEffect, useState } from "react";
import ProductList from "../../components/product-list/ProductList";
import cl from './MainPage.module.css'
import { getAllProducts } from "../../api/product.api";
import ProfileLayout from "../../layouts/profile-layout/ProfileLayout";

const MainPage = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAll = async () => {
      const response = await getAllProducts();
      setProducts(response);
    }  
    getAll();
  }, []);

  return(
    <div className={cl.main}>
      <ProductList  
        products={products}
      />
    </div>
  );
};

export default MainPage;