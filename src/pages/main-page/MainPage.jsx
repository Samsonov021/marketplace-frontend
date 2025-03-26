import { useEffect, useState } from "react";
import ProductList from "../../components/product-list/ProductList";
import cl from './MainPage.module.css';
import { getAllProducts } from "../../api/product.api";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProducts();
        setProducts(response);
      } catch (error) {
        console.error("Ошибка загрузки продуктов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={cl.main}>
      {loading ? (
        <p>Загрузка продуктов...</p>
      ) : products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p className={cl.noProductsMessage}>Товары не найдены.</p>
      )}
    </div>
  );
};

export default MainPage;
