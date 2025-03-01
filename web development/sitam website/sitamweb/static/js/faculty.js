const facultyCards = document.querySelectorAll('.faculty-member');
const popupOverlay = document.getElementById('faculty-popup');
const closePopup = document.querySelector('.close-popup');

const popupName = document.getElementById('popup-name');
const popupTitle = document.getElementById('popup-title');
const popupDepartment = document.getElementById('popup-department');
const popupQualification = document.getElementById('popup-qualification');
const popupEmail = document.getElementById('popup-email');
const popupPhone = document.getElementById('popup-phone');
const popupBio = document.getElementById('popup-bio');
const popupPhoto = document.getElementById('popup-photo');

popupDepartment.style.color = '#0a00c2';
popupEmail.style.color = '#0a00c2';
popupPhone.style.color = '#0a00c2';
popupEmail.style.color = '#0a00c2';
popupQualification.style.color = '#0a00c2';

popupPhoto.style.width = '60%';

facultyCards.forEach(card => {
    card.addEventListener('click', () => {
        const name = card.getAttribute('data-fac_name');
        const title = card.getAttribute('data-fac_role');
        const department = card.getAttribute('data-dept_name');
        const email = card.getAttribute('data-fac_email');
        const phone = card.getAttribute('data-fac_mobile');
        const bio = card.getAttribute('data-fac_desc');
        const photoSrc = card.querySelector('img').src;
        const qualification = card.getAttribute('data-fac_qualification');

        popupName.textContent = name;
        popupTitle.textContent = title;
        popupDepartment.textContent = department;
        popupEmail.textContent = email!='None' ? email : 'Not Available';
        popupPhone.textContent = phone!='None' ? phone : 'Not Available';
        popupBio.textContent = bio;
        popupPhoto.innerHTML = `<img src="${photoSrc}" alt="${name}">`;
        popupQualification.textContent = qualification;

        popupOverlay.style.display = 'flex';
    });
});

closePopup.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.style.display = 'none';
    }
});


const hodPhotos = document.querySelectorAll('.hod-photo');
hodPhotos.forEach(hod => {
        hod.addEventListener('click', () => {
        const name = hod.getAttribute('data-hod_name');
        const title = hod.getAttribute('data-hod_role');
        const department = hod.getAttribute('data-dept_name');
        const email = hod.getAttribute('data-hod_email');
        const phone = hod.getAttribute('data-hod_mobile');
        const bio = hod.getAttribute('data-hod_desc');
        const photoSrc = hod.querySelector('img').src;
        const qualification = hod.getAttribute('data-hod_qualification');

        console.log(name);

        popupName.textContent = name;
        popupTitle.textContent = title;
        popupDepartment.textContent = department;
        popupEmail.textContent = email!='None' ? email : 'Not Available';
        popupPhone.textContent = phone!='None' ? phone : 'Not Available';
        popupBio.textContent = bio;
        popupPhoto.innerHTML = `<img src="${photoSrc}" alt="${name}">`;
        popupQualification.textContent = qualification;

        popupOverlay.style.display = 'flex';
    });
});