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

// add cards

const popupLocation = document.querySelector("#popup_location").content;
const btnAddLocation = document.querySelector(".profile__add-button");
const locationCloseIcon = popupLocation.querySelector(".popup__close-icon");
const locationForm = popupLocation.querySelector("[name='form']");

const locationInfo = {
  location: "",
  link: "",
};

function popupLocationOpen() {
  popupLocation.classList.toggle("popup_opened");
}

function popupLocationClose() {
  popupLocation.classList.toggle("popup_opened");
}

function saveLocation(event) {
  event.preventDefault();

  createAndRenderCardFromForm(event.target);

  popupLocationClose();
}

function toggleLike(event) {
  event.target.classList.toggle("gallery__icon_active");
}

function createAndRenderCardFromForm(form) {
  const { location, link } = Object.fromEntries(
      new FormData(
        (form instanceof HTMLFormElement && form) || undefined
      ).entries()
    ),
    template = `
            <button class='gallery__garbage-icon' type='button'></button>
            <img class='gallery__image' src='${(
              String(link) || ""
            ).trim()}' alt='${location}'> 
            <h2 class='gallery__text'>${location}</h2>
            <button class='gallery__icon' type='button'></button> 
        `,
    gallery = document.querySelector(".gallery"),
    card = document.createElement("article");

  if (location && link && gallery instanceof HTMLElement) {
    card.className = "#gallery__cards";
    card.innerHTML = template;

    gallery.prepend(card);
    form.reset();

    initCardHandlers(card);
  } else
    console.log("renderCard ERROR", location, link, template, gallery, card);
}

btnAddLocation.addEventListener("click", popupLocationOpen);
locationCloseIcon.addEventListener("click", popupLocationClose);
locationForm.addEventListener("submit", saveLocation);

////

function removeParent(childEl) {
  childEl.parentElement.remove();
}

function removeCard(btnClickEvent) {
  removeParent(btnClickEvent.target);
}

document.querySelectorAll("#gallery__cards").forEach(initCardHandlers);

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

function initCardHandlers(card) {
  card.querySelector(".gallery__icon").addEventListener("click", toggleLike);
  card
    .querySelector(".gallery__garbage-icon")
    .addEventListener("click", removeCard);
  card.querySelector(".gallery__image").addEventListener("click", (event) => {
    console.dir(event.target);
    setPreview(event.target.src);
  });
}
