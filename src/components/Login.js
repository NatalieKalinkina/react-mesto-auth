import React from 'react';

function Login() {
  return (
    <div className="login">
        <div className='login__container'>
        <h2 className="login__title">Вход</h2>
        <form
          className="login__form"
          name="form-login"
          autoComplete="off"
          id="login_form-edit"
          noValidate
        >
          <input
          type="email"
          className="login__text login__text_type_email"
          name="email"
          id="email-input"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
        />
       
        <input
          type="password"
          className="login__text login__text_type_password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          required
        />
        <button type="submit" className="login__submit-button" id="login-submit-button">
          Войти
        </button>
        </form>
        </div>
      </div>
  );
}

export default Login;
