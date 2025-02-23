import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../api/product.api";
import styles from './ProductPage.module.css';

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getOneProduct(id);
            setProduct(response);
        }
        fetchProduct();
    }, [id]); 

    
    if (!product) {
        return <h1 style={{textAlign: 'center', fontSize: '70px'}}>Загрузка страницы...</h1>;
    }
    return (
        <div className={styles.product__container}>
            <div className={styles.image__container}>
                <img src={product.photo} alt={product.name} className={styles.product__image} />
            </div>
            <div className={styles.info__container}>
                <p className={styles.product__name}>{product.name}</p>
                <p className={styles.product__description}>{product.description}</p>
                <div className={styles.specifications}>
                    <h2>О товаре</h2>
                    <table className={styles.spec__table}>
                        <tbody>
                            <tr>
                                <td>Ширина, см</td>
                                <td>{product.dimensions.width}</td>
                            </tr>
                            <tr>
                                <td>Высота, см</td>
                                <td>{product.dimensions.height}</td>
                            </tr>
                            <tr>
                                <td>Глубина, см</td>
                                <td>{product.dimensions.length}</td>
                            </tr>
                            <tr>
                                <td>Вес, г</td>
                                <td>{product.dimensions.weight}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.price__container}>
                <p className={styles.product__price}>{product.price} руб.</p>
                <button className={styles.buy__button}>Добавить в корзину</button>
            </div>
        </div>
    );
}

export default ProductPage;