import Popup from "./Popup.js"; 
export default class PopupWithDelete extends Popup {
  constructor(selector, handlerDeleteSubmit) {
    super(selector); // Вызываем конструктор обычного класса и передаем ему селектор окна попапа
    
    this._handlerDeleteSubmit = handlerDeleteSubmit; // Принимаем функцию-обработчик для удаления элемента
    this._button = this._popup.querySelector('.popup__button'); // Находим кнопку сабмита 
    this._buttonText = this._button.textContent; // Сохраняем изначальный текст на кнопке
  }

  // Метод для открытия окна удаления
  open(card, cardId) {
    super.open(); // Вызываем метод open из обычного класса для открытия
    this._card = card; // Сохраняем информацию о карточке
    this._cardId = cardId; // Сохраняем идентификатор карточки
  }

  // Метод для отображения статуса загрузки
  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._button.textContent = loadingText; // Изменяем текст на кнопке во время загрузки
    } else {
      this._button.textContent = this._buttonText; // Восстанавливаем изначальный текст на кнопке после загрузки
    }
  }

  // Переопределеям метод для установкисобытий на попап удаления
  setEventListeners() {
    super.setEventListeners(); // Вызываем метод setEventListeners из обычного класса
    
    // Добавляем обработчик submit для подтверждения удаления элемента
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault(); 
      this._handlerDeleteSubmit(this._card); 
    });
  }
}
