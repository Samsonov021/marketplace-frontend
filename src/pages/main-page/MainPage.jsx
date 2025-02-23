import {  useEffect, useState } from "react";
import ProductList from "../../components/product-list/ProductList";
import cl from './MainPage.module.css'
import { getAllProducts } from "../../api/product.api";

const MainPage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const response = await getAllProducts();
      console.log(response)
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