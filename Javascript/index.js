import Champion from './champions.js';
import songs from '../sources/assests/songs/*.mp3'
import Player from './player.js';

var Champions = [];


const button = document.querySelector("button");
button.addEventListener("click", () => {
    document.querySelector('#button').style.visibility = 'hidden';
    document.querySelector('#champion_list').style.visibility = 'visible';
    startChampions();
    Object.keys(songs);

    const map = { };

    let aux = 1;

    for (var key of Object.keys(songs)){
        map[`.item-${aux}`] = songs[key];
        aux += 1;
    }

    const player = new Player(map)
});

const startChampions = async () => {
    const api = "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json"
    const response = await fetch(api);
    if (!response.ok){
        throw new Error('Fallo en la lectura de la api')
    }

    const data = await response.json()
    const all_warriors = data.data

    Object.keys(all_warriors).forEach(character => {
        let champion = new Champion(all_warriors[character]);
        pushChampion(champion);
    });

    console.log(Champions)

    showChampions();
}

function pushChampion(Champion) {
    Champions.push(Champion);
}

const showChampions = async () => {
    const ChampionsList = document.getElementById("champion_list");
    for(var i = 0; i < Champions.length; i++) {
        ChampionsList.innerHTML +=    `<div class="card">
                                    <img class="front" src="${Champions[i].sprite}">
                                    <br>
                                    <p class="name">${Champions[i].name}</p>
                                    <p class="title">${Champions[i].title}</p>
                                    <br>
                                    <div class="attributes"> 
                                    <p>${Champions[i].attack} attack</p>
                                    <p>${Champions[i].magic} magic</p>
                                    <p>${Champions[i].defense} defense</p>
                                    <p>${Champions[i].difficulty} difficulty</p> 
                                    </div>
                                    <div class="tags">
                                        ${Champions[i].tags}
                                    </div>
                                    <div class="partype">
                                        ${Champions[i].partype}                        
                                    </div>
                                </div>`
    }
}

