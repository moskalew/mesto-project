const popupProfile = document.querySelector('#popup_profile');
const btnEditProfile = document.querySelector('.profile__edit-button');
const closeIcon = popupProfile.querySelector('.popup__close-icon');
const profileForm = popupProfile.querySelector('[name="form"]');

const profileInfo = {
    name: document.querySelector('.profile__name').textContent,
    mission: document.querySelector('.profile__mission').textContent,
}

function popupProfileOpen() {
    popupProfile.classList.toggle('popup_opened'); 
    setProfileInfo(profileInfo.name, profileInfo.mission);
}

function popupProfileClose() {
    popupProfile.classList.toggle('popup_opened');  
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
    popupProfileClose();
}

btnEditProfile.addEventListener('click', popupProfileOpen);
closeIcon.addEventListener('click', popupProfileClose);
profileForm.addEventListener('submit', saveProfile);



