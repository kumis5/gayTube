const container = document.querySelector('.container');
const songsContainer = container.querySelector('.songs-container');
const addButton = container.querySelector('.input__btn_action_add');
const resetButton = container.querySelector('.input__btn_action_reset');
const noSongsElement = container.querySelector('.no-songs');
const artistInput = document.querySelector('.input__text_type_artist');
const titleInput = document.querySelector('.input__text_type_title');
const coverHeading = document.querySelector('.cover__heading');

const playListTitles = [
  'Билли Херингтон. Лучшее',
  'Музыка категории swallow suction',
  'Подборка с Gay Party'
];

function renderHasSongs() {
  resetButton.removeAttribute('disabled');
  resetButton.classList.remove('input__btn_disabled');
  noSongsElement.classList.add('no-songs_hidden');
}

function renderNoSongs() {
  resetButton.setAttribute('disabled', true);
  resetButton.classList.add('input__btn_disabled');
  noSongsElement.classList.remove('no-songs_hidden');
}

function addSong(artistValue, titleValue) {
  const songTemplate = document.querySelector('#song-template').content;
  const songElement = songTemplate.querySelector('.song').cloneNode(true);
  const songLike = songElement.querySelector('.song__like'); 
  // ищем внутри скопированного элемента

  songElement.querySelector('.song__artist').textContent = artistValue;
  songElement.querySelector('.song__title').textContent = titleValue;

  // songElement.querySelector('.song__like')

  songsContainer.append(songElement);
}

function getRandomElement(arr) {
  const randomId = Math.floor(Math.random() * arr.length);
  return arr[randomId];
}

function keyHandler(event) {
  if (event.key === "Enter") {
    addSong(artistInput.value, titleInput.value);
    renderHasSongs();
  }
}

songsContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('song__like')) { 
    evt.target.classList.toggle('song__like_active');
  }
});

addButton.addEventListener('click', function () {
  const artist = document.querySelector('.input__text_type_artist');
  const title = document.querySelector('.input__text_type_title');

  addSong(artist.value, title.value);
  renderHasSongs();

  artist.value = '';
  title.value = '';
});

artistInput.addEventListener('keydown', keyHandler);
titleInput.addEventListener('keydown', keyHandler);

function doubleClickHandler() {
  coverHeading.textContent = getRandomElement(playListTitles);
  coverHeading.removeEventListener('dblclick', doubleClickHandler);
}
coverHeading.addEventListener('dblclick', doubleClickHandler)

coverHeading.addEventListener('dblclick', doubleClickHandler);

resetButton.addEventListener('click', function () {
  const songs = document.querySelectorAll('.song')

  for (let i = 0; i < songs.length; i++) {
    songs[i].remove();
  }

  renderNoSongs();
});


function addSongV2(artistValue, titleValue) {
  let trackContainer = document.createElement('div');
  trackContainer.classList.add('song');

  let artistElement = document.createElement('h4');
  artistElement.classList.add('song__artist');
  artistElement.textContent = artistValue;

  let songElement = document.createElement('h4');
  songElement.classList.add('song__title');
  songElement.textContent = titleValue;

  let likeButtonElement = document.createElement('button');
  likeButtonElement.classList.add('song__like');

  // собираем контейнер элементов в один список
  trackContainer.append(artistElement, songElement, likeButtonElement);
  songsContainer.append(trackContainer);
}