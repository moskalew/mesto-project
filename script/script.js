// КОНСТАНТЫ DOM

// профиль: имя с карандашом справа от аватарки
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileMission = profileInfo.querySelector(".profile__mission");

// модалка редактирования профиля, открывается по нажатию на карандаш
const profilePopup = document.querySelector("#popup_profile");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileCloseIcon = profilePopup.querySelector(".popup__close-icon");
// форма профиля в этой модалке и её поля (имя, миссия)
const profileForm = profilePopup.querySelector("[name='form']");
const profileFormNameInput = profileForm.querySelector("[name='name']");
const profileFormMissionInput = profileForm.querySelector("[name='mission']");

// модалка добавления карточки, открывается по нажатию на плюс
const locationPopup = document.querySelector("#popup_location");
const locationAddBtn = document.querySelector(".profile__add-button");
const locationCloseIcon = locationPopup.querySelector(".popup__close-icon");
// форма карточки в этой модалке и её поля (путь к картинке, описание)
const locationForm = locationPopup.querySelector("[name='form']");
const locationFormLinkInput = locationForm.querySelector("[name='link']");
const locationFormLocationInput = locationForm.querySelector("[name='location']");

// модалка предпросмотра картинки из карточки
const previewPopup = document.querySelector(".popup_img");
const previewImage = previewPopup.querySelector("img");
const previewCaption = previewPopup.querySelector(".popup__caption");
const previewCloseIcon = previewPopup.querySelector(".popup__close-icon");

// галерея и шаблон карточки
const cardsContainer = document.querySelector("#gallery-container");
const cardsTemplate = document.querySelector("#gallery-template");


// ФУНКЦИИ

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}


function createCard(link, location) {
  const cardNode = cardsTemplate.content.cloneNode(true);
  const cardTitle = cardNode.querySelector(".gallery__text");
  const cardLink = cardNode.querySelector(".gallery__image");
  const cardDeleteIcon = cardNode.querySelector(".gallery__garbage-icon");
  const cardLikeIcon = cardNode.querySelector(".gallery__icon");
  const alt = 'изображение места "' + location + '"';

  cardLink.src = link;
  cardLink.alt = alt;

  cardTitle.textContent = location;

  cardDeleteIcon.addEventListener("click", () => {
    cardDeleteIcon.closest('.gallery__card').remove();
  });

  cardLikeIcon.addEventListener("click", function () {
    cardLikeIcon.classList.toggle("gallery__icon_active");
  });

  cardLink.addEventListener("click", () => {
    setPreview(link, location, alt);
    openPopup(previewPopup);
  });

  return cardNode;
}

function prependCard(card) {
  cardsContainer.prepend(card);
}

function setPreview(src, caption = "", alt = "") {
  if (!src) {
    console.error("Попытка открыть popup без src");
    return;
  }

  previewImage.src = src;
  previewImage.alt = alt;
  previewCaption.textContent = caption;
}


// СОБЫТИЯ

// модалка профиля
// открываем модалку профиля
profileEditBtn.addEventListener("click", () => {
  profileFormNameInput.value = profileName.textContent;
  profileFormMissionInput.value = profileMission.textContent;
  openPopup(profilePopup);
});

// закрываем модалку профиля
profileCloseIcon.addEventListener("click", (event) => {
  closePopup(profilePopup);
});

// сохраняем профиль
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = profileFormNameInput.value;
  profileMission.textContent = profileFormMissionInput.value;
  closePopup(profilePopup);
});

// модалка добавления карточки
// открываем модалку добавления карточки
locationAddBtn.addEventListener("click", () => {
  openPopup(locationPopup);
});

// закрываем модалку добавления карточки
locationCloseIcon.addEventListener("click", () => {
  closePopup(locationPopup);
});

// создаём новую карточку, добавлем в галлерею, очищаем форму и закрываем модалку
locationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = createCard(locationFormLinkInput.value, locationFormLocationInput.value);
  prependCard(card);

  locationForm.reset();
  closePopup(locationPopup);
});

// просмотр картинки
// закрываем модалку просмотра картинки
previewCloseIcon.addEventListener("click", () => {
  closePopup(previewPopup);
});


// заполняем галерею карточками по шаблону, данные - в скрипте cards.js
galleryData.reverse().forEach((cardData) => {
  const card = createCard(cardData.link, cardData.title);
  prependCard(card);
});



///
/// Validation
///

// форма
// profileForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
// });

// поле name
// profileFormNameInput.addEventListener('input', function (evt) {
//   console.log(evt.target.validity.tooShort);
// });

// поле mission
// profileFormMissionInput.addEventListener('input', function (evt) {
//   console.log(evt.target.validity.valid);
// });
///

// Вынесем все необходимые элементы формы в константы
// выбираем форму ввода
const formElement = profileForm;

// получаем id поля form__input
const formInput = formElement.querySelector('.popup__form');
// console.log(formInput.id);

// с применением шаблонных строк найходим эту ошибку:
// Выбираем элемент ошибки на основе уникального класса 
const formError = formElement.querySelector(`.${formInput.id}-error`);
//

// Передадим текст ошибки вторым параметром
const showInputError = (element, errorMessage) => {
  element.classList.add('popup__form_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  formError.classList.add('popup__form_input_error');
};

const hideInputError = (element) => {
  element.classList.remove('popup__form_type_error');
  formError.classList.remove('popup__form_input_error');
  // Очистим ошибку
  formError.textContent = '';
};

const isValid = () => {
  if (!formInput.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
};

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);


