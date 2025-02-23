import { useEffect, useState } from "react";
import UiButton from "../ui/ui-button/UiButton";
import UiInput from "../ui/ui-input/UiInput";
import cl from './AuthForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { login, refreshError, registration } from "../../store/authActions";
import { authTypes } from "../../config/auth.config";

const AuthForm = ({ authTypeTabs, setAuthTypeTabs, setModalActive }) => {
    const dispatch = useDispatch();
    const { user, loading, error, isAuthenticated, registrationSuccess} = useSelector((state) => state.auth);
    

    
    useEffect(() => {
        return () => {
            setAuthTypeTabs(authTypes.LOGIN);
            
            dispatch(refreshError());
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated || registrationSuccess) {
            setModalActive(false);
        }
    }, [isAuthenticated, registrationSuccess]);

 
    const [formValues, setFormValues] = useState({
        phone: '',
        password: '',
        name: '',
        email: '',
        confirmPassword: ''
    })

    const inputChangeHandler = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    

    const registrationHandler = async (e) => {
        e.preventDefault();
        console.log('Registration form values:', formValues);
        dispatch(registration({
            phone: formValues.phone,
            password: formValues.password,
            name: formValues.name,
            email: formValues.email,
        }));
    };

    const loginHandler = async (e) => {
        e.preventDefault()
        console.log(formValues);
        
        dispatch(login({ 
            phone: formValues.phone, 
            password: formValues.password,
            name: formValues.name,
            email: formValues.email,
        }));
    }
    
    if (authTypeTabs === authTypes.LOGIN) {
        return (
            <form className={cl.authForm} onSubmit={loginHandler}>
                <h1>Войти</h1>
                <div className={cl.inputContainer}>
                    <UiInput 
                        placeholder="Номер телефона или электронная почта"
                        name='phone'
                        value={formValues.phone}
                        onChange={inputChangeHandler} 
                    />
                    <UiInput 
                        placeholder="Пароль"
                        name='password' 
                        type="password" 
                        value={formValues.password}
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className={cl.rememberMe}>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">Запомнить меня</label>
                </div>
                <UiButton> 
                    Войти
                </UiButton>
                <UiButton
                    className={cl.createAccountButton}
                    text='Создать аккаунт'
                    onClick={() => {
                        setAuthTypeTabs(authTypes.REGISTRATION)
                        dispatch(refreshError());
                    }}
                >
                    Создать аккаунт
                </UiButton>
                {error}
            </form>
        );
    } else {
        return (
            <form className={cl.authForm} onSubmit={registrationHandler}>
                <h1>Регистрация</h1>
                <div className={cl.inputContainer}>
                    <UiInput 
                        placeholder="Имя" 
                        type="text"
                        name='name'
                        value={formValues.name}
                        onChange={inputChangeHandler}
                    />
                    <UiInput 
                        placeholder="Номер телефона"
                        name='phone'
                        value={formValues.phone}
                        onChange={inputChangeHandler} 
                    />
                    <UiInput 
                        placeholder="Электронная почта" 
                        type="email"
                        name='email'
                        value={formValues.email}
                        onChange={inputChangeHandler} 
                    />
                    <UiInput 
                        placeholder="Пароль" 
                        type="password"
                        name='password'
                        value={formValues.password}
                        onChange={inputChangeHandler} 
                    />
                    <UiInput 
                        placeholder="Повторите пароль" 
                        type="password"
                        name='confirmPassword'
                        value={formValues.confirmPassword}
                        onChange={inputChangeHandler} 
                    />
                </div>
                <UiButton>
                    Регистрация
                </UiButton>
                {error}
            </form>
        );
    }
};

export default AuthForm;