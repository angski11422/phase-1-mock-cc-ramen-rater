// write your code here
fetchRamen();
let currentRamen; 
const ramenMenu = document.querySelector('#ramen-menu');
const currentRamenImg = document.querySelector('.detail-image');
const ramenName = document.querySelector('.name');
const ramenRest = document.querySelector('.restaurant');
const ramenRating = document.getElementById('rating-display');
const ramenComment = document.getElementById('comment-display');
const ramenForm = document.querySelector('#new-ramen');
function fetchRamen() {
    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => {
        data.forEach((ramens) => {
            renderRamen(ramens);
            addNewRamen();
            }),
        ramenDetails(data[0])
    })
}
function renderRamen(ramens) {
    const ramenImg = document.createElement('img');
    ramenImg.src = ramens.image;
    ramenMenu.appendChild(ramenImg);
    ramenImg.addEventListener('click', () => ramenDetails(ramens));        
}

function ramenDetails(ramens) {
    currentRamen = ramens;
    currentRamenImg.src = ramens.image;
    ramenName.textContent = ramens.name;
    ramenRest.textContent = ramens.restaurant;
    ramenRating.textContent = ramens.rating;
    ramenComment.textContent = ramens.comment;
}

function addNewRamen() {
    ramenForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let newRamen = {
            name: e.target['new-name'].value,
            restaurant: e.target['new-restaurant'].value,
            image: e.target['new-image'].value,
            rating: e.target['new-rating'].value,
            comment: e.target['new-comment'].value
        }
        renderRamen(newRamen);

        fetch(`http://localhost:3000/ramens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRamen)
        });
        e.target.reset();
    })   
}
//function updateRating() 