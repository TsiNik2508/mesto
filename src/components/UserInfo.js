class UserInfo {
  constructor(data) {
    // Конструктор класса принимает информацю о пользователе 
    this._userName = data.name; 
    this._userAbout = data.about; 
    this._userAvatar = data.avatar; 
    this._userId = data._id; 
  }
  // Метод для получения информации о пользователе в виде объекта
  getUserInfo() {
    return {
      name: this._userName.textContent, 
      about: this._userAbout.textContent, 
      avatar: this._userAvatar.src 
    };
  }

  // Метод для установки информации о пользователе 
  setUserInfo({ name, about }) {
    // Проверяем, были ли переданы значения 
    if (name) {
      this._userName.textContent = name; 
    }
    if (about) {
      this._userAbout.textContent = about; 
    }
  }

  // Метод для установки аватара пользователя.
  setUserAvatar(data) {
    this._userAvatar.src = data.avatar; 
  }
}

export default UserInfo; 