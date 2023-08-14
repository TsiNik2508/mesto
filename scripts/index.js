// Импорт необходимых модулей и данных
import Card from './Card.js'; // Импорт модуля для работы с карточками
import FormValidator from './FormValidator.js'; // Импорт модуля для валидации форм
import { initialCards } from './constants.js'; // Импорт начальных карточек

// Ожидание полной загрузки DOM-дерева
document.addEventListener('DOMContentLoaded', function () {
  // Получение ссылок на элементы DOM
  const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
  const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
  const popupEditProfile = document.querySelector('.popup_type-edit');
  const popupAddCard = document.querySelector('.popup_type-add');
  const closeButtonEdit = popupEditProfile.querySelector('.popup__close');
  const closeButtonAdd = popupAddCard.querySelector('.popup__close');
  const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
  const bioInput = popupEditProfile.querySelector('.popup__input_type_bio');
  const formElementEdit = popupEditProfile.querySelector('.popup__form');
  const formElementAdd = popupAddCard.querySelector('.popup__form');
  const elementsContainer = document.querySelector('.elements');
  const cardTemplate = document.querySelector('#card-template').content;
  const popupCard = document.querySelector('.popup_type-card');
  const cardImage = popupCard.querySelector('.popup__img');
  const cardName = popupCard.querySelector('.popup__card-name');
  const cardImagePopupCloseButton = popupCard.querySelector('.popup__close-card');
  const profileTitle = document.querySelector('.profile__title');
  const profileBio = document.querySelector('.profile__bio');
  const nameInputAdd = formElementAdd.querySelector('.popup__input_type_name');
  const linkInputAdd = formElementAdd.querySelector('.popup__input_type_link');

  // Функция для открытия попапа
  function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('mousedown', handleOverlayClick);
    document.addEventListener('keydown', handleEscKey);
  }

  // Функция для закрытия попапа
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('mousedown', handleOverlayClick);
    document.removeEventListener('keydown', handleEscKey);
  }

  // Функция для обработки клика по оверлею для закрытия попапа
  function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  }

  // Функция для обработки нажатия клавиши Esc для закрытия попапа
  function handleEscKey(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }

  // Функция для открытия попапа редактирования профиля
  function openEditProfilePopup() {
    nameInput.value = profileTitle.textContent;
    bioInput.value = profileBio.textContent;
    openPopup(popupEditProfile);
  }

  // Функция для открытия попапа добавления новой карточки
  function openAddCardPopup() {
    formElementAdd.reset();
    addCardValidator.toggleButtonState(); 
    openPopup(popupAddCard);
  }

  // Функция для закрытия попапа редактирования профиля
  function closeEditProfilePopup() {
    closePopup(popupEditProfile);
  }

  // Функция для закрытия попапа добавления новой карточки
  function closeAddCardPopup() {
    closePopup(popupAddCard);
  }

  // Функция для обработки отправки формы редактирования профиля
  function handleFormEditSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    closeEditProfilePopup();
  }

  // Функция для добавления новой карточки на страницу
  function addCardToPage(cardData) {
    const cardHTML = createCardElement(cardData);
    elementsContainer.prepend(cardHTML);
  }

  // Функция для создания и возврата элемента карточки
  function createCardElement(cardData) {
    const card = new Card(cardData, '#card-template', openImagePopup);
    return card.generateCard();
  }

  // Функция для закрытия попапа с увеличенным изображением
  function closeImagePopup() {
    closePopup(popupCard);
  }

  // Обработчик клика по кнопке закрытия попапа с увеличенным изображением
  cardImagePopupCloseButton.addEventListener('click', closeImagePopup);

  // Назначение обработчиков событий на кнопки и элементы
  buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
  buttonOpenAddCardPopup.addEventListener('click', openAddCardPopup);
  closeButtonEdit.addEventListener('click', closeEditProfilePopup);
  closeButtonAdd.addEventListener('click', closeAddCardPopup);
  formElementEdit.addEventListener('submit', handleFormEditSubmit);

  // Обработчик отправки формы добавления новой карточки
  formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = nameInputAdd.value;
    const link = linkInputAdd.value;
    const newCardData = {
      name: name,
      link: link
    };
    addCardToPage(newCardData);
    closeAddCardPopup();
  });

  // Добавление начальных карточек на страницу
  initialCards.forEach((cardData) => {
    addCardToPage(cardData);
  });

  // Функция для открытия попапа с увеличенным изображением
  function openImagePopup(cardData) {
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardName.textContent = cardData.name;
    openPopup(popupCard);
  }

  // Создание экземпляров классов FormValidator для валидации форм
  const editProfileValidator = new FormValidator(
    {
      formSelector: '.popup__form_type_edit',
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
      formSelector: '.popup__form_type_add',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    },
    formElementAdd
  );

  // Активация валидации для форм редактирования профиля и добавления карточки
  editProfileValidator.enableValidation();
  addCardValidator.enableValidation();
});
