import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "../../components/product-list/ProductList";
import cl from './MainPage.module.css';
import { getAllProducts, searchProducts } from "../../api/product.api";

const MainPage = () => {
  const searchQuery = useSelector((state) => state.auth.searchQuery);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery) {
        const response = await searchProducts(searchQuery);
        setProducts(response);
      } else {
        const response = await getAllProducts();
        setProducts(response);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className={cl.main}>
      {searchQuery && (
        <h2 className={cl.searchResultsTitle}>Результаты поиска по "{searchQuery}":</h2>
      )}
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p className={cl.noProductsMessage}>Подходящих товаров не найдено</p>
      )}
    </div>
  );
};

export default MainPage;
