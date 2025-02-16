import {  useState } from "react";
import ProductList from "../components/product-list/ProductList";

const MainPage = () => {

    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Брелок BUDI BASA Зайка Ми В розовом платье, с цветочком',
            price: 600,
            img: 'https://ir-3.ozone.ru/s3/multimedia-1-8/wc1000/6942578336.jpg',
            rating: 4.1,
            comments: 2,
          },
          {
            id: 2,
            name: 'Брелок BUDI BASA Зайка Ми В розовом платье, с цветочком',
            price: 600,
            img: 'https://ir-3.ozone.ru/s3/multimedia-1-8/wc1000/6942578336.jpg',
            rating: 4.1,
            comments: 2,
          },
          {
            id: 3,
            name: 'Брелок BUDI BASA Зайка Ми В розовом платье, с цветочком',
            price: 600,
            img: 'https://ir-3.ozone.ru/s3/multimedia-1-8/wc1000/6942578336.jpg',
            rating: 4.1,
            comments: 2,
          },
          {
            id: 4,
            name: 'Брелок BUDI BASA Зайка Ми В розовом платье, с цветочком',
            price: 600,
            img: 'https://ir-3.ozone.ru/s3/multimedia-1-8/wc1000/6942578336.jpg',
            rating: 4.1,
            comments: 2,
          },
          {
            id: 5,
            name: 'Брелок BUDI BASA Зайка Ми В розовом платье, с цветочком',
            price: 600,
            img: 'https://ir-3.ozone.ru/s3/multimedia-1-8/wc1000/6942578336.jpg',
            rating: 4.1,
            comments: 2,
          },
          {
            id: 6,
            name: 'Брелок BUDI BASA Зайка Ми В розовом платье, с цветочком',
            price: 600,
            img: 'https://ir-3.ozone.ru/s3/multimedia-1-8/wc1000/6942578336.jpg',
            rating: 4.1,
            comments: 2,
          },
    ])
    
    return(
        <ProductList 
            products={products}
        />

    );
};

export default MainPage;