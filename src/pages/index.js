import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import Section from '../components/Section.js'; 

let UserId; 

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

// Создание и настройка попапа с изображением
const popupCard = new PopupWithImage('.popup_type-card');
popupCard.setEventListeners();

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
  api
    .addCard(data)
    .then((newCardData) => {
      addCardToPage(newCardData);
      addCardPopup.close();
    })
    .catch((error) => {
      console.error(`Ошибка при добавлении карточки: ${error}`);
    });
});
addCardPopup.setEventListeners();

// Создание объекта UserInfo
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  bioSelector: '.profile__bio',
});

// Функция удаления карточки
function handleCardDelete(cardId) {
  if (!cardId) {
    console.error('Неверный cardId');
    return;
  }

  const popupDelete = new PopupWithDelete('.popup_type-delete', () => {
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
  popupDelete.open();
}

function createCardElement(cardData) {
  const isOwner = cardData.owner && cardData.owner._id === UserId;
  const card = new Card(
    cardData,
    '#card-template',
    () => openImagePopup(cardData),
    () => handleLikeClick(cardData, card, UserId),
    handleCardDelete,
    isOwner
  );
  return card.generateCard();
}

function handleLikeClick(cardData, card, UserId) {
  const isLiked = cardData.likes.some((like) => like._id === UserId);
  const cardId = cardData._id;

  if (isLiked) {
    api
      .unlikeCard(cardId)
      .then((newCardData) => {
        card.updateLikes(newCardData.likes);
      })
      .catch((error) => {
        console.error(`Ошибка при удалении лайка: ${error}`);
      });
  } else {
    api
      .likeCard(cardId)
      .then((newCardData) => {
        card.updateLikes(newCardData.likes);
      })
      .catch((error) => {
        console.error(`Ошибка при добавлении лайка: ${error}`);
      });
  }
}

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

// Добавление обработчика для кнопки открытия формы добавления карточки
buttonOpenAddCardPopup.addEventListener('click', () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

// Функция добавления карточки на страницу
function addCardToPage(cardData) {
  const cardHTML = createCardElement(cardData);
  cardList.addItem(cardHTML);
}

// Создание списка карточек на странице без начальных данных
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

// Загрузка начальных карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    UserId = userData._id;
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
  popupEditProfile.open();
}

// Обработчик сабмита формы редактирования профиля
function handleFormEditSubmit(data) {
  api
    .editUserInfo(data)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((error) => {
      console.error(`Ошибка при редактировании профиля: ${error}`);
    });
}

// Добавление обработчиков для кнопок открытия попапов
buttonOpenEditProfilePopup.addEventListener('click', () => openEditProfilePopup());
buttonOpenAddCardPopup.addEventListener('click', () => addCardPopup.open());
