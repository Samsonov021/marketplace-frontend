import React from "react";
import UiInput from "../ui-input/UiInput";
import UiButton from "../ui-button/UiButton";
import cl from './NavBar.module.css';


const Navbar = () => {
    return (
        <div className={cl.navbar}>
            <div className={cl.navbar__logo}>
            Логотип
            </div>
            <div className={cl.navbar__input}>
                <UiInput
                placeholder = 'Поиск'
                />
            </div>
            <div className={cl.navbar__button}>
                <UiButton 
                text = 'Войти'
                /> 
                    
                
            </div>
        </div>
    );
};

export default Navbar;