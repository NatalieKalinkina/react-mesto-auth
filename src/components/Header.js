import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ email, onSignOut }) {
  const location = useLocation();
  const mainPage = '/';
  const signInPage = '/sign-in';

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип проекта Место" />
      <div className="header__text">
        <p className="header__email">{email}</p>
        {location.pathname === mainPage ? (
          <Link
            to="sign-in"
            className="header__link"
            style={{ color: '#a9a9a9' }}
            onClick={onSignOut}
          >
            Выйти
          </Link>
        ) : location.pathname === signInPage ? (
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        ) : (
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
