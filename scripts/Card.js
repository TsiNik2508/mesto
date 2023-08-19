class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; // Функция для открытия попапа с изображением
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__thrash-button');
    this._cardImage = this._element.querySelector('.element__img');
    this._setEventListeners();
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.element').cloneNode(true);
  }

  _handleLikeButtonClick = () => {
    this._likeButton.classList.toggle('element__button_active');
  }

  _handleDeleteButtonClick = () => {
    this._element.remove();
    this._element = null;
  }

  _handleImageClick = () => {
    this._handleCardClick(this._data); 
  }

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
