import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  open() {
    super.open();
    this._submitButton.textContent = 'Сохранение...';
  }

  setSubmitButtonCaption(caption) {
    this._submitButton.textContent = caption;
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;