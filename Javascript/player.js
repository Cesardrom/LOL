import Song, { play_song } from './songs.js'

export default class Player{
    constructor(map){
        Object.entries(map);
        let aux = 1;
        for (var [key,value] of Object.entries(map)){
            var s_key = key;
            var s_value = value;
            var song = new Song(s_key, s_value);
            play_song(song)
            aux ++;
        }
    }
}