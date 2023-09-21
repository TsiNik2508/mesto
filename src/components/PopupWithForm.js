import Popup from "./Popup.js"; 
export default class PopupWithForm extends Popup {
  constructor(selector, handlerFormSubmit) {
    super(selector); // Вызываем конструктор обычного класса и передаем ему селектор можального окна

    this._handlerFormSubmit = handlerFormSubmit; // Принимаем функцию-обработчик отправки формы
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input')); // Находим и сохраняем список инпутов
    this._form = this._popup.querySelector('.popup__form'); // Находим форму
    this._button = this._popup.querySelector('.popup__button'); // Находим кнопку
    this._buttonText = this._button.textContent; // Сохраняем изначальный текст
  }

  // Приватный метод для получения инпутов
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  // Метод для отображения статуса загрузки
  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._button.textContent = loadingText; // Изменяем текст на кнопки во время загрузки
    } else {
      this._button.textContent = this._buttonText; // Восстанавливаем изначальный текст пнсле загрузки
    }
  }

  // Метод для установки инпутов
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }

  // Переопредел метод для закрытия после отправки формы
  close() {
    super.close(); // Вызываем метод close из обычного класса
    this._form.reset(); // Сбрасываем значения инпутов
  }

  // Переопределенный метод для установки обработчиков событий на окно с формой
  setEventListeners() {
    super.setEventListeners(); // Вызываем метод setEventListeners из обычного класса

    // Добавляем события submit для обработки отправки данных формы
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault(); // Отменяем стандартное поведение формы
      this._handlerFormSubmit(this._getInputValues()); // Вызываем обработчик отправки
    })
  }
}
