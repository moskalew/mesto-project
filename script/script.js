const popupProfile = document.querySelector("#popup_profile");
const btnEditProfile = document.querySelector(".profile__edit-button");
const closeIcon = popupProfile.querySelector(".popup__close-icon");
const profileForm = popupProfile.querySelector("[name='form']");

const popupLocation = document.querySelector("#popup_location");
const btnAddLocation = document.querySelector(".profile__add-button");
const locationCloseIcon = popupLocation.querySelector(".popup__close-icon");
const locationForm = popupLocation.querySelector("[name='form']");

const galleryContainer = document.querySelector("#gallery-container");
const galleryTemplate = document.querySelector("#gallery-template");

const profileInfo = {
  name: document.querySelector(".profile__name").textContent,
  mission: document.querySelector(".profile__mission").textContent,
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
  closePopup(popupProfile);
}

btnEditProfile.addEventListener("click", (event) => {
  const btn = event.target;
  const popupSelector = btn.dataset.popup;
  const popup = document.querySelector(popupSelector);
  setProfileInfo(profileInfo.name, profileInfo.mission);
  openPopup(popup);
});

closeIcon.addEventListener("click", (event) => {
  closePopup(popupProfile);
});

profileForm.addEventListener("submit", saveProfile);

galleryData.reverse().forEach((cardData) => {
  const card = createCard(cardData.title, cardData.link);
  prependCard(card);
});

function createAndRenderCardFromForm(form) {
  const title = form.elements.location.value;
  const link = form.elements.link.value;
  const card = createCard(title, link);
  prependCard(card);
}

function createCard(title, link, altText) {
  const cardNode = galleryTemplate.content.cloneNode(true);
  const galleryTitle = cardNode.querySelector(".gallery__text");
  const galleryLink = cardNode.querySelector(".gallery__image");
  const galleryGarbageIcon = cardNode.querySelector(".gallery__garbage-icon");
  const galleryIcon = cardNode.querySelector(".gallery__icon");
  const alt = 'изображение места "' + title + '"';

  galleryTitle.textContent = title;

  galleryLink.src = link;
  galleryLink.alt = alt;

  galleryGarbageIcon.addEventListener("click", () => {
    galleryGarbageIcon.closest('.gallery__card').remove();
  });

  galleryIcon.addEventListener("click", function () {
    galleryIcon.classList.toggle("gallery__icon_active");
  });

  galleryLink.addEventListener("click", () => {
    setPreview(link, title, alt);
  });
  return cardNode;
}

function prependCard(card) {
  galleryContainer.prepend(card);
}

function saveLocation(event) {
  event.preventDefault();
  const form = event.target;
  createAndRenderCardFromForm(form);
  form.reset();
  closePopup(popupLocation);
}

btnAddLocation.addEventListener("click", (event) => {
  const btn = event.target;
  const popupSelector = btn.dataset.popup;
  const popup = document.querySelector(popupSelector);
  openPopup(popup);
});

locationCloseIcon.addEventListener("click", () => {
  closePopup(popupLocation);
});
locationForm.addEventListener("submit", saveLocation);

const previewPopup = document.querySelector(".popup_img");
previewPopup
  .querySelector(".popup__close-icon")
  .addEventListener("click", () => {
    closePopup(previewPopup);
  });

function setPreview(src, caption = "", altText = "") {
  if (!src) {
    console.error("Попытка открыть popup без src");
    return;
  }
  const img = previewPopup.querySelector("img");
  img.src = src;
  img.alt = altText;
  previewPopup.querySelector(".popup__caption").textContent = caption;
  openPopup(previewPopup);
}