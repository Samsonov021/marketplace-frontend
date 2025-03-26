import axios from "axios"

export const getAllProducts = async () => {
    const response = await axios.get('http://localhost:3000/products');
    return response.data;
}

export const getOneProduct = async (id) => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
}

export const searchProducts = async (queryString = '') => {
    const response = await axios.get(`http://localhost:3000/products${queryString}`);
    return response.data;
};