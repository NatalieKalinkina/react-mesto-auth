import React from 'react';
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип проекта Место" />
    </header>
  );
}

export default Header;
