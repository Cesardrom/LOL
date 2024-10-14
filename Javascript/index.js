import Champion from './champions.js';

var Champions = [];

const button = document.querySelector("button");
const audio = document.getElementById("background_music");

button.addEventListener("click", () => {
    if (audio.readyState >= 2) {
        audio.play().catch(error => {
            console.error("Error al intentar reproducir el audio:", error);
        });
    } else {
        audio.addEventListener('canplaythrough', () => {
            audio.play().catch(error => {
                console.error("Error al intentar reproducir el audio:", error);
            });
        });
    }
    document.querySelector('#button').style.visibility = 'hidden';
    document.querySelector('#champion_list').style.visibility = 'visible';
    startChampions();
});


const startChampions = async () => {
    const api = "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json";
    const response = await fetch(api);
    if (!response.ok) {
        throw new Error('Fallo en la lectura de la API');
    }

    const data = await response.json();
    const all_warriors = data.data;

    Object.keys(all_warriors).forEach(character => {
        let champion = new Champion(all_warriors[character]);
        pushChampion(champion);
    });

    console.log(Champions);
    showChampions();
}

function pushChampion(champion) {
    Champions.push(champion);
}

const showChampions = async () => {
    const ChampionsList = document.getElementById("champion_list");

    ChampionsList.innerHTML = '';

    Champions.forEach((champion, index) => {
        const cardHTML = `
            <div class="card">
                <img class="front" src="${champion.sprite}">
                <br>
                <p class="name">${champion.name}</p>
                <p class="title">${champion.title}</p>
                <br>
                <div class="attributes">
                    <p>${champion.attack} attack</p>
                    <p>${champion.magic} magic</p>
                    <p>${champion.defense} defense</p>
                    <p>${champion.difficulty} difficulty</p>
                </div>
                <div class="tags">
                    ${champion.tags}
                </div>
                <div class="partype">
                    ${champion.partype}
                </div>
            </div>`;

        ChampionsList.innerHTML += cardHTML;
    });

    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 100);
    });
}

