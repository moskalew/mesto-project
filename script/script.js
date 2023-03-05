// edit profile

const popupProfile = document.querySelector("#popup_profile");
const btnEditProfile = document.querySelector(".profile__edit-button");
const closeIcon = popupProfile.querySelector(".popup__close-icon");
const profileForm = popupProfile.querySelector("[name='form']");

const profileInfo = {
  name: document.querySelector(".profile__name").textContent,
  mission: document.querySelector(".profile__mission").textContent,
};

function popupProfileOpen() {
  popupProfile.classList.toggle("popup_opened");
  setProfileInfo(profileInfo.name, profileInfo.mission);
}

function popupProfileClose() {
  popupProfile.classList.toggle("popup_opened");
}

function setProfileInfo(name, mission) {
  profileForm.elements.name.value = name;
  profileForm.elements.mission.value = mission;
}

function saveProfile(event) {
  event.preventDefault();

  profileInfo.name = event.target.elements.name.value;
  profileInfo.mission = event.target.elements.mission.value;
  document.querySelector(".profile__name").textContent = profileInfo.name;
  document.querySelector(".profile__mission").textContent = profileInfo.mission;
  popupProfileClose();
}

btnEditProfile.addEventListener("click", popupProfileOpen);
closeIcon.addEventListener("click", popupProfileClose);
profileForm.addEventListener("submit", saveProfile);

// create cards

const galleryContainer = document.querySelector("#gallery-container");
const galleryTemplate = document.querySelector("#gallery-template");

const galleryData = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

galleryData.reverse().forEach((cardData) => {
  createAndRenderCard(cardData.title, cardData.link);
});

// add cards

function createAndRenderCardFromForm(form) {
  const title = form.elements.location.value;
  const link = form.elements.link.value;

  createAndRenderCard(title, link);
}

function createAndRenderCard(title, link) {
  const cardNode = galleryTemplate.content.cloneNode(true);
  const galleryTitle = cardNode.querySelector(".gallery__text");
  const galleryLink = cardNode.querySelector(".gallery__image");
  const galleryGarbageIcon = cardNode.querySelector(".gallery__garbage-icon");
  const galleryIcon = cardNode.querySelector(".gallery__icon");

  galleryTitle.textContent = title;

  galleryLink.src = link;

  galleryContainer.prepend(cardNode);

  galleryGarbageIcon.addEventListener("click", () => {
    galleryGarbageIcon.parentElement.remove();
  });

  galleryIcon.addEventListener("click", function () {
    galleryIcon.classList.toggle("gallery__icon_active");
  });

  galleryLink.addEventListener("click", () => {
    setPreview(galleryLink.src, title);
  });
}

const popupLocation = document.querySelector("#popup_location");
const btnAddLocation = document.querySelector(".profile__add-button");
const locationCloseIcon = popupLocation.querySelector(".popup__close-icon");
const locationForm = popupLocation.querySelector("[name='form']");

function popupLocationOpen() {
  popupLocation.classList.toggle("popup_opened");
}

function popupLocationClose() {
  popupLocation.classList.toggle("popup_opened");
}

function saveLocation(event) {
  event.preventDefault();
  const form = event.target;
  createAndRenderCardFromForm(form);
  form.reset();
  popupLocationClose();
}

btnAddLocation.addEventListener("click", popupLocationOpen);
locationCloseIcon.addEventListener("click", popupLocationClose);
locationForm.addEventListener("submit", saveLocation);

const previewPopup = document.querySelector(".popup_img");
previewPopup
  .querySelector(".popup__close-icon")
  .addEventListener("click", () => {
    previewPopup.classList.remove("popup_opened");
  });

function setPreview(src, caption = "") {
  if (!src) {
    console.error("Попытка открыть popup без src");
    return;
  }
  previewPopup.querySelector("img").src = src;
  previewPopup.querySelector(".popup__caption").textContent = caption;
  previewPopup.classList.add("popup_opened");
}
