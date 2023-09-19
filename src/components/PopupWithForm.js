import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__button');
    this._closeButton = this._popup.querySelector('.popup__close'); 
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
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
    this._form.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.setSubmitButtonCaption('Сохранение...');
      await this._submitHandler(this._getInputValues()); 
      this.close(); 
    });
  }

  open() {
    super.open();
  }

  setSubmitButtonCaption(caption) {
    this._submitButton.textContent = caption;
  }

  close() {
    super.close();
    this._form.reset();
    this.setSubmitButtonCaption('Сохранить'); 
  }
}

export default PopupWithForm;
