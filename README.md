# Ru

# Проект "Mesto"

## Описание

Проект "Mesto" был создан в рамках учебной программы [Яндекс.Практикум](https://practicum.yandex.ru) по специальности ["Веб-разработчик"](https://practicum.yandex.ru/web/). Это интерактивная веб-страница, на которой используются HTML, CSS, и JavaScript для создания динамического контента. Проект представляет собой веб-приложение, которое позволяет пользователям делиться своими фотографиями и просматривать фотографии других пользователей.

## Стек технологий

- HTML
- CSS
- JavaScript
- Git
- Методология БЭМ (Nested)
- Webpack
- API
- ООП

## Особенности проекта

Проект "Mesto" включает в себя следующие ключевые особенности:

1. **Интерактивная галерея фотографий**: Пользователи могут добавлять фотографии, просматривать фотографии других пользователей и ставить им лайки.

2. **Редактирование профиля**: Пользователи могут изменять свое имя, описание и аватар.

3. **Удаление фотографий**: Пользователи могут удалять свои фотографии из галереи.

4. **Лайки**: Пользователи могут ставить лайки фотографиям других пользователей.

## Применение ООП (Объектно-Ориентированного Программирования)

Проект "Mesto" разработан с использованием принципов объектно-ориентированного программирования (ООП). Основные аспекты ООП, реализованные в проекте, включают:

- **Классы и объекты**: Классы используются для создания объектов, таких как карточки и пользователи. Каждый класс имеет свойства и методы, связанные с соответствующим объектом.

- **Инкапсуляция**: Данные и методы, связанные с объектами, инкапсулированы в классах. Это позволяет более четко организовать код и обеспечивает его модульность.

- **Наследование и полиморфизм**: В проекте используется наследование для создания подклассов и полиморфизм для обработки схожих операций над разными объектами.

## Использование API

Проект "Mesto" взаимодействует с внешними данными через API. В частности, он использует API для выполнения следующих операций:

- Получение информации о пользователе и списке карточек с сервера.

- Добавление новых карточек и информации о пользователе на сервер.

- Удаление карточек с сервера.

- Лайкинг и дизлайкинг карточек.

## Интеграция с Webpack

В проект внедрен инструмент сборки Webpack. Это позволяет оптимизировать проект, а также обеспечивает следующие возможности:

- Минификация и оптимизация JavaScript, CSS, HTML и изображений.

- Разделение кода на модули для повышения поддерживаемости и масштабируемости.

- Автоматическая перезагрузка страницы в режиме разработки.

- Обработка HTML-шаблонов и подстановка необходимых зависимостей.

- Добавление кеширования и оптимизации загрузки ресурсов.

## Будущие доработки

Проект "Mesto" находится в процессе активной разработки. Планируются следующие улучшения:

- Портирование проекта на React для улучшения масштабируемости.

- Добавление возможности регистрации и авторизации пользователей на странице.

## Описание кода

### Структура проекта

Проект "Mesto" организован следующим образом:

- `src` - директория с исходным кодом проекта.
  - `blocks` - стили страницы.
  - `components` - компоненты, используемые на страницах.
  - `images` - изображения и графика.
  - `pages` -  файлы index.css и index.js.
  - `utils` - вспомогательные утилиты и константы.
  - `vendor` - шрифты на странице.
  - `index.html` - страница приложения.

## Запуск проекта на локальном сервере

Для запуска проекта на локальном сервере вам потребуется Node.js и npm (пакетный менеджер JavaScript).

1. **Клонирование репозитория:** Сначала склонируйте репозиторий на свой компьютер:

   ```bash
   git clone https://github.com/TsiNik2508/mesto.git

2. **Установка зависимостей:** Перейдите в директорию проекта и выполните команду для установки зависимостей:
    ```bash
    cd mesto
    npm install

3. **Запуск приложения:**
- Для запуска приложения в режиме разработки используйте команду:

   ```bash
   npm run dev
   
- Для запуска приложения в режиме production (без автоматической перезагрузки) используйте команду:

   ```bash
   npm start
   
4. **Открытие в браузере:** Откройте веб-браузер и перейдите по адресу http://localhost:8080, чтобы просмотреть ваше локальное приложение "Mesto".

---
## Демо страницы

 ### [Демо](https://tsinik2508.github.io/mesto/)

 # En 

 # Project "Mesto"

## Description

The "Mesto" project was created as part of the educational program at [Yandex.Practicum](https://practicum.yandex.com) in the ["Web Developer"](https://practicum.yandex.com/web-development/) specialization. It is an interactive web page that utilizes HTML, CSS, and JavaScript to create dynamic content. The project is a web application that allows users to share their photos and view photos from other users.

## Technology Stack

- HTML
- CSS
- JavaScript
- Git
- BEM methodology (Nested)
- Webpack
- API
- OOP

## Project Features

The "Mesto" project includes the following key features:

1. **Interactive photo gallery**: Users can add photos, view photos from other users, and like them.

2. **Profile editing**: Users can edit their name, description, and avatar.

3. **Photo deletion**: Users can delete their photos from the gallery.

4. **Likes**: Users can like photos from other users.

## Application of OOP (Object-Oriented Programming)

The "Mesto" project is developed using object-oriented programming (OOP) principles. The main aspects of OOP implemented in the project include:

- **Classes and objects**: Classes are used to create objects such as cards and users. Each class has properties and methods associated with the respective object.

- **Encapsulation**: Data and methods associated with objects are encapsulated within classes. This allows for clearer organization of code and ensures its modularity.

- **Inheritance and polymorphism**: Inheritance is used in the project to create subclasses, and polymorphism is used to handle similar operations on different objects.

## API Usage

The "Mesto" project interacts with external data through an API. In particular, it uses the API to perform the following operations:

- Retrieving user information and a list of cards from the server.

- Adding new cards and user information to the server.

- Deleting cards from the server.

- Liking and disliking cards.

## Integration with Webpack

The project is integrated with the Webpack build tool. This allows for project optimization and provides the following capabilities:

- Minification and optimization of JavaScript, CSS, HTML, and images.

- Code splitting into modules to improve maintainability and scalability.

- Automatic page reload in development mode.

- Handling HTML templates and injecting necessary dependencies.

- Adding caching and optimizing resource loading.

## Future Improvements

The "Mesto" project is actively under development. The following improvements are planned:

- Porting the project to React to improve scalability.

- Adding user registration and authentication capabilities to the page.

## Code Description

### Project Structure

The "Mesto" project is organized as follows:

- `src` - directory with project source code.
  - `blocks` - page styles.
  - `components` - components used on the pages.
  - `images` - images and graphics.
  - `pages` - index.css and index.js files.
  - `utils` - auxiliary utilities and constants.
  - `vendor` - fonts on the page.
  - `index.html` - application page.

## Running the Project on a Local Server

To run the project on a local server, you will need Node.js and npm (JavaScript package manager).

1. **Cloning the Repository:** First, clone the repository to your computer:

   ```bash
   git clone https://github.com/TsiNik2508/mesto.git

2. **Installing Dependencies:** Navigate to the project directory and execute the command to install dependencies:
    ```bash
    cd mesto
    npm install

3. **Running the Application:**
- To run the application in development mode, use the command:

   ```bash
   npm run dev
   
- To run the application in production mode (without automatic reloading), use the command:

   ```bash
   npm start
   
4. **Opening in Browser:** Open a web browser and go to http://localhost:8080 to view your local "Mesto" application.

---
## Page Demo

 ### [Demo](https://tsinik2508.github.io/mesto/)

