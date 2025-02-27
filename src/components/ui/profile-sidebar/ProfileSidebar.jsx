import { Link, useLocation } from 'react-router-dom';
import cl from './ProfileSidebar.module.css';
import { useSelector } from 'react-redux';

const ProfileSidebar = () => {
    const { user } = useSelector(state => state.auth);
    const location = useLocation();
    
    const getActive = (path) => {
        return location.pathname === path ? `${cl.list__item} ${cl.active}` : cl.list__item;
    }
    return(
        <div className={cl.profile__list}>
            <h2 style={{marginBottom: '10px'}}>Личный кабинет</h2>
            <Link to={`/users/${user?.id}`} className={getActive(`/users/${user?.id}`)}>Профиль</Link>
            <Link to={'/users/favorites'} className={getActive('/users/favorites')}>Избранное</Link>
            <Link className={getActive('/users/cart')}>Моя корзина</Link>
            <Link className={getActive('/users/orders')}>Мои заказы</Link>
        </div>
    );
};

export default ProfileSidebar;


