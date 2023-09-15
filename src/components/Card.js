class Card {
  constructor(data, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick, isOwner) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._isOwner = isOwner;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__thrash-button');
    this._cardImage = this._element.querySelector('.element__img');
    this._likeCount = this._element.querySelector('.element__like-count');
    this._setEventListeners();
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.element').cloneNode(true);
  }

  _handleLikeButtonClick = () => {
    this._handleLikeClick(this._data);
  }

  _handleDeleteButtonClick = () => {
    this._handleDeleteClick(this._data);
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
    if (!this._data) {
      console.error('Ошибка: отсутствуют данные карточки.');
      return null; 
    }
    const { name, link } = this._data; 
    this._cardImage.src = link; 
    this._cardImage.alt = name; 
    this._element.querySelector('.element__title').textContent = name; 
    if (this._isOwner) { 
      this._element.querySelector('.element__thrash-button').classList.add('visible'); 
    } else { 
      this._element.querySelector('.element__thrash-button').classList.remove('visible'); 
    } 
   
    return this._element; 
  } 
   
  setLikes(likes) { 
    this._likes = likes; 
    this._likeCount.textContent = likes.length; 
  } 
   


  updateLikes(newLikes) {
    this._likeCount.textContent = newLikes.length;
    this._likeButton.classList.toggle('element__button_active', newLikes.some(like => like._id === UserId));
  }

  removeCard() {
    this._element.remove();
  }
}

export default Card;
