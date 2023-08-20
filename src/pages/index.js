// Импорты модулей и стилей
import '../pages/index.css'; 
import Card from '../components/Card.js'; 
import FormValidator from '../components/FormValidator.js'; 
import { initialCards } from '../components/constants.js'; 
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js'; 
import UserInfo from '../components/UserInfo.js'; 
import Section from '../components/Section.js'; 

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
    errorClass: 'popup__error_visible' 
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
  bioSelector: '.profile__bio' 
}); 

// Создание валидатора для формы редактирования профиля
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

// Функция создания элемента карточки
function createCardElement(cardData) { 
  const card = new Card(cardData, '#card-template', () => openImagePopup(cardData)); 
  return card.generateCard(); 
}

// Создание списка карточек на странице
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

// Отображение начальных карточек на странице
cardList.renderItems(initialCards);

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

// Функция обработки сабмита формы редактирования профиля
function handleFormEditSubmit(data) { 
  userInfo.setUserInfo(data);
  popupEditProfile.close(); 
} 

// Включение валидации форм
editProfileValidator.enableValidation(); 
addCardValidator.enableValidation(); 

// Добавление обработчиков для кнопок открытия попапов
buttonOpenEditProfilePopup.addEventListener('click', () => openEditProfilePopup()); 
buttonOpenAddCardPopup.addEventListener('click', () => addCardPopup.open());
