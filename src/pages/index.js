import '../pages/index.css';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section  from '../components/Section.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import Card from '../components/Card.js';

let userId;
let profileAvatar;

const storedAvatarUrl = localStorage.getItem('avatar');

if (storedAvatarUrl) {
  profileAvatar = document.querySelector('.profile__avatar');
  profileAvatar.src = storedAvatarUrl;
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: '15456b01-b272-4795-9fed-b0870e9982e9',
    'Content-Type': 'application/json',
  },
});

const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const elementsContainer = document.querySelector('.elements');
const formElementAvatar = document.querySelector('.popup__form_type-avatar');

const popupCard = new PopupWithForm('.popup_type-card', () => {});
popupCard.setEventListeners();

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const avatarValidator = new FormValidator(validationConfig, formElementAvatar);
avatarValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, formElementAdd);
addCardValidator.enableValidation();

const addCardPopup = new PopupWithForm('.popup_type-add', (data) => {
  const originalButtonText = addCardPopup.getSubmitButtonCaption();
  addCardPopup.disableSubmitButton();
  api
    .addCard(data)
    .then((newCardData) => {
      addCardToPage(newCardData);
      addCardPopup.close();
    })
    .catch((error) => {
      console.error(`Ошибка при создании карточки: ${error}`);
    })
    .finally(() => {
      addCardPopup.setSubmitButtonCaption(originalButtonText);
      addCardPopup.enableSubmitButton();
    });
});

addCardPopup.setEventListeners();

const editProfileValidator = new FormValidator(validationConfig, formElementEdit);
editProfileValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  bioSelector: '.profile__bio',
  avatarSelector: '.profile__avatar',
});

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

function createCardElement(cardData) {
  const card = new Card(cardData, '#card-template', userId, {
    handleCardClick: openImagePopup,
    handleCardLike: handleCardLike,
    handleCardDelete: (cardId) => {
      handleCardDelete(cardId);
      cardId: cardData._id;
      card.toggleLike();
    },
  });
  return card.createCardElement();
}

function addCardToPage(cardData) {
  const card = createCardElement(cardData);
  cardList.addItem(card);
}

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

const nameInput = formElementEdit.querySelector('.popup__input_type_name');
const bioInput = formElementEdit.querySelector('.popup__input_type_bio');

const popupEditProfile = new PopupWithForm('.popup_type-edit', (data) => {
  const originalButtonText = popupEditProfile.getSubmitButtonCaption();
  popupEditProfile.disableSubmitButton();
  api
    .editUserInfo(data)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((error) => {
      console.error(`Ошибка при редактировании профиля: ${error}`);
    })
    .finally(() => {
      popupEditProfile.setSubmitButtonCaption(originalButtonText);
      popupEditProfile.enableSubmitButton();
    });
});

popupEditProfile.setEventListeners();

function openImagePopup(cardData) {
  popupCard.open(cardData);
}

function openEditProfilePopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  bioInput.value = userData.bio;
  editProfileValidator.resetValidation();
  popupEditProfile.open();
}

function handleCardLike(cardId, isLiked) {
  api
    .likeCard(cardId, isLiked)
    .then((updatedCard) => {
      return updatedCard;
    })
    .catch((error) => {
      console.error('Ошибка при постановке/снятии лайка:', error);
      throw error;
    });
}

function handleUnlikeCard(cardId) {
  api
    .unlikeCard(cardId)
    .then((updatedCard) => {
      return updatedCard;
    })
    .catch((error) => {
      console.error(`Ошибка при удалении лайка: ${error}`);
      throw error;
    });
}

buttonOpenAddCardPopup.addEventListener('click', () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

const popupDelete = new PopupWithDelete('.popup_type-delete', (cardId) => {
  api
    .deleteCard(cardId)
    .then(() => {
      cardList.removeItem(cardId);
    })
    .catch((error) => {
      console.error(`Ошибка при удалении карточки: ${error}`);
    });
});
popupDelete.setEventListeners();

const popupWithAvatar = new PopupWithForm('.popup_type-avatar', (avatarUrl) => {
  profileAvatar.src = avatarUrl;
}, api);
popupWithAvatar.setEventListeners();

const buttonOpenAvatarEditPopup = document.querySelector('.profile__avatar-edit-button');
buttonOpenAvatarEditPopup.addEventListener('click', () => {
  avatarValidator.resetValidation();
  popupWithAvatar.open();
});

buttonOpenEditProfilePopup.addEventListener('click', () => {
  openEditProfilePopup();
});
