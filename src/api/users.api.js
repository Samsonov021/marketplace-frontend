import axios from "axios";

export const userLogin = async (credentials) => {
    const response = await axios.post('http://localhost:3000/auth/login', credentials);
    return response.data;
}

export const userRegistration = async (credentials) => {
    const response = await axios.post('http://localhost:3000/users/registration', credentials);
    return response.data;
};

export const getAllFavorites = async () => {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(
        `http://localhost:3000/users/favorites`,
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return response.data;
}

export const addFavorite = async (productId) => {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.post(
        `http://localhost:3000/users/favorites/${productId}`,
        {},
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return response.data;
}

export const deleteFavorite = async (productId) => {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.delete(
        `http://localhost:3000/users/favorites/${productId}`,
        
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return response.data;
}

export const addToCart = async (productId) => {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.post(
        `http://localhost:3000/users/cart/add/${productId}`,
        {},
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return response.data;
}

export const deleteFromCart = async (productId) => {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.delete(
        `http://localhost:3000/users/cart/remove/${productId}`,
        
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return response.data;
}

export const increaseQuantityInCart = async (productId) => {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.patch(
        `http://localhost:3000/users/cart/increase/${productId}`,
        {},
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return response.data;
}

export const decreaseQuantityInCart = async (productId) => {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.patch(
        `http://localhost:3000/users/cart/decrease/${productId}`,
        {},
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
    return response.data;
}