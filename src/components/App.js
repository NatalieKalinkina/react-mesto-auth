import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { api } from '../utils/Api.js';
import * as auth from '../utils/Auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useEffect } from 'react';
import InfoToolTip from './InfoToolTip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem('jwt');

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.error(err));
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => console.error(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => console.error(err));
  }

  function handleUpdateUser(data) {
    api
      .postUserInfo(data)
      .then(user => {
        closeAllPopups();
        setCurrentUser(user);
      })
      .catch(err => console.error(err));
  }

  function handleUpdateAvatar(data) {
    api
      .postUserAvatar(data)
      .then(user => {
        closeAllPopups();
        setCurrentUser(user);
      })
      .catch(err => console.error(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then(newCard => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch(err => console.error(err));
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setInfoToolTipOpen(false);
    setSelectedCard({});
  }

  const onRegister = (email, password) => {
    auth
      .register(email, password)
      .then(res => {
        if (res.data.email) {
          console.log(`Регистрация ${res.data.email} прошла успешно`);
          setIsRegisterSuccess(true);
          setInfoToolTipOpen(true);
          navigate('/sign-in');
        } else {
          setIsRegisterSuccess(false);
          setInfoToolTipOpen(true);
          console.log('Ошибка регистрации', res.data.email);
        }
      })
      .catch(err => {
        console.error('Ошибка запроса', err);
        setIsRegisterSuccess(false);
        setInfoToolTipOpen(true);
      });
  };

  const onLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      auth.checkToken(token).then(res => {
        if (res.email) {
          setLoggedIn(true);
        }
      });
    }
  }, [token]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email="email@mail.ru" button="Выйти" />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditProfile={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />

                <PopupWithForm
                  id="4"
                  name="confirmation"
                  title="Вы уверены?"
                  children={
                    <>
                      <button
                        type="button"
                        className="popup__submit-button"
                        id="confirmation-submit-button"
                      >
                        Да
                      </button>
                    </>
                  }
                />

                <ImagePopup
                  isOpen={isImagePopupOpen}
                  name={selectedCard.name}
                  link={selectedCard.link}
                  onClose={closeAllPopups}
                />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route path="/sign-up" element={<Register onRegister={onRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
        </Routes>
        <InfoToolTip
          isRegisterSuccess={isRegisterSuccess}
          onClose={closeAllPopups}
          isOpen={isInfoToolTipOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
