// Функция для отображения ошибки в поле ввода
function showInputError(inputElement, errorMessage, inputErrorClass, errorClass) { 
  const popupInputsElement = inputElement.closest('.popup__inputs'); 
  const errorElement = popupInputsElement.querySelector('.popup__input-error'); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(errorClass); 
  inputElement.classList.add(inputErrorClass); 
} 
 
// Функция для скрытия ошибки в поле ввода 
function hideInputError(inputElement, inputErrorClass, errorClass) { 
  const popupInputsElement = inputElement.closest('.popup__inputs'); 
  const errorElement = popupInputsElement.querySelector('.popup__input-error'); 
  errorElement.textContent = ''; 
  errorElement.classList.remove(errorClass); 
  inputElement.classList.remove(inputErrorClass); 
}

// Функция для проверки валидности поля ввода
function isValid(inputElement) {
  return inputElement.checkValidity();
}

// Функция для переключения состояния кнопки отправки
function toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputSelector) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);
  const isFormValid = inputs.every((inputElement) => isValid(inputElement));
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

  function handleInput(inputElement) {
    const isInputValid = isValid(inputElement);

    if (isInputValid) {
      hideInputError(inputElement, inputErrorClass, errorClass);
    } else {
      const errorMessage = inputElement.validationMessage;
      showInputError(inputElement, errorMessage, inputErrorClass, errorClass);
    }

    toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputSelector);
  }

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      handleInput(inputElement);
    });
  });
}

// Функция для включения валидации формы
function enableValidation(settings) {
  const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = settings;

  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault(); // Отменяем стандартную отправку формы

      // Проверяем валидность формы при отправке
      const inputs = Array.from(form.querySelectorAll(inputSelector));
      inputs.forEach((inputElement) => {
        handleInput(inputElement);
      });
    });

    // Устанавливаем слушатели событий для полей ввода и обновляем состояние кнопки отправки
    setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    toggleSubmitButton(form, submitButtonSelector, inactiveButtonClass, inputSelector);
  });
}

// Включаем валидацию для форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
