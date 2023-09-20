import Popup from './Popup.js';

class PopupWithDelete extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._deleteButton = this._popup.querySelector('.popup__button_type_delete');
  }

  setSubmitAction(submitHandler) {
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => {
      this._submitHandler();
    });
  }
}

export default PopupWithDelete;
