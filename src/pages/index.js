import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import { Card } from '../components/Card.js';

let userId;

const profileAvatar = document.querySelector('.profile__avatar');
const storedAvatarUrl = localStorage.getItem('avatar');

if (storedAvatarUrl) {
    profileAvatar.src = storedAvatarUrl;
}


// Создание объекта Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: '15456b01-b272-4795-9fed-b0870e9982e9',
    'Content-Type': 'application/json',
  },
});

// Получение элементов страницы
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const elementsContainer = document.querySelector('.elements');
const formElementAvatar = document.querySelector('.popup__form_type-avatar');

// Создание и настройка попапа с изображением
const popupCard = new PopupWithImage('.popup_type-card');
popupCard.setEventListeners();

// Создание валидатора для формы редактирования аватара
const avatarValidator = new FormValidator(
  {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  },
  formElementAvatar
);
avatarValidator.enableValidation();

// Загрузка данных с сервера и добавление начальных карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch((error) => {
    console.error(`Ошибка при загрузке данных с сервера: ${error}`);
  });

// Создание валидатора для формы добавления карточки
const addCardValidator = new FormValidator(
  {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  },
  formElementAdd
);
addCardValidator.enableValidation();

// Создание попапа с формой добавления карточки
const addCardPopup = new PopupWithForm('.popup_type-add', (data) => {
  addCardToPage(data);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// Создание валидатора для формы редактирования профиля
const editProfileValidator = new FormValidator(
  {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  },
  formElementEdit
);
editProfileValidator.enableValidation();

// Создание объекта UserInfo
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  bioSelector: '.profile__bio',
  avatarSelector: '.profile__avatar',
});

// Функция удаления карточки
function handleCardDelete(cardId, cardElement) {
  const popupDelete = new PopupWithDelete('.popup_type-delete', () => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardList.removeItem(cardElement);
        popupDelete.close();
      })
      .catch((error) => {
        console.error(`Ошибка при удалении карточки: ${error}`);
      });
  });
  popupDelete.setEventListeners();
  popupDelete.open();
}

// Создание карточки
function createCardElement(cardData) {
  const isOwner = cardData.owner && cardData.owner._id === userId;
  const isLiked = cardData.likes ? cardData.likes.some((like) => like._id === userId) : false;
  const card = new Card(
    cardData,
    '#card-template',
    userId,
    {
      handleCardClick: openImagePopup,
      handleCardDelete: handleCardDelete,
      handleCardLike: handleCardLike,
      handleCardDeleteLike: handleUnlikeCard,
    }
  );

  return card.createCardElement();
}

// Функция добавления карточки на страницу
function addCardToPage(cardData) {
  const card = createCardElement(cardData);
  cardList.addItem(card);
}

// Создание списка карточек на странице
const cardList = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const cardHTML = createCardElement(cardData);
      cardList.addItem(cardHTML);
    },
  },
  '.elements'
);

// Загрузка данных с сервера и добавление начальных карточек
api
  .getUserInfo()
  .then((userData) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    return api.getInitialCards();
  })
  .then((initialCards) => {
    cardList.renderItems(initialCards);
  })
  .catch((error) => {
    console.error(`Ошибка при загрузке данных с сервера: ${error}`);
  });
  
// Получение элементов формы редактирования профиля
const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const bioInput = formElementEdit.querySelector('.popup__input_type_bio');

// Создание и настройка попапа редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_type-edit', (data) => {
  handleFormEditSubmit(data);
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

// Функция открытия попапа с изображением
function openImagePopup(cardData) {
  popupCard.open(cardData);
}

// Функция открытия попапа редактирования профиля
function openEditProfilePopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  bioInput.value = userData.bio;
  editProfileValidator.resetValidation(); 
  popupEditProfile.open();
}


// Обработчик сабмита формы редактирования профиля
function handleFormEditSubmit(data) {
  const originalButtonText = popupEditProfile._submitButton.textContent;
  popupEditProfile.setSubmitButtonCaption('Сохранение...');
  popupEditProfile._submitButton.setAttribute('disabled', true);

  api
    .editUserInfo(data)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((error) => {
      console.error(`Ошибка при редактировании профиля: ${error}`);
    })
    .finally(() => {
      popupEditProfile.setSubmitButtonCaption(originalButtonText);
      popupEditProfile._submitButton.removeAttribute('disabled');
    });
}


// Функция для обработки лайка карточки
function handleCardLike(cardId, isLiked) {
  return api
    .likeCard(cardId, isLiked)
    .then((updatedCard) => {
      return updatedCard;
    })
    .catch((error) => {
      console.error('Ошибка при постановке/снятии лайка:', error);
      throw error;
    });
}

// Функция для обработки снятия лайка с карточки
function handleUnlikeCard(cardId) {
  return api
    .unlikeCard(cardId)
    .then((updatedCard) => {
      return updatedCard;
    })
    .catch((error) => {
      console.error(`Ошибка при удалении лайка: ${error}`);
      throw error;
    });
}

// Добавление обработчика для кнопки открытия формы добавления карточки
buttonOpenAddCardPopup.addEventListener('click', () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

// Добавление обработчика для кнопки открытия попапа редактирования профиля
buttonOpenEditProfilePopup.addEventListener('click', () => {
  openEditProfilePopup();
  popupEditProfile.setSubmitButtonCaption('Сохранить');
});

// Создание и настройка попапа удаления карточки
const popupDelete = new PopupWithDelete('.popup_type-delete', (cardId) => {
  api
    .deleteCard(cardId)
    .then(() => {
      cardList.removeItem(cardId);
      popupDelete.close();
    })
    .catch((error) => {
      console.error(`Ошибка при удалении карточки: ${error}`);
    });
});
popupDelete.setEventListeners();

// Создание и настройка попапа смены аватара
const popupWithAvatar = new PopupWithAvatar('.popup_type-avatar', (avatarUrl) => {
  const profileAvatar = document.querySelector('.profile__avatar');
  profileAvatar.src = avatarUrl;
}, api);
popupWithAvatar.setEventListeners();

// Добавление обработчика для кнопки открытия попапа смены аватара
const buttonOpenAvatarEditPopup = document.querySelector('.profile__avatar-edit-button');
buttonOpenAvatarEditPopup.addEventListener('click', () => {
  avatarValidator.resetValidation(); 
  popupWithAvatar.open();
});