export default class Song {
    constructor(songPath, audio) {
        this.element = document.querySelector(songPath);
        this.audio = new Audio(audio);
    }
}
export function play_song(song){
    song.audio.play();
};