const popupLocation = document.querySelector('#popup_location');
const btnAddLocation = document.querySelector('.profile__add-button');
const locationCloseIcon = popupLocation.querySelector('.popup__close-icon');
const locationForm = popupLocation.querySelector('[name="form"]');

const locationInfo = {
    location: '',
    link: '',
}

function popupLocationOpen() {
    popupLocation.classList.toggle('popup_opened'); 
}

function popupLocationClose() {
    popupLocation.classList.toggle('popup_opened');  
}

function saveLocation(event) {
    event.preventDefault();
    console.log(event);
    
    popupLocationClose();
}

btnAddLocation.addEventListener('click', popupLocationOpen);
locationCloseIcon.addEventListener('click', popupLocationClose);
locationForm.addEventListener('submit', saveLocation);



