import Popup from './Popup.js';
import Api from './Api.js';

class PopupWithAvatar extends Popup {
  constructor(popupSelector, handleAvatarUpdate, api) {
    super(popupSelector);
    this._handleAvatarUpdate = handleAvatarUpdate;
    this._form = this._popup.querySelector('.popup__form_type-avatar');
    this._avatarInput = this._form.querySelector('.popup__input_type_avatar');
    this._api = api;
    this._submitButton = this._form.querySelector('.popup__button_type_avatar-save');
  }

  _getInputValues() {
    return {
      avatar: this._avatarInput.value,
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._setLoadingState(true); 
      this._api.updateAvatar(inputValues.avatar)
        .then((userData) => {
          this._handleAvatarUpdate(userData.avatar);
          this.close();
        })
        .catch((error) => {
          console.error(`Ошибка при обновлении аватара: ${error}`);
        })
        .finally(() => {
          this._setLoadingState(false); 
        });
    });
  }


  open() {
    super.open();
    this._avatarInput.value = '';
  }

  close() {
    super.close();
    this._form.reset();
  }

  _setLoadingState(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.textContent = 'Сохранить';
      this._submitButton.removeAttribute('disabled');
    }
  }

}

export default PopupWithAvatar;
