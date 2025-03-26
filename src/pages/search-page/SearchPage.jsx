import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../../components/product-list/ProductList";
import { searchProducts } from "../../api/product.api";
import cl from './SearchPage.module.css';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('query') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const sortBy = searchParams.get('sortBy') || '';
    const sortOrder = searchParams.get('sortOrder') || '';
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const params = new URLSearchParams();
            if (searchQuery) params.append('search', searchQuery);
            if (minPrice) params.append('minPrice', minPrice);
            if (maxPrice) params.append('maxPrice', maxPrice);
            if (sortBy) params.append('sortBy', sortBy);
            if (sortOrder) params.append('sortOrder', sortOrder);

            const queryString = params.toString() ? `?${params.toString()}` : '';
            const response = await searchProducts(queryString);
            setProducts(response);
        };

        fetchProducts();
    }, [searchQuery, minPrice, maxPrice, sortBy, sortOrder]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newParams = new URLSearchParams(searchParams);

        if (value) {
            newParams.set(name, value);
        } else {
            newParams.delete(name);
        }

        setSearchParams(newParams);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (value) {
            const [sortByValue, sortOrderValue] = value.split('-');
            newParams.set('sortBy', sortByValue);
            newParams.set('sortOrder', sortOrderValue.toUpperCase());
        } else {
            newParams.delete('sortBy');
            newParams.delete('sortOrder');
        }

        setSearchParams(newParams);
    };

    return (
        <div className={cl.main}>
            {searchQuery && (
                <h2 className={cl.searchResultsTitle}>Результаты поиска по "{searchQuery}":</h2>
            )}
            <div className={cl.filterSortContainer}>
                <div className={cl.filters}>
                    <div className={cl.priceFilter}>
                        <label>Цена:</label>
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Мин"
                            value={minPrice}
                            onChange={handleFilterChange}
                            min="0"
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Макс"
                            value={maxPrice}
                            onChange={handleFilterChange}
                            min="0"
                        />
                    </div>
                </div>

                <div className={cl.sort}>
                    <label>Сортировать по:</label>
                    <select
                        value={sortBy && sortOrder ? `${sortBy}-${sortOrder.toLowerCase()}` : ''}
                        onChange={handleSortChange}
                    >
                        <option value="">Выбрать...</option>
                        <option value="price-asc">Цене (по возрастанию)</option>
                        <option value="price-desc">Цене (по убыванию)</option>
                        <option value="rating-asc">Рейтингу (по возрастанию)</option>
                        <option value="rating-desc">Рейтингу (по убыванию)</option>
                    </select>
                </div>
            </div>
            {products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <p className={cl.noProductsMessage}>Подходящих товаров не найдено</p>
            )}
        </div>
    );
};

export default SearchPage;