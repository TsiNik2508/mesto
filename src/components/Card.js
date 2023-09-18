class Card {
  constructor(cardData, cardSelector, userId, { handleCardClick, handleCardLike, handleDeleteClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleDeleteClick = handleDeleteClick;
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
      this._deleteButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }

  _likeCard() {
    if (!this._isLiked()) {
      this._handleCardLike(this._cardId, true)
        .then((newCard) => {
          this._updateLikes(newCard.likes);
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
          this._updateLikes(newCard.likes);
        })
        .catch((error) => {
          console.error(`Ошибка при снятии лайка: ${error}`);
        });
  }
}


  _isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _updateLikes(likes) {
    this._likes = likes;
    this._likeCounter.textContent = likes.length;
    this._element.querySelector('.element__button').classList.toggle('element__button_active');
    this._element.querySelector('.element__like-count').textContent = likes.length;
  }


  _setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._likeButton.addEventListener('click', () => {
      if (!this._isLiked()) {
        this._likeCard();
      } else {
        this._unlikeCard();
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);
    });
  }
}

export { Card };
