const editButton = document.querySelector('.edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const saveButton = popup.querySelector('.popup__button');
const nameInput = popup.querySelector('.popup__input_type_name');
const bioInput = popup.querySelector('.popup__input_type_bio');
const titleElement = document.querySelector('.profile__title');
const bioElement = document.querySelector('.profile__bio');

// Попап открывался при загрузки и перезагрузки страницы, поэтому добавил проверку, есть ли сохраненное состояние попапа и если его нет, попап скрывается
if (localStorage.getItem('popupShown') !== null) {
  localStorage.removeItem('popupShown');
} else {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = titleElement.textContent;
  bioInput.value = bioElement.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  titleElement.textContent = nameInput.value;
  bioElement.textContent = bioInput.value;

  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', handleFormSubmit);
