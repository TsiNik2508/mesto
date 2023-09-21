// Для удобства и функциональности: вынес константы апи-конфига/валидации и константы Dom-элементов, в отдельный файл
const apiConfig = ({
  baseUrl: 'https://nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: '15456b01-b272-4795-9fed-b0870e9982e9',
    'Content-Type': 'application/json',
  },
});

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const formProfile = document.querySelector('.popup__form_edit');
const popupAddCard = document.querySelector('.popup_type-add');
const cardsContainer = document.querySelector('.elements');
const closeButtons = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileBio = document.querySelector('.profile__bio');
const profileAvatar = document.querySelector('.profile__avatar');
const formAddElement = popupAddCard.querySelector('.popup__form');
const nameAddInput = formAddElement.querySelector('.popup__input_type_name');
const imageInput = formAddElement.querySelector('.popup__input_type_link');
const nameInput = document.querySelector('.popup__input_type_name');
const bioInput = document.querySelector('.popup__input_type_bio');
const profileFormSubmitButton = formProfile.querySelector('.popup__button');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type-edit');
const InitialCards = '.elements';

// Конфигурация для валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
};

export {
  popupAddCard,
  closeButtons,
  buttonEditProfile,
  buttonAddCard,
  profileName,
  profileBio,
  profileAvatar,
  formAddElement,
  nameAddInput,
  imageInput,
  formProfile,
  nameInput,
  bioInput,
  profileFormSubmitButton,
  avatarEditButton,
  popups,
  popupEdit,
  cardsContainer,
  InitialCards,
  validationConfig,
  apiConfig
};
