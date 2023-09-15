import React from 'react';

function Register() {
  return (
    <div className="register">
        <div className='register__container'>
        <h2 className="register__title">Регистрация</h2>
        <form
          className="register__form"
        
          autoComplete="off"
          id="register_form-edit"
          noValidate
          
        >
          <input
          type="email"
          className="register__text register__text_type_email"
          name="email"
          id="email-input"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          
         
        />
       
        <input
          type="password"
          className="register__text register__text_type_password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          required
         
        />
        <button type="submit" className="register__submit-button" id="register-submit-button">
          Зарегистрироваться
        </button>
        </form>
        <h3 className='register__subtitle'>Уже зарегистрированы? Войти</h3>
        </div>
      </div>
  );
}

export default Register;
