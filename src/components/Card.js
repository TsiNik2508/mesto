class Card {
  constructor(cardData, cardSelector, userId, { handleCardClick, handleCardLike, handleCardDelete }) {
    this._name = cardData.name || '';
    this._link = cardData.link || '';
    this._likes = cardData.likes || [];
    this._ownerId = cardData.owner && cardData.owner._id ? cardData.owner._id : '';
    this._cardId = cardData._id || '';
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  createCardElement() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__img');
    this._elementTitle = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__button');
    this._likeCounter = this._element.querySelector('.element__like-count');
    this._deleteButton = this._element.querySelector('.element__thrash-button');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
    
    this._updateLikeState(this._isLiked());
    this._setEventListeners();
    
    return this._element;
  }

  _toggleLike() {
    if (!this._isLiked()) {
      this._likeCard();
    } else {
      this._unlikeCard();
    }
  }

  _updateLikeState(isLiked) {
    this._element.querySelector('.element__button').classList.toggle('element__button_active', isLiked);
    this._likeCounter.textContent = this._likes.length;
  }

  _likeCard() {
    if (!this._isLiked()) {
      console.log('Попытка поставить лайк');
      this._handleCardLike(this._cardId, true)
        .then((newCard) => {
          console.log('Лайк поставлен:', newCard);
          this._updateLikes(newCard.likes);
          this._updateLikeState(true);
        })
        .catch((error) => {
          console.error(`Ошибка при постановке лайка: ${error}`);
        });
    }
  }
  
  
  _unlikeCard() {
    if (this._isLiked()) {
      this._handleCardLike(this._cardId, false)
        .then((newCard) => {
          console.log('Лайк снят:', newCard);
          this._updateLikes(newCard.likes);
          this._updateLikeState(false);
        })
        .catch((error) => {
          console.error(`Ошибка при снятии лайка: ${error}`);
        });
    }
  }
  
  
  _toggleLike() {
    if (!this._isLiked()) {
      console.log('Лайк будет поставлен');
      this._likeCard();
    } else {
      console.log('Лайк будет снят');
      this._unlikeCard();
    }
  }
  
  

  _isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _updateLikes(likes) {
    this._likes = likes;
    this._likeCounter.textContent = likes.length;
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this.deleteCard();
    });
  }

  deleteCard() {
    this._handleCardDelete(this._cardId);
  }
}

export { Card };
