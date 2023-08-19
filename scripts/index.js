import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './constants.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import Popup from './Popup.js';

document.addEventListener('DOMContentLoaded', function () {
  const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
  const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
  const elementsContainer = document.querySelector('.elements');
  const formElementEdit = document.querySelector('.popup__form_edit');
  const formElementAdd = document.querySelector('.popup__form_add');

  const popupEditProfile = new Popup('.popup_type-edit');
  const popupCard = new PopupWithImage('.popup_type-card');
  popupCard.setEventListeners();

  const addCardPopup = new PopupWithForm('.popup_type-add', (data) => {
    addCardToPage(data);
  });
  addCardPopup.setEventListeners();

  const nameInput = popupEditProfile._popup.querySelector('.popup__input_type_name');
  const bioInput = popupEditProfile._popup.querySelector('.popup__input_type_bio');
  const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    bioSelector: '.profile__bio'
  });

  const editProfileValidator = new FormValidator(
    {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    },
    formElementEdit
  );

  const addCardValidator = new FormValidator(
    {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    },
    formElementAdd
  );

  editProfileValidator.enableValidation();
  addCardValidator.enableValidation();

  function addCardToPage(cardData) {
    const cardHTML = createCardElement(cardData);
    cardList.addItem(cardHTML);
  }

  function createCardElement(cardData) {
    const card = new Card(cardData, '#card-template', () => openImagePopup(cardData));
    return card.generateCard();
  }

  const openImagePopup = (cardData) => {
    popupCard.open(cardData);
  };

  function openEditProfilePopup() {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    bioInput.value = userData.bio;
    popupEditProfile.open();
  }

  function handleFormEditSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newBio = bioInput.value;
    userInfo.setUserInfo({ name: newName, bio: newBio });
    popupEditProfile.close();
  }

  buttonOpenEditProfilePopup.addEventListener('click', () => openEditProfilePopup());
  buttonOpenAddCardPopup.addEventListener('click', () => addCardPopup.open());
  formElementEdit.addEventListener('submit', handleFormEditSubmit);

  const cardList = new Section(
    {
      items: initialCards,
      renderer: (cardData) => {
        const cardHTML = createCardElement(cardData);
        cardList.addItem(cardHTML);
      }
    },
    '.elements'
  );

  cardList.renderItems();
});
