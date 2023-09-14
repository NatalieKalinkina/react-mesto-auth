import React from 'react';

function Register() {
  return (
    <div className="login">
        <h2 className="login__title">Регистрация</h2>
        <form
          className="login__form"
          name={`form-${login}`}
          autoComplete="off"
          id="login_form-edit"
          noValidate
          onSubmit={onSubmit}
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
          value={email || ''}
          onChange={handleEmailChange}
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
          value={password || ''}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="login__submit-button" id="login-submit-button">
          Зарегистрироваться
        </button>
        </form>
        <h3 className='login__subtitle'>Уже зарегистрированы? Войти</h3>
       
      </div>
  );
}

export default Register;
