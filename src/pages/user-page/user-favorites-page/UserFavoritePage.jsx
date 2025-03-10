import { useEffect, useState } from "react";
import ProductList from "../../../components/product-list/ProductList";
import ProfileLayout from "../../../layouts/profile-layout/ProfileLayout";
import { useSelector } from "react-redux";


const UserFavoritePage = () => {

  const [products, setProducts] = useState([]);
  const { favorites } = useSelector((state) => state.auth);

  useEffect(() => {
    setProducts(favorites);
  }, [favorites]);

  return(
    <ProfileLayout>
      <ProductList 
        products={products}
      />
    </ProfileLayout>
  );
};


export default UserFavoritePage;