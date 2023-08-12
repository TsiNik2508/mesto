class FormValidator {
  // Конструктор класса, принимает объект настроек и элемент формы
  constructor(settings, formElement) {
    this._config = settings; // Объект с настройками валидации
    this._formElement = formElement; // Элемент формы
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector)); // Список полей ввода формы
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector); // Кнопка отправки формы
  }

  // Показываем сообщение об ошибке для поля ввода
  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling; // Элемент для отображения ошибки
    errorElement.textContent = errorMessage; // Устанавливаем текст ошибки
    errorElement.classList.add(this._config.errorClass); // Добавляем класс для отображения ошибки
    inputElement.classList.add(this._config.inputErrorClass); // Добавляем класс для стилизации поля ввода с ошибкой
  }

  //Скрываем сообщение об ошибке для поля ввода
  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling; // Элемент для отображения ошибки
    errorElement.textContent = ''; // Очищаем текст ошибки
    errorElement.classList.remove(this._config.errorClass); // Удаляем класс для отображения ошибки
    inputElement.classList.remove(this._config.inputErrorClass); // Удаляем класс стилизации поля ввода с ошибкой
  }

  //Проверяем валидность поля ввода и показывает/скрывает ошибку
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage; // Получаем сообщение об ошибке из браузера
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Переключаем состояние кнопки отправки формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true; // Отключаем кнопку
      this._submitButton.classList.add(this._config.inactiveButtonClass); // Добавляем класс для стилизации неактивной кнопки
    } else {
      this._submitButton.disabled = false; // Включаем кнопку
      this._submitButton.classList.remove(this._config.inactiveButtonClass); // Удаляем класс стилизации неактивной кнопки
    }
  }

  //Проверяем, есть ли невалидные поля ввода
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  //Назначаем обработчики событий на поля ввода
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //Активируем валидацию для формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // Отменяем стандартное поведение отправки формы
    });

    this._setEventListeners(); // Назначаем обработчики событий на поля ввода
    this._toggleButtonState(); // Инициализируем состояние кнопки отправки
  }
}

export default FormValidator; 
