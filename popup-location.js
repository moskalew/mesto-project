const popupLocation = document.querySelector('#popup_location');
const btnEditLocation = document.querySelector('.profile__add-button');
const locationCloseIcon = popupLocation.querySelector('.popup__close-icon');
const locationForm = popupLocation.querySelector('[name="form"]');

const locationInfo = {
    location: '',
    link: '',
}

function popupOpen() {
    popupLocation.classList.toggle('popup_opened'); 
    setLocationInfo(locationInfo.name, locationInfo.mission);
}

function popupClose() {
    popupLocation.classList.toggle('popup_opened');  
}

function setLocationInfo(name, mission) {
    locationForm.elements.name.value = name;
    locationForm.elements.mission.value = mission;
}

function saveLocation(event) {
    event.preventDefault();
    // console.log(event);
    locationInfo.name = event.target.elements.name.value;
    locationInfo.mission = event.target.elements.mission.value;
    document.querySelector('.location__name').textContent = locationInfo.name;
    document.querySelector('.location__mission').textContent = locationInfo.mission;
    popupClose();
}

btnEditLocation.addEventListener('click', popupOpen);
locationCloseIcon.addEventListener('click', popupClose);
locationForm.addEventListener('submit', saveLocation);



