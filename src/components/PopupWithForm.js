import React from 'react';

function PopupWithForm({ isOpen, name, title, onSubmit, children, onClose }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} id={`popup_${name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`form-${name}`}
          autoComplete="off"
          id="popup_form-edit"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
        </form>
        <button
          type="button"
          className="popup__close-button button"
          aria-label="Закрыть окно редактирования"
          id="profile-edit_close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
