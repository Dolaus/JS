let currentUrl = 'https://rickandmortyapi.com/api/character';

async function fetchCharacters(url) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('character-container').style.display = 'none';

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCharacters(data.results);
        return data.info;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('character-container').style.display = 'grid';
    }
}

function displayCharacters(characters) {
    const container = document.getElementById('character-container');
    container.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p class="status">${character.status}</p>
        `;

        container.appendChild(card);
    });
}

async function handlePagination() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageNum = document.getElementById('page-num');

    let info = await fetchCharacters(currentUrl);

    prevBtn.disabled = !info.prev;
    nextBtn.disabled = !info.next;

    prevBtn.addEventListener('click', async () => {
        if (info.prev) {
            currentUrl = info.prev;
            info = await fetchCharacters(currentUrl);
            pageNum.textContent = `Page ${getPageNumberFromUrl(currentUrl)}`;
            nextBtn.disabled = !info.next;
            prevBtn.disabled = !info.prev;
        }
    });

    nextBtn.addEventListener('click', async () => {
        if (info.next) {
            currentUrl = info.next;
            info = await fetchCharacters(currentUrl);
            pageNum.textContent = `Page ${getPageNumberFromUrl(currentUrl)}`;
            nextBtn.disabled = !info.next;
            prevBtn.disabled = !info.prev;
        }
    });
}

function getPageNumberFromUrl(url) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    return urlParams.get('page') || 1;
}

handlePagination();