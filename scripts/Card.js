class Card {
  // Конструктор класса, принимает данные и селектор шаблона карточки
  constructor(data, templateSelector, handleCardImageClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardImageClick = handleCardImageClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__thrash-button');
    this._cardImage = this._element.querySelector('.element__img');
    this._setEventListeners();
  }

  // Приватный метод, получает содержимое шаблона карточки
  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.element').cloneNode(true);
  }

  // Приватный метод, обрабатывает клик по кнопке "Лайк"
  _handleLikeButtonClick = () => {
    this._likeButton.classList.toggle('element__button_active');
  }

  // Приватный метод, обрабатывает клик по кнопке "Удалить"
  _handleDeleteButtonClick = () => {
    this._element.remove();
    this._element = null;
  }

  // Приватный метод, обрабатывает клик по изображению карточки
  _handleImageClick = () => {
    this._handleCardImageClick(this._data);
  }

  // Приватный метод, назначает обработчики событий элементам карточки
  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeButtonClick);
    this._deleteButton.addEventListener('click', this._handleDeleteButtonClick);
    this._cardImage.addEventListener('click', this._handleImageClick);
  }

  generateCard() {
    const { name, link } = this._data;

    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._element.querySelector('.element__title').textContent = name;

    return this._element;
  }
}

export default Card; 
