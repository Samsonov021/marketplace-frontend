import React from "react";
import cl from './Footer.module.css'
const Footer = () => {
    return (
        <div className={cl.footer}>
            <div className={cl.footer__info}>
                <p>&copy; 2023 Ваше Имя. Все права защищены.</p>
                <p>Email: <a href="mailto:pochta@gmail.com">pochta@gmail.com</a></p>
                <p>Телефон: <a href="tel:+79889532158">+7 (988) 953-21-58</a></p>
            </div>
        </div>
    );
};

export default Footer;