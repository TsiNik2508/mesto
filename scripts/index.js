document.addEventListener('DOMContentLoaded', function () {
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

  // Функция открытия попапа редактирования профиля
  function openEditPopup() {
    editPopup.classList.add('popup_opened');
    nameInput.value = document.querySelector('.profile__title').textContent;
    bioInput.value = document.querySelector('.profile__bio').textContent;
  }

  // Функция открытия попапа добавления новой карточки
  function openAddPopup() {
    addPopup.classList.add('popup_opened');
  }

  // Функция закрытия попапа редактирования профиля
  function closeEditPopup() {
    editPopup.classList.remove('popup_opened');
  }

  // Функция закрытия попапа добавления новой карточки
  function closeAddPopup() {
    addPopup.classList.remove('popup_opened');
  }

  // Функция для обработки отправки формы редактирования профиля
  function handleFormEditSubmit(evt) {
    evt.preventDefault();
    const titleElement = document.querySelector('.profile__title');
    const bioElement = document.querySelector('.profile__bio');
    titleElement.textContent = nameInput.value;
    bioElement.textContent = bioInput.value;
    closeEditPopup();
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

  // открытие/закрытие попапа редактирования профиля и добавления карточки
  editButton.addEventListener('click', openEditPopup);
  addButton.addEventListener('click', openAddPopup);
  closeButtonEdit.addEventListener('click', closeEditPopup);
  closeButtonAdd.addEventListener('click', closeAddPopup);

  //обработка отправки формы редактирования профиля
  formElementEdit.addEventListener('submit', handleFormEditSubmit);

  // обработка отправки формы добавления карточки
  formElementAdd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = formElementAdd.querySelector('.popup__input_type_name').value;
    const link = formElementAdd.querySelector('.popup__input_type_link').value;

    const newCardData = {
      name: name,
      link: link
    };

    addCardToPage(newCardData);
    closeAddPopup();
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

  // Обработка событий клика по изображению карточки для открытия попапа с увеличенным изображением
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

  // Обработка событи1 клика на кнопку закрытия попапа с увеличенным изображением
  function handleImagePopupClose() {
    closeImagePopup();
  }

  // Функция для открытия попапа с увеличенным изображением и названием карточки
  function openImagePopup(cardData) {
    const cardImagePopup = document.querySelector('.popup__type_card');
    const cardImage = cardImagePopup.querySelector('.popup__img');
    const cardName = cardImagePopup.querySelector('.popup__card-name');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardName.textContent = cardData.name;
    cardImagePopup.classList.add('popup_opened');
  }

  // Функция для закрытия попапа с увеличенным изображением
  function closeImagePopup() {
    const cardImagePopup = document.querySelector('.popup__type_card');
    cardImagePopup.classList.remove('popup_opened');
  }

  //обработка событий клика по изображению карточки и кнопке закрытия попапа с увеличенным изображением
  elementsContainer.addEventListener('click', handleCardImageClick);
  const cardImagePopupCloseButton = document.querySelector('.popup__close-card');
  cardImagePopupCloseButton.addEventListener('click', handleImagePopupClose);
});
