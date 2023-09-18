import React from 'react';

function InfoToolTip({title, image, onClose, isOpen}) {
  return (
    <div className={`info popup ${isOpen && 'popup_opened'}`} id=''>
      <div className="info__container">
        <img className='info__icon' src={image} alt=""/>
        <h2 className="info__title">{title}</h2>
          <button
          type="button"
          className="popup__close-button button"
          aria-label="Закрыть окно"
          id="info_close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;