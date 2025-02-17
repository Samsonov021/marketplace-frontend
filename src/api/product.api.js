import axios from "axios"

export const getAllProducts = async () => {
    const response = await axios.get('http://localhost:3000/products');
    return response.data;
}