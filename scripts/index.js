document.addEventListener('DOMContentLoaded', function () {
  // Находим все необходимые элементы и сохраняем их в переменные
  const editButton = document.querySelector('.profile__edit-button');
  const addButton = document.querySelector('.profile__add-button');
  const editPopup = document.querySelector('.popup_type-edit');
  const addPopup = document.querySelector('.popup_type-add');
  const closeButtonEdit = editPopup.querySelector('.popup__close');
  const closeButtonAdd = addPopup.querySelector('.popup__close');
  const nameInput = editPopup.querySelector('.popup__input_type_name');
  const bioInput = editPopup.querySelector('.popup__input_type_bio');
  const formElementEdit = editPopup.querySelector('.popup__form');
  const formElementAdd = addPopup.querySelector('.popup__form');
  const elementsContainer = document.querySelector('.elements');
  const cardTemplate = document.querySelector('#card-template').content;
  const popupCard = document.querySelector('.popup_type-card');
  const cardImage = popupCard.querySelector('.popup__img');
  const cardName = popupCard.querySelector('.popup__card-name');
  const cardImagePopupCloseButton = popupCard.querySelector('.popup__close-card');
  const profileTitle = document.querySelector('.profile__title');
  const profileBio = document.querySelector('.profile__bio');


  // Функция открытия попапа
  function openPopup(popup) {
    popup.classList.add('popup_opened');
  }

  // Функция закрытия попапа
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

  // Функция открытия попапа редактирования профиля
  function openEditProfilePopup() {
    console.log("Button Clicked")
    nameInput.value = profileTitle.textContent;
    bioInput.value = profileBio.textContent;
    openPopup(editPopup);

  }

  // Функция открытия попапа добавления новой карточки
  function openAddCardPopup() {
    formElementAdd.reset(); // Очищаем поля ввода формы добавления карточки
    openPopup(addPopup);
  }

  // Функция закрытия попапа редактирования профиля
  function closeEditProfilePopup() {
    closePopup(editPopup);
  }

  // Функция закрытия попапа добавления новой карточки
  function closeAddCardPopup() {
    closePopup(addPopup);
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
 
    return cardElement; 
  } 


  // Функция для закрытия попапа с увеличенным изображением
  function closeImagePopup() {
    closePopup(popupCard);
  }

  // Открытие/закрытие попапа редактирования профиля и добавления карточки
  editButton.addEventListener('click', openEditProfilePopup);
  addButton.addEventListener('click', openAddCardPopup);
  closeButtonEdit.addEventListener('click', closeEditProfilePopup);
  closeButtonAdd.addEventListener('click', closeAddCardPopup);

  // Обработка отправки формы редактирования профиля
  formElementEdit.addEventListener('submit', handleFormEditSubmit);

  // Обработка отправки формы добавления карточки
  formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = formElementAdd.querySelector('.popup__input_type_name').value;
    const link = formElementAdd.querySelector('.popup__input_type_link').value;
    const newCardData = {
      name: name,
      link: link
    };
    addCardToPage(newCardData);
    closeAddCardPopup();
  });

  // Исходные карточки
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

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

  // Обработка события клика на кнопку закрытия попапа с увеличенным изображением
  cardImagePopupCloseButton.addEventListener('click', closeImagePopup);

  // Обработка событий клика по изображению карточки для открытия попапа с увеличенным изображением
  elementsContainer.addEventListener('click', handleCardImageClick);
});
