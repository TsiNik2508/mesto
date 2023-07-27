// вызов enableValidation для формы "Редактировать профиль"
enableValidation({
  formSelector: '.popup__form_edit',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// вызов enableValidation для формы "Новое место"
enableValidation({
  formSelector: '.popup__form_add',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


// Функция для отображения ошибки в поле ввода
function showInputError(inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = inputElement.closest('.popup__inputs').querySelector('.popup__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

function hideInputError(inputElement, inputErrorClass, errorClass) {
  const errorElement = inputElement.closest('.popup__inputs').querySelector('.popup__input-error');
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

function isValid(inputElement) {
  return inputElement.checkValidity();
}
function toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputSelector) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);
  const isFormValid = inputs.every(isValid);
  submitButton.disabled = !isFormValid;
  if (isFormValid) {
    submitButton.classList.remove(inactiveButtonClass);
  } else {
    submitButton.classList.add(inactiveButtonClass);
  }
}

// Функция для установки слушателей событий для полей ввода формы
function setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      const isInputValid = isValid(inputElement);

      if (isInputValid) {
        hideInputError(inputElement, inputErrorClass, errorClass);
      } else {
        const errorMessage = inputElement.validationMessage;
        showInputError(inputElement, errorMessage, inputErrorClass, errorClass);
      }
      toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputSelector);
    });
  });
}

// Функция для включения валидации формы
function enableValidation(settings) {
  const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = settings;

  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    // Устанавливаем слушатели событий для полей ввода и кнопки отправки формы
    setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputSelector);
  });
}
