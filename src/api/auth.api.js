import axios from "axios";

export const userLogin = async (credentials) => {
    const response = await axios.post('http://localhost:3000/auth/login', credentials);
    return response.data;
}

export const userRegistration = async (credentials) => {
    console.log("Отправка запроса на регистрацию:", credentials);
    const response = await axios.post('http://localhost:3000/users/registration', credentials);
    console.log("Ответ сервера:", response.data);
    return response.data;
};
