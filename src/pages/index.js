
import '../pages/index.css';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from "../components/Section.js";
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupWithDelete.js';
import Card from "../components/Card.js";
import { 
  avatarEditButton,
  validationConfig,
  apiConfig,
  buttonEditProfile,
  buttonAddCard,
  InitialCards,
  profileName,
  profileBio,
  profileAvatar
} from '../components/constans.js';

let userId;

const api = new Api(apiConfig); // Создаем экземпляр класса Api с переданными данными

// Получаем информацию о пользователе и списке карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([users, cards]) => {
    const userData = users;
    const cardList = cards;

    userId = userData._id;

    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);

    cardSection.renderItems(cardList);
  })
  .catch(err => console.log(err));

const popupWithImage = new PopupWithImage('.popup_type-card');
popupWithImage.setEventListeners();

// Функция создания карточки
function createCard(cardItem) {
  const card = new Card(cardItem, '#card-template', handleCardClick, handleDelete, handleLike, userId);
  const newCard = card.createCardElement(); 
  return newCard;
}

// Функция обработки клика на карточке
function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

// Функция обработки клика на кнопке удаления карточки
function handleDelete(card, cardId) {
  popupDeleteCard.open(card, cardId);
}

// Функция оработки клика лайка
function handleLike(card) {
  if (card.isLike) {
    api.deleteLike(card._cardId)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.putLike(card._cardId)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Создаем экземпляр секции для карточек
const cardSection = new Section({
  items: [],
  renderer: (cardItem) => cardSection.addItem(createCard(cardItem))
}, InitialCards);

// Создаем экземпляр UserInfo для управления информацией о пользователе
const userInfo = new UserInfo({name: profileName, about: profileBio, avatar: profileAvatar});

// Создаем экземпляр модального окна для добавления новой карточки
const popupAddCard = new PopupWithForm('.popup_type-add', handleSubmitAddCard);
popupAddCard.setEventListeners();

// Функция для обработки отправки формы добавления новой карточки
function handleSubmitAddCard(name, link) {
  popupAddCard.renderLoading(true);

  api.addCard(name, link)
    .then((res) => {
      const newCard = createCard(res);
      cardSection.addItem(newCard);
      popupAddCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
}

// Создаем экземпляры валидаторов для форм
const formEditModalWindow = document.querySelector('.popup__form_edit');
const formCardModalWindow = document.querySelector('.popup__form_add');
const formEditAvatarModalWindow = document.querySelector('.popup__form_type-avatar');

const formEditValidator = new FormValidator(validationConfig, formEditModalWindow);
const formCardValidator = new FormValidator(validationConfig, formCardModalWindow);
const formEditAvatarValidator = new FormValidator(validationConfig, formEditAvatarModalWindow);

formEditValidator.enableValidation();
formCardValidator.enableValidation();
formEditAvatarValidator.enableValidation();

// Добавляем обработчик клика добавления карточки 
buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();
  formCardValidator.resetValidation();
});

// Создаем экземпляр модального окна для подтверждения удаления карточки
const popupDeleteCard = new PopupDelete('.popup_type-delete', handleDeleteCard)
popupDeleteCard.setEventListeners();

// Функция для удаления карточки
function handleDeleteCard(card) {
  popupDeleteCard.renderLoading(true, 'Удаление...');

  api.deleteCard(card._cardId)
    .then(() => {
      card.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupDeleteCard.renderLoading(false);
    });
}

// Создаем экземпляр окна для редактирования профиля.
const popupEditProfile = new PopupWithForm('.popup_type-edit', handleSubmitEditForm);
popupEditProfile.setEventListeners();

// Функция для отправки формы редактирования профиля
function handleSubmitEditForm(data) {
  popupEditProfile.renderLoading(true);

  api.editUserInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false)
    });
}

// Добавляем обработчик клика для редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  const formEditModalWindow = document.querySelector('.popup_type-edit .popup__form');
  const formEditValidator = new FormValidator(validationConfig, formEditModalWindow);
  formEditValidator.enableValidation();

  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  formEditValidator.resetValidation();
});

// Добавляем обработчик клика для редактирования аватара 
avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open(); 
  formEditAvatarValidator.resetValidation(); 
});

// Создаем экземпляр окна для редактирования аватара пользователя
const popupEditAvatar = new PopupWithForm('.popup_type-avatar', handleSubmitEditAvatar);
popupEditAvatar.setEventListeners();

// Функция для обработки отправки редактирования аватара
function handleSubmitEditAvatar(data) {
  popupEditAvatar.renderLoading(true);

  api.updateAvatar(data)
    .then(() => {
      userInfo.setUserAvatar(data);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}

// Добавляем обработчик клика на аватар пользователя
profileAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  formEditAvatarValidator.resetValidation();
});

