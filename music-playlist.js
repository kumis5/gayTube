const trackElements = document.querySelectorAll('.playlist-track-title');
const songs = [
  'Duality', 
  'Enter Sadman', 
  'Psychosocial', 
  'Useewa', 
  'Gira Gira', 
  'Somewhere I Belong', 
  'Faint'
];

for (let i = 0; i < trackElements.length; i++) {
  trackElements[i].addEventListener('click', function() {
    const playerFrame = window.parent.document.getElementById('playerFrame');
    if (playerFrame) {
      const playerWindow = playerFrame.contentWindow;
      playerWindow.loadSong(songs[i]);
      playerWindow.playSong();
    }
  });
}