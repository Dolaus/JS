let currentUrl = 'https://rickandmortyapi.com/api/character';

const windowHeight = document.documentElement.clientHeight;
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCloseBtn = document.getElementById('modal-close-btn');
const characterContainer = document.getElementById('character-container');
let info;
let results;

async function fetchData(url) {
    if (!document.querySelector('._loading')) {
        characterContainer.insertAdjacentHTML(
            'beforeend',
            '<div class="loading">Loading</div>',
        )
    }

    characterContainer.classList.add('_loading');

    const response = await fetch(url);
    ({info, results} = await response.json());

    characterContainer.innerHTML += characters(results)
    characterContainer.classList.remove('_loading');
    document.querySelector('.loading').remove()
}

function characters(arrayCharacters) {
    let allCharacters = '';
    arrayCharacters.map(el => {
        allCharacters += `<div data-id="${el.id}" class="card">
            <img src="${el.image}" alt="${el.name}">
            <h3>${el.name}</h3>
            <p class="status">${el.status}</p>
        </div>`
    });

    return allCharacters;
}

fetchData(currentUrl);

function loadCharacters() {
    const loadBlockPos = characterContainer.getBoundingClientRect().top + pageYOffset;
    const loadBlockHeight = characterContainer.offsetHeight;

    if (pageYOffset > (loadBlockPos + loadBlockHeight) - windowHeight ) {
        if (info.next) {
            fetchData(info.next);
        }
    }
}

window.addEventListener('scroll', async () => {
    if (!characterContainer.classList.contains('_loading')) {
        loadCharacters();
    }
})

characterContainer.addEventListener('click', async (ev) => {
    if (ev.target.closest('.card')) {
        const clickedCard = ev.target.closest('.card');
        let id = clickedCard.getAttribute('data-id');

        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`).then(response => response.json());
        modalImg.src = response.image;
        modalTitle.src = response.name;
        modal.style.display = 'block';
    }
});

window.addEventListener('click', (event) => {
    console.log(event.target)
    console.log(modal)
    if (!modal.contains(event.target)) {
        modal.style.display = 'none';
        event.stopPropagation();
    }
});

modalCloseBtn.addEventListener('click', (event) => {
    modal.style.display = 'none';
    event.stopPropagation();
})