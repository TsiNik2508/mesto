import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../components/constants.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import PopupWithAvatar from '../components/PopupWithAvatar.js';
import Card from '../components/Card.js';

let userId;

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

// Создание попапа с формой добавления карточки
const addCardPopup = new PopupWithForm('.popup_type-add', (data) => {
  addCardToPage(data);
  addCardPopup.close();
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
    api.deleteCard(cardId)
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

// Создание карточки
function createCardElement(cardData, userId) {
  const isOwner = cardData.owner && cardData.owner._id === userId;
  const isLiked = cardData.likes ? cardData.likes.some((like) => like._id === userId) : false;
  const card = new Card(
    cardData,
    '#card-template',
    () => openImagePopup(cardData),
    api,
    handleCardDelete,
    isOwner,
    isLiked
  );
  return card.generateCard();
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

// Добавление обработчика для кнопки открытия формы добавления карточки
buttonOpenAddCardPopup.addEventListener('click', () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

// Функция добавления карточки на страницу
function addCardToPage(cardData) {
  const cardHTML = createCardElement(cardData, userId);
  cardList.addItem(cardHTML);
}

// Создание списка карточек на странице
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardHTML = createCardElement(cardData, userId);
      cardList.addItem(cardHTML);
    },
  },
  '.elements'
);

// Загрузка данных с сервера и добавление начальных карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);

    api.addCard({
      name: 'Рик и Морти',
      link: 'https://srisovki.com/wp-content/uploads/2020/10/u_d0a8.jpg',
    })
      .then((newCardData) => {
        console.log(newCardData);
        addCardToPage(newCardData);
      })
      .catch((error) => {
        console.error(`Ошибка при добавлении карточки: ${error}`);
      });
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
  api.editUserInfo(data)
  popupEditProfile.setSubmitButtonCaption('Сохранение...');
  api.editUserInfo(data)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((error) => {
      console.error(`Ошибка при редактировании профиля: ${error}`);
    })
    .finally(() => {
      popupEditProfile.setSubmitButtonCaption('Сохранить');
    });
}

// Включение валидации форм
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
avatarValidator.enableValidation();

// Добавление обработчиков для кнопок открытия попапов
buttonOpenEditProfilePopup.addEventListener('click', () => {
  openEditProfilePopup();
  popupEditProfile.setSubmitButtonCaption('Сохранить');
});
buttonOpenAddCardPopup.addEventListener('click', () => addCardPopup.open());

// Создание и настройка попапа удаления карточки
const popupDelete = new PopupWithDelete('.popup_type-delete', (cardId) => {
  api.deleteCard(cardId)
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
  popupWithAvatar.open();
});
