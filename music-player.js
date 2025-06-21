import './music-player.css';


const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const cover = document.querySelector('.cover__img');
const imgSrc = document.querySelector('.img__src');

const songs = ['Duality', 'Enter Sadman', 'Psychosocial', 'Useewa', 'Gira Gira', 'Somewhere I Belong', 'Faint'];
let songIndex = 0;

function loadSong(song) {
   title.innerHTML = song;
   audio.src = `audios/${song}.mp3`;
   songIndex = songs.indexOf(song);
   cover.src = `covers/cover${songIndex + 1}.png`;
}
loadSong(songs[songIndex]);

function playSong() {
  player.classList.add('play');
  cover.classList.add('active');
  imgSrc.src = 'icons/pause.png';
  audio.play();
}

function pauseSong() {
  player.classList.remove('play')
  cover.classList.remove('active');
  imgSrc.src = 'icons/play.png';
  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}) 

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

function updateProgress(event) {
  const {duration, currentTime} = event.srcElement;
  const progressPercent = ( currentTime / duration ) * 100;
  progress.style.width = `${progressPercent}%`;
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// Обработка пробела для play/pause
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    const isPlaying = player.classList.contains('play');
    if (isPlaying) pauseSong();
    else playSong();
  }
});



// Делаем функции глобальными для доступа из других фреймов
window.loadSong = loadSong;
window.playSong = playSong;
window.pauseSong = pauseSong;