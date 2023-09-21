class Section {
  constructor({ renderer }, containerSelector) {
    // Конструктор класса принимает два аргумента:
    // 1. { renderer } - объект, содержащий метод для отрисовки карточек
    // 2. containerSelector - селектор контейнера, в котором будут размещаться карточки

    this._renderer = renderer; 
    this._container = document.querySelector(containerSelector); 
    this._items = [];
  }

  // Метод для отрисовки переданных элементов на странице
  renderItems(items) {
    items.reverse().forEach(item => this._renderer(item)); //делаем так, чтобы новые карточки были наверху
  }

  // Метод для добавления элемента в начало контейнера
  addItem(element) {
    this._container.prepend(element);
  }

  // Метод для удаления карточки из контейнера
  removeItem(cardId) {
    const cardElement = this._container.querySelector(`[data-card-id="${cardId}"]`); // Находим элемент по data-атрибуту
    if (cardElement) {
      cardElement.remove(); // Если элемент найден, удаляем его
    }
  }

  // Метод для установки нового массива элементов в секцию
  setItems(items) {
    this._items = items; 
  }
}

export default Section; 
