import Popup from './Popup.js'; 
 
class PopupWithForm extends Popup { 
  constructor(popupSelector, submitHandler, formValidator) { 
    super(popupSelector); 
    this._submitHandler = submitHandler; 
    this._form = this._popup.querySelector('.popup__form'); 
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
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
 
  close() { 
    super.close(); 
    this._form.reset(); 
  } 
} 

 
export default PopupWithForm;
