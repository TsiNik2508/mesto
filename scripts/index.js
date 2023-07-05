const editProfileButton = document.querySelector('.profile__edit-button');
const popup = document.getElementById('user');
const closeButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const saveButton = popup.querySelector('.popup__button');
const nameInput = formElement.querySelector('.popup__input_type_name');
const bioInput = formElement.querySelector('.popup__input_type_bio');
const nameElement = document.querySelector('.profile__title');
const bioElement = document.querySelector('.profile__bio');

function openPopup() {
  popup.style.display = 'flex';
  setTimeout(() => {
    popup.style.opacity = '1';
  }, 0);
  popup.style.pointerEvents = 'auto'; // Включаем обработку событий на попапе
}

function closePopup() {
  popup.style.opacity = '0';
  popup.style.pointerEvents = 'none';
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newBio = bioInput.value;

  nameElement.textContent = newName;
  bioElement.textContent = newBio;

  closePopup();
}

editProfileButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
