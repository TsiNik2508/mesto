class Popup {
  constructor(popupSelector) {
    // Конструктор класса принимает селектор окна попапов
    // Находим окно по селектору
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Метод для обработки  нажатия Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Метод для открытия окна попапа
  open() {
    this._popup.classList.add('popup_opened');

    // Добавляем обработчик нажатия Esc для закрытия окна попапа
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Метод для закрытия окна попапа
  close() {
    // Удаляем класс из окна попапа, скрывая его
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Метод для установки обработчиков событий на попапы 
  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
export default Popup;
