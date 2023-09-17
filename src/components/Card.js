class Card {
  constructor(data, templateSelector, handleCardClick, handleLikeCard, handleUnlikeCard, handleDeleteClick, isOwner, isLiked, UserId) {
  
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__button');
    this._deleteButton = this._element.querySelector('.element__thrash-button');
    this._cardImage = this._element.querySelector('.element__img');
    this._likeCount = this._element.querySelector('.element__like-count');
    this._handleDeleteClick = handleDeleteClick;
    this._isOwner = isOwner;
    this._cardElement = this._element;
    this._handleLikeCard = handleLikeCard;
    this._handleUnlikeCard = handleUnlikeCard;
    this._isLiked = isLiked;
    this._userid = UserId;  
    this._setEventListeners();
  }
  

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.element').cloneNode(true);
  }

  _handleLikeButtonClick = () => {
    const isLiked = this._likeButton.classList.contains('element__button_active');
    const cardId = this._data._id;
  
    if (isLiked) {
      this._handleUnlikeCard(cardId);
    } else {
      this._handleLikeCard(cardId);
    }
  };
  
  

  _handleDeleteButtonClick = () => {
    this._handleDeleteClick(this._data._id);
    this._cardElement.remove();
    this._cardElement = null;
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
    this._likeCount.textContent = this._data.likes.length;
    
    if (this._isOwner) {
      this._deleteButton.classList.add('visible');
    } else {
      this._deleteButton.classList.remove('visible');
    }

    this.updateLikeButtonState();

    return this._element;
  }

  updateLikes(likes) {
    if (Array.isArray(likes)) {
      this._likeCount.textContent = likes.length;
      this._isLiked = likes.some((like) => like._id === this._userid);
    } else {
      this._likeCount.textContent = 0;
      this._isLiked = false;
    }
  }
  
  updateLikeButtonState() {
    if (this._isLiked) {
      this._likeButton.classList.add('element__button_active');
    } else {
      this._likeButton.classList.remove('element__button_active');
    }
  }
}

export default Card;
