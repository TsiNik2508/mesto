class Card {
  constructor(data, cardSelector, currentUserId, { handleCardClick, handleCardLike, handleCardDelete }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleCardLike(this._cardId, this._isLiked());
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleCardDelete(this._cardId);
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _isLiked() {
    return this._likes.some((like) => like._id === this._currentUserId);
  }

  updateLikes(newLikes) {
    this._likes = newLikes;
    this._element.querySelector('.element__like-count').textContent = newLikes.length;
    this._toggleLike();
  }

  _toggleLike() {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.classList.toggle('element__like-button_active', this._isLiked());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._toggleLike();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__like-count').textContent = this._likes.length;

    if (this._ownerId !== this._currentUserId) {
      this._element.querySelector('.element__delete-button').style.display = 'none';
    }

    return this._element;
  }
}

export default Card;
