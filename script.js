let popup = document.querySelector('.popup');
let btnEditProfile = document.querySelector('.profile__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');

function popupOpen() {
    popup.classList.add('popup_opened'); 
}
btnEditProfile.addEventListener('click', popupOpen);

function popupClose() {
    popup.classList.toggle('popup_opened');  
}
closeIcon.addEventListener('click', popupClose);