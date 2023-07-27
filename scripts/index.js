document.addEventListener('DOMContentLoaded', function () {
  // Находим все необходимые элементы и сохраняем их в переменные
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

  // Функция открытия попапа
  function openPopup(popup) {
    popup.classList.add('popup_opened');
  }

  // Функция закрытия попапа
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

  // Функция для общего закрытия попапов при клике на оверлей
function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

// Функция для закрытия попапов при нажатии на клавишу Esc
function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Добавление слушателя для закрытия попапов при клике на оверлей
document.addEventListener('click', handleOverlayClick);

// Добавление слушателя для закрытия попапов при нажатии на клавишу Esc
document.addEventListener('keydown', handleEscKey);


  // Функция открытия попапа редактирования профиля
  function openEditProfilePopup() {
    console.log("Button Clicked");
    nameInput.value = profileTitle.textContent;
    bioInput.value = profileBio.textContent;
    openPopup(popupEditProfile);
  }

  // Функция открытия попапа добавления новой карточки
  function openAddCardPopup() {
    formElementAdd.reset(); // Очищаем поля ввода формы добавления карточки
    openPopup(popupAddCard);
  }

  // Функция закрытия попапа редактирования профиля
  function closeEditProfilePopup() {
    closePopup(popupEditProfile);
  }

  // Функция закрытия попапа добавления новой карточки
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
    const cardHTML = createCard(cardData);
    elementsContainer.prepend(cardHTML);
  }

  // Функция для создания новой карточки
  function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__img');
    const cardTitle = cardElement.querySelector('.element__title');
    const likeButton = cardElement.querySelector('.element__button');
    const deleteButton = cardElement.querySelector('.element__thrash-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    likeButton.addEventListener('click', function () {
      likeButton.classList.toggle('element__button_active');
    });

    deleteButton.addEventListener('click', function () {
      cardElement.remove();
    });

    // Установка слушателя для открытия попапа с увеличенным изображением на элемент изображения карточки
    cardImage.addEventListener('click', function () {
      openImagePopup(cardData);
    });

    return cardElement;
  }

  // Функция для закрытия попапа с увеличенным изображением
  function closeImagePopup() {
    closePopup(popupCard);
  }

  // Установка обработчика на кнопку закрытия попапа с увеличенным изображением
  cardImagePopupCloseButton.addEventListener('click', closeImagePopup);

  // Открытие/закрытие попапа редактирования профиля и добавления карточки
  buttonOpenEditProfilePopup.addEventListener('click', openEditProfilePopup);
  buttonOpenAddCardPopup.addEventListener('click', openAddCardPopup);
  closeButtonEdit.addEventListener('click', closeEditProfilePopup);
  closeButtonAdd.addEventListener('click', closeAddCardPopup);

  // Обработка отправки формы редактирования профиля
  formElementEdit.addEventListener('submit', handleFormEditSubmit);

  // Обработка отправки формы добавления карточки
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

  // Добавление исходных карточек на страницу
  initialCards.forEach((cardData) => {
    addCardToPage(cardData);
  });

  // Функция для открытия попапа с увеличенным изображением и названием карточки
  function openImagePopup(cardData) {
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardName.textContent = cardData.name;
    openPopup(popupCard);
  }

  // Функция для обработки событий клика по изображению карточки для открытия попапа с увеличенным изображением
  function handleCardImageClick(evt) {
    if (evt.target.classList.contains('element__img')) {
      const cardElement = evt.target.closest('.element');
      const cardData = {
        name: cardElement.querySelector('.element__title').textContent,
        link: cardElement.querySelector('.element__img').src
      };
      openImagePopup(cardData);
    }
  }
});
