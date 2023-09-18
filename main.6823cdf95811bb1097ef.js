(()=>{"use strict";const e=class{constructor(e,t){this._config=e,this._formElement=t,this._inputList=Array.from(this._formElement.querySelectorAll(this._config.inputSelector)),this._submitButton=this._formElement.querySelector(this._config.submitButtonSelector)}_showInputError(e,t){const s=e.nextElementSibling;s.textContent=t,s.classList.add(this._config.errorClass),e.classList.add(this._config.inputErrorClass)}_hideInputError(e){const t=e.nextElementSibling;t.textContent="",t.classList.remove(this._config.errorClass),e.classList.remove(this._config.inputErrorClass)}_checkInputValidity(e){if(e.validity.valid)this._hideInputError(e);else{const t=e.validationMessage;this._showInputError(e,t)}}toggleButtonState(){this._hasInvalidInput()?(this._submitButton.disabled=!0,this._submitButton.classList.add(this._config.inactiveButtonClass)):(this._submitButton.disabled=!1,this._submitButton.classList.remove(this._config.inactiveButtonClass))}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_setEventListeners(){this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this.toggleButtonState()}))}))}enableValidation(){this._setEventListeners(),this.toggleButtonState()}resetValidation(){this._inputList.forEach((e=>{this._hideInputError(e)})),this.toggleButtonState()}};const t=class{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}setCardId(e){this._cardId=e}_handleEscClose(e){"Escape"===e.key&&this.close()}open(e){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose),this.setCardId(e)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}setEventListeners(){this._popup.addEventListener("click",(e=>{(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&this.close()}))}};const s=class extends t{constructor(e){super(e),this._popupImage=this._popup.querySelector(".popup__img"),this._popupCaption=this._popup.querySelector(".popup__card-name"),this._cardId=null}setCardId(e){this._cardId=e}open(e){this._popupImage.src=e.link,this._popupImage.alt=e.name,this._popupCaption.textContent=e.name,super.open()}};const n=class extends t{constructor(e,t){super(e),this._submitHandler=t,this._form=this._popup.querySelector(".popup__form"),this._inputs=Array.from(this._form.querySelectorAll(".popup__input")),this._submitButton=this._form.querySelector(".popup__button")}_getInputValues(){const e={};return this._inputs.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._submitHandler(this._getInputValues())}))}open(){super.open(),this._submitButton.textContent="Сохранение..."}setSubmitButtonCaption(e){this._submitButton.textContent=e}close(){super.close(),this._form.reset()}};const o=class{constructor(e){let{nameSelector:t,bioSelector:s}=e;this._nameElement=document.querySelector(t),this._bioElement=document.querySelector(s),this._id=null}getUserInfo(){return{name:this._nameElement.textContent,bio:this._bioElement.textContent}}setUserInfo(e){this._nameElement.textContent=e.name,this._bioElement.textContent=e.about,this._id=e._id}getUserId(){return this._id}};const r=class{constructor(e){this.baseUrl=e.baseUrl,this.headers=e.headers}_checkResponse(e){return e.ok?(console.log("Successful response:",e),e.json()):Promise.reject("Ошибка: ".concat(e.status))}getUserInfo(){return fetch("".concat(this.baseUrl,"/users/me"),{headers:{authorization:this.headers.authorization,"Content-Type":this.headers["Content-Type"],cohort:"cohort-75"}}).then(this._checkResponse)}getInitialCards(){return fetch("".concat(this.baseUrl,"/cards"),{headers:this.headers}).then(this._checkResponse)}editUserInfo(e){return fetch("".concat(this.baseUrl,"/users/me"),{method:"PATCH",headers:this.headers,body:JSON.stringify(e)}).then(this._checkResponse)}addCard(e){let{name:t,link:s}=e;return fetch("".concat(this.baseUrl,"/cards"),{method:"POST",headers:this.headers,body:JSON.stringify({name:t,link:s})}).then(this._checkResponse)}deleteCard(e){return console.log("Deleting card with ID:",e),fetch("".concat(this.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this.headers}).then(this._checkResponse)}likeCard(e){return fetch("".concat(this.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this.headers}).then(this._checkResponse)}unlikeCard(e){return fetch("".concat(this.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this.headers}).then(this._checkResponse)}updateAvatar(e){return fetch("".concat(this.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this.headers.authorization,"Content-Type":this.headers["Content-Type"]},body:JSON.stringify({avatar:e})}).then(this._checkResponse).catch((e=>{console.error("Ошибка при обновлении аватара: ".concat(e))}))}toggleLike(e,t){const s=t?"PUT":"DELETE",n="".concat(this.baseUrl,"/cards/likes/").concat(e);return fetch(n,{method:s,headers:this.headers}).then((e=>{if(e.ok)return e.json();throw new Error("Ошибка: ".concat(e.status))})).catch((e=>{console.error("Ошибка при обновлении лайка: ".concat(e))}))}};const i=class extends t{constructor(e,t){super(e),this._handleFormSubmit=t,this._form=this._popup.querySelector(".popup__form"),this._submitButton=this._form.querySelector(".popup__button"),this._cardId=null}setCardId(e){this._cardId=e}setEventListeners(){super.setEventListeners(),this._popup.querySelector(".popup__close").addEventListener("click",(()=>{console.log("Close button clicked"),this.close()})),this._form.addEventListener("submit",(e=>{e.preventDefault(),console.log("Form submitted"),this._handleFormSubmit()}))}open(e){this.setCardId(e),super.open()}};const a=class extends t{constructor(e,t,s){super(e),this._handleAvatarUpdate=t,this._form=this._popup.querySelector(".popup__form_type-avatar"),this._avatarInput=this._form.querySelector(".popup__input_type_avatar"),this._api=s}_getInputValues(){return{avatar:this._avatarInput.value}}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault();const t=this._getInputValues();this._api.updateAvatar(t.avatar).then((e=>{this._handleAvatarUpdate(e.avatar),this.close()})).catch((e=>{console.error("Ошибка при обновлении аватара: ".concat(e))}))}))}open(){super.open(),this._avatarInput.value=""}close(){super.close(),this._form.reset()}};class c{constructor(e,t,s,n){let{handleCardClick:o,handleCardLike:r,handleDeleteClick:i}=n;this._name=e.name,this._link=e.link,this._likes=e.likes,this._ownerId=e.owner._id,this._cardId=e._id,this._cardSelector=t,this._userId=s,this._handleCardClick=o,this._handleCardLike=r,this._handleDeleteClick=i}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}createCardElement(){return this._element=this._getTemplate(),this._elementImage=this._element.querySelector(".element__img"),this._elementTitle=this._element.querySelector(".element__title"),this._likeButton=this._element.querySelector(".element__button"),this._likeCounter=this._element.querySelector(".element__like-count"),this._deleteButton=this._element.querySelector(".element__thrash-button"),this._elementImage.src=this._link,this._elementImage.alt=this._name,this._elementTitle.textContent=this._name,this._likeCounter.textContent=this._likes.length,this._ownerId!==this._userId&&this._deleteButton.remove(),this._setEventListeners(),this._element}_likeCard(){this._isLiked()||this._handleCardLike(this._cardId,!0).then((e=>{this._updateLikes(e.likes)})).catch((e=>{console.error("Ошибка при постановке лайка: ".concat(e))}))}_unlikeCard(){this._isLiked()&&this._handleCardLike(this._cardId,!1).then((e=>{this._updateLikes(e.likes)})).catch((e=>{console.error("Ошибка при снятии лайка: ".concat(e))}))}_isLiked(){return this._likes.some((e=>e._id===this._userId))}_updateLikes(e){this._likes=e,this._likeCounter.textContent=e.length,this._element.querySelector(".element__button").classList.toggle("element__button_active"),this._element.querySelector(".element__like-count").textContent=e.length}_setEventListeners(){this._elementImage.addEventListener("click",(()=>{this._handleCardClick({name:this._name,link:this._link})})),this._likeButton.addEventListener("click",(()=>{this._isLiked()?this._unlikeCard():this._likeCard()})),this._deleteButton.addEventListener("click",(()=>{this._handleDeleteClick(this._cardId)}))}}let l;const h=new r({baseUrl:"https://nomoreparties.co/v1/cohort-75",headers:{authorization:"15456b01-b272-4795-9fed-b0870e9982e9","Content-Type":"application/json"}}),u=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),p=document.querySelector(".popup__form_edit"),d=document.querySelector(".popup__form_add"),m=(document.querySelector(".elements"),document.querySelector(".popup__form_type-avatar")),C=new s(".popup_type-card");C.setEventListeners();const v=new e({inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},m);Promise.all([h.getUserInfo(),h.getInitialCards()]).then((e=>{let[t,s]=e;console.log(s),l=t._id,b.setUserInfo(t),g.renderItems(s),h.addCard({name:"Рик и Морти",link:"https://srisovki.com/wp-content/uploads/2020/10/u_d0a8.jpg"}).then((e=>{console.log(e),S(e)})).catch((e=>{console.error("Ошибка при добавлении карточки: ".concat(e))}))})).catch((e=>{console.error("Ошибка при загрузке данных с сервера: ".concat(e))}));const f=new e({inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},d),k=new n(".popup_type-add",(e=>{S(e),k.close()}));k.setEventListeners();const b=new o({nameSelector:".profile__title",bioSelector:".profile__bio"});function E(e){if(!e)return void console.error("Неверный cardId");const t=new i(".popup_type-delete",(()=>{h.deleteCard(e).then((()=>{g.removeItem(e),t.close()})).catch((e=>{console.error("Ошибка при удалении карточки: ".concat(e))}))}));t.setEventListeners(),t.open()}function I(e){e.owner&&e.owner._id,!!e.likes&&e.likes.some((e=>e._id===l));return new c(e,"#card-template",l,{handleCardClick:U,handleCardDelete:E,handleCardLike:w,handleCardDeleteLike:x}).createCardElement()}const y=new e({inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},p);function S(e){h.getUserInfo().then((e=>(l=e._id,b.setUserInfo(e),h.getInitialCards()))).then((e=>{g.setItems(e),e.forEach((e=>{const t=I(e);g.addItem(t)}))})).catch((e=>{console.error("Ошибка при загрузке данных с сервера: ".concat(e))}))}_.addEventListener("click",(()=>{f.resetValidation(),k.open()}));const g=new class{constructor(e,t){let{renderer:s}=e;this._renderer=s,this._container=document.querySelector(t),this._items=[]}renderItems(e){e.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}removeItem(e){const t=this._container.querySelector('[data-card-id="'.concat(e,'"]'));t&&t.remove()}updateLikes(e,t){this._items.forEach((s=>{s._data._id===e&&s.updateLikes(t)}))}setItems(e){this._items=e}}({items:[],renderer:e=>{const t=I(e);g.addItem(t)}},".elements");h.getUserInfo().then((e=>(l=e._id,b.setUserInfo(e),h.getInitialCards()))).then((e=>{g.renderItems(e)})).catch((e=>{console.error("Ошибка при загрузке данных с сервера: ".concat(e))}));const L=p.querySelector(".popup__input_type_name"),q=p.querySelector(".popup__input_type_bio"),B=new n(".popup_type-edit",(e=>{!function(e){B.setSubmitButtonCaption("Сохранение..."),h.editUserInfo(e).then((e=>{b.setUserInfo(e),B.close()})).catch((e=>{console.error("Ошибка при редактировании профиля: ".concat(e))})).finally((()=>{B.setSubmitButtonCaption("Сохранить")}))}(e),B.close()}));function U(e){C.open(e)}function w(e,t){return h.likeCard(e,t).then((e=>e)).catch((e=>{throw console.error("Ошибка при постановке/снятии лайка:",e),e}))}function x(e){return h.unlikeCard(e).then((e=>e)).catch((e=>{throw console.error("Ошибка при удалении лайка: ".concat(e)),e}))}B.setEventListeners(),y.enableValidation(),f.enableValidation(),v.enableValidation(),u.addEventListener("click",(()=>{!function(){const e=b.getUserInfo();L.value=e.name,q.value=e.bio,B.open()}(),B.setSubmitButtonCaption("Сохранить")})),_.addEventListener("click",(()=>k.open()));const T=new i(".popup_type-delete",(e=>{h.deleteCard(e).then((()=>{g.removeItem(e),T.close()})).catch((e=>{console.error("Ошибка при удалении карточки: ".concat(e))}))}));T.setEventListeners();const D=new a(".popup_type-avatar",(e=>{document.querySelector(".profile__avatar").src=e}),h);D.setEventListeners();document.querySelector(".profile__avatar-edit-button").addEventListener("click",(()=>{D.open()}))})();