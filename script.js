const popup = document.querySelector('.popup');
const btnEditProfile = document.querySelector('.profile__edit-button');
const closeIcon = document.querySelector('.popup__close-icon');
const profileForm = popup.querySelector('[name="form"]');

const profileInfo = {
    name: document.querySelector('.profile__name').textContent,
    mission: document.querySelector('.profile__mission').textContent,
}

function popupOpen() {
    popup.classList.add('popup_opened'); 
    setProfileInfo(profileInfo.name, profileInfo.mission);
}

function popupClose() {
    popup.classList.toggle('popup_opened');  
}

function setProfileInfo(name, mission) {
    profileForm.elements.name.value = name;
    profileForm.elements.mission.value = mission;
}

function saveProfile(event) {
    event.preventDefault();
    // console.log(event);
    profileInfo.name = event.target.elements.name.value;
    profileInfo.mission = event.target.elements.mission.value;
    document.querySelector('.profile__name').textContent = profileInfo.name;
    document.querySelector('.profile__mission').textContent = profileInfo.mission;
    popupClose();
}

btnEditProfile.addEventListener('click', popupOpen);
closeIcon.addEventListener('click', popupClose);
profileForm.addEventListener('submit', saveProfile);

