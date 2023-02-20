// edit profile

const popupProfile = document.querySelector("#popup_profile"); // объявление константы, привязка уникального селектора элементу DOM
const btnEditProfile = document.querySelector(".profile__edit-button"); // нашли кнопку, сохранили в константу
const closeIcon = popupProfile.querySelector(".popup__close-icon"); // нашли кнопку закрытия, сохранили в константу
const profileForm = popupProfile.querySelector('[name="form"]'); // нашли блок формы с инпутами и кнопкой с типом сабмит

const profileInfo = {
  // создали объект (пара - ключ: значение)
  name: document.querySelector(".profile__name").textContent, //считали (или зАдали?) значение содержимого текстого элемента;
  mission: document.querySelector(".profile__mission").textContent, // то-же с другим свойством
};

function popupProfileOpen() {
  // функция открытия окна
  popupProfile.classList.toggle("popup_opened"); // тут переключается аттрибут класса
  setProfileInfo(profileInfo.name, profileInfo.mission); // это функция, которая получает на вход аргументы свойств объекта
}

function popupProfileClose() {
  // функция закрытия окна
  popupProfile.classList.toggle("popup_opened"); // тут переключается класс хтмл тега
}

function setProfileInfo(name, mission) {
  // функция, которая задаёт (устанавливает) значения в поля инпутов
  profileForm.elements.name.value = name; // тут прописываем значение в инпут формы
  profileForm.elements.mission.value = mission; // тут то же, но с другим именем аттрибута
}

function saveProfile(event) {
  // ф-я сохранения профиля, на входе - событие
  event.preventDefault(); // отменяем стандартное поведение по умолчанию, иначе форма отправится
  // console.log(event);
  profileInfo.name = event.target.elements.name.value; // здесь по событию присваивается значение полю
  profileInfo.mission = event.target.elements.mission.value; // я по прежнему плохо понимаю эвент таргет элементс, хотя тут всё просто
  document.querySelector(".profile__name").textContent = profileInfo.name; // получаем значение текстового поля, присваиваем свойству объекта
  document.querySelector(".profile__mission").textContent = profileInfo.mission; // та же история с другим ключом
  popupProfileClose(); // ф-я закрытия
}

btnEditProfile.addEventListener("click", popupProfileOpen); // + слушатель по клику на кнопку
closeIcon.addEventListener("click", popupProfileClose); // аналогично
profileForm.addEventListener("submit", saveProfile); // здесь добавили слушатель блоку формы с типом сабмит с передачей функции в качестве второго аргумента

// add cards

const popupLocation = document.querySelector("#popup_location"); // здесь получили html элемент по айдишнику
const btnAddLocation = document.querySelector(".profile__add-button"); // тут прицепились к большой кнопке с плюсом
const locationCloseIcon = popupLocation.querySelector(".popup__close-icon"); // это кнопка закрытия
const locationForm = popupLocation.querySelector('[name="form"]'); // здесь упаковали в переменую блок формы

const locationInfo = {
  // это объект с ключами и значениями
  location: "",
  link: "",
};

function popupLocationOpen() {
  // ф-я открытия окна с карточками
  popupLocation.classList.toggle("popup_opened"); // тут меняется класс хтмл элемента
}

function popupLocationClose() {
  // ф-я закрытия
  popupLocation.classList.toggle("popup_opened"); // метод переключает класс хтмл элемента
}

function saveLocation(event) {
  // ф-я сохраниения, принимает эвент
  event.preventDefault(); // отмена стандартного сценария

  createAndRenderCardFromForm(event.target); // ф-я создания и редактирования карточки ( а почему FormForm?)

  popupLocationClose(); // ф-я закрыть попап
}

function toggleLike(event) {
  // ф-я вкл/выкл лайк
  event.target.classList.toggle("gallery__icon_active"); // Свойство target интерфейса Event c методом classList.toggle
} // это надо получше понять

function createAndRenderCardFromForm(form) {
  // ф-я создания карточки (форм на вход?)
  const { location, link } = Object.fromEntries(
      new FormData(
        (form instanceof HTMLFormElement && form) || undefined
      ).entries()
    ), //??
    // ^^ Очевидно объявлена константа-объект,

    //Этот блок создаёт html код
    template = `
            <img class="gallery__image" src="${(
              String(link) || ""
            ).trim()}" alt="${location}"> 
            <h2 class="gallery__text">${location}</h2>
            <button class="gallery__icon -gallery__icon_active" type="button"></button> 
        `, // здесь, возможно, опечатка "-gallery__icon_active", а возможно и нет, надо заглянуть в DOM через консоль.
    gallery = document.querySelector(".gallery"), // находим секцию с карточками
    card = document.createElement("article"); //создаём html элемент с классом "артикль"

  if (location && link && gallery instanceof HTMLElement) {
    // Это блок условия
    card.className = "gallery__cards";
    card.innerHTML = template;
    gallery.prepend(card);
    form.reset();

    card.querySelector(".gallery__icon").addEventListener("click", toggleLike);
  } else
    console.log("renderCard ERROR", location, link, template, gallery, card);
}

btnAddLocation.addEventListener("click", popupLocationOpen);
locationCloseIcon.addEventListener("click", popupLocationClose);
locationForm.addEventListener("submit", saveLocation);

document.querySelectorAll(".gallery__icon").forEach((icon) => {
  icon.addEventListener("click", toggleLike);
});
