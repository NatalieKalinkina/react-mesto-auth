import React from 'react';
import logo from '../images/logo.svg';

function Header({email, button}) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип проекта Место" />
      <div className='header__text'>
      <p className='header__email'>{email}</p>
      <p className='header__info'>{button}</p>
      </div>
    </header>
  );
}

export default Header;
