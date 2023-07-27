// Форма "Редактировать профиль"
const profileForm = document.forms.user;
const nameInput = profileForm.elements.name;
const bioInput = profileForm.elements.job;
const saveButton = profileForm.querySelector('.popup__button');

function validateProfileForm() {
  const isNameValid = nameInput.checkValidity();
  const isBioValid = bioInput.checkValidity();

  nameInput.nextElementSibling.textContent = nameInput.validationMessage;
  bioInput.nextElementSibling.textContent = bioInput.validationMessage;

  // Убираем класс popup__button_disabled, если поля валидны
  saveButton.disabled = !(isNameValid && isBioValid);
  if (isNameValid && isBioValid) {
    saveButton.classList.remove('popup__button_disabled');
  } else {
    saveButton.classList.add('popup__button_disabled');
  }
}

profileForm.addEventListener('input', validateProfileForm);


// Форма "Новое место"
const placeForm = document.forms.newCard;
const cardNameInput = placeForm.elements['card-name'];
const linkInput = placeForm.elements.link;
const addButton = placeForm.querySelector('.popup__button');

function validatePlaceForm() {
  const isCardNameValid = cardNameInput.checkValidity();
  const isLinkValid = linkInput.checkValidity();

  cardNameInput.nextElementSibling.textContent = cardNameInput.validationMessage;
  linkInput.nextElementSibling.textContent = linkInput.validationMessage;

  // Убираем класс popup__button_disabled, если поля валидны
  addButton.disabled = !(isCardNameValid && isLinkValid);
  if (isCardNameValid && isLinkValid) {
    addButton.classList.remove('popup__button_disabled');
  } else {
    addButton.classList.add('popup__button_disabled');
  }
}

placeForm.addEventListener('input', validatePlaceForm);
