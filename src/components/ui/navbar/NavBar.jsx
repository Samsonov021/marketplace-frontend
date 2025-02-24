import React, { useState } from "react";
import UiInput from "../ui-input/UiInput";
import UiButton from "../ui-button/UiButton";
import cl from './NavBar.module.css';
import UiModal from "../modal/UiModal";
import AuthForm from "../../auth-form/AuthForm";
import { authTypes } from "../../../config/auth.config";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/authActions";


const Navbar = () => {
    
    const [modalActive, setModalActive] = useState(false);
    const [authTypeTabs, setAuthTypeTabs] = useState(authTypes.LOGIN);
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    return (
        <div className={cl.navbar}>
            {
            modalActive && 
                (<UiModal visible={modalActive} setVisible={setModalActive} setAuthTypeTabs={setAuthTypeTabs}>
                    <AuthForm 
                        authTypeTabs={authTypeTabs}
                        setAuthTypeTabs={setAuthTypeTabs}
                        modalActive={modalActive} 
                        setModalActive={setModalActive}
                    />
                </UiModal>)
            }
            <div className={cl.navbar__logo}>
                Логотип
            </div>
            <div className={cl.navbar__input}>
                <UiInput
                placeholder='Поиск'
                />
            </div>
            <div className={cl.navbar__auth}>
                {isAuthenticated ? (
                    <div className={cl.userInfo}>
                        <p className={cl.userName}>{user.name}</p>
                        <UiButton onClick={() => dispatch(logout())}>
                            Выйти
                        </UiButton>
                    </div>
                ) : (
                    <UiButton onClick={() => setModalActive(true)}>
                        Войти
                    </UiButton>
                )}
            </div>
        </div>
    );
};

export default Navbar;