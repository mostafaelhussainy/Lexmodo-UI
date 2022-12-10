'use strict';

// F E T C H I N G      D A T A
const usersContainer = document.getElementById('users');
let userData;

// Fetch data and fire render
const getUsersAndRender = function (url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            userData = data;
            renderUsers(userData);
        });
};

// Render function
const renderUsers = function (data) {
    data.forEach((user) => {
        const userCard = `
  <div class='user-card' id='${user.id}'>
  <figure>
    <img src='assests/avatar.png' alt='user image' class='avatar'/>
    <figcaption>
      <h3 class='name'>${user.name}</h3>
      <p  class='user-name'>@${user.username}</p>
      <p  class='catch-phrase'>"${user.company.catchPhrase}"</p>
    </figcaption>
  </figure>
  <div class='user-details'>
    <div class='flex-row'><img src="assests/email.svg" alt="email icon" class="icons"/><p class='user-email'>${user.email}</p></div>
    <div class='flex-row'><img src="assests/location.svg" alt="location icon" class="icons"/><p class='user-address'>${user.address.street}, ${user.address.suite}, ${user.address.city},<br class='address-control'/> ${user.address.zipcode} ${user.address.geo.lat}, ${user.address.geo.lng}</p></div>
    <div class='flex-row'><img src="assests/phone.svg" alt="phone icon" class="icons"/><p class='user-phone'>${user.phone}</p></div>
    <div class='flex-row'><img src="assests/website.svg" alt="website icon" class="icons"/><p class='user-website'>${user.website}</p></div>
    <div class='flex-row'><img src="assests/suitcase.svg" alt="suitcase icon" class="icons"/><p class='user-company-name'>${user.company.name}</p></div>
    <div class='flex-row'><img src="assests/factory.svg" alt="factory icon" class="icons"/><p class='user-company-bs'>${user.company.bs}</p></div>
  </div>
</div>
  `;
        usersContainer.innerHTML += userCard;
    });
};

getUsersAndRender('https://jsonplaceholder.typicode.com/users');

////////////////////////////////////////////////////////////////////////////////////
// D R O P D O W N

const sortingResult = document.querySelector('.sorting');
const AZBtn = document.querySelector('.a-z');
const ZABtn = document.querySelector('.z-a');

// Compare functions
function compareNamesAscending(a, b) {
    let nameA = a.name;
    let nameB = b.name;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}

function compareNamesDescending(a, b) {
    let nameA = a.name;
    let nameB = b.name;
    if (nameA < nameB) {
        return 1;
    }
    if (nameA > nameB) {
        return -1;
    }
    return 0;
}

// Sorting and event handlers
const sortingAtoZ = function () {
    sortingResult.innerHTML = 'Filter by Name (A-Z)';
    usersContainer.innerHTML = '';
    let sortedData = userData.sort(compareNamesAscending);
    renderUsers(sortedData);
};

AZBtn.addEventListener('click', sortingAtoZ);

const sortingZtoA = function () {
    sortingResult.innerHTML = 'Filter by Name (Z-A)';
    usersContainer.innerHTML = '';
    let sortedData = userData.sort(compareNamesDescending);
    renderUsers(sortedData);
};

ZABtn.addEventListener('click', sortingZtoA);

////////////////////////////////////////////////////////////////////////////////////
// S E A R C H

const searchBar = document.getElementById('search');
function searchUser(event) {
    const filteredResult = userData.filter((user) =>
        user.name.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    usersContainer.innerHTML = '';
    renderUsers(filteredResult);
}

searchBar.addEventListener('input', searchUser);
