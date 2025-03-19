import React, { useState } from "react";
import UiInput from "../ui-input/UiInput";
import UiButton from "../ui-button/UiButton";
import cl from './NavBar.module.css';
import UiModal from "../modal/UiModal";
import AuthForm from "../../auth-form/AuthForm";
import { authTypes } from "../../../config/auth.config";
import { useDispatch, useSelector } from "react-redux";
import { logout, setSearchQuery } from "../../../store/authActions";
import { Link } from "react-router-dom";
import searchIcon from '../../../image/search-icon.png';

const Navbar = () => {
    const [modalActive, setModalActive] = useState(false);
    const [authTypeTabs, setAuthTypeTabs] = useState(authTypes.LOGIN);
    const [localSearchQuery, setLocalSearchQuery] = useState("");
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(setSearchQuery(localSearchQuery));
    };

    const clearSearch = () => {
        dispatch(setSearchQuery(''));
        setLocalSearchQuery(''); 
    };

    return (
        <div className={cl.navbar}>
            {modalActive && (
                <UiModal visible={modalActive} setVisible={setModalActive} setAuthTypeTabs={setAuthTypeTabs}>
                    <AuthForm
                        authTypeTabs={authTypeTabs}
                        setAuthTypeTabs={setAuthTypeTabs}
                        modalActive={modalActive}
                        setModalActive={setModalActive}
                    />
                </UiModal>
            )}
            <Link to="/" className={cl.navbar__logo} onClick={clearSearch}>
                Логотип
            </Link>
            <div className={cl.navbar__input}>
                <UiInput
                    placeholder='Поиск'
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="Поиск"
                    className={cl.searchIcon}
                    onClick={handleSearch}
                />
            </div>
            <div className={cl.navbar__auth}>
                {isAuthenticated ? (
                    <div className={cl.userInfo}>
                        <Link to={`/users/${user.id}`} className={cl.userName}>{user.name}</Link>
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
