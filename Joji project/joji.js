// Modal Contact
    const modal = document.getElementById("contactModal");
    const btn = document.getElementById("contactBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = () => { modal.style.display = "block"; }
    span.onclick = () => { modal.style.display = "none"; }
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

// Smooth scroll ketika klik link internal
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

//Player
const player = document.getElementById('player');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volumeBar');
const volumeIcon = document.getElementById('volumeIcon').querySelector('img');

let isPlaying = false;
let isMuted = false;
let lastVolume = 1;

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    player.pause();
    playBtn.querySelector('img').src = 'icons/play.svg';
  } else {
    player.play();
    playBtn.querySelector('img').src = 'icons/pause.svg';
  }
  isPlaying = !isPlaying;
});

player.addEventListener('timeupdate', () => {
  const progress = (player.currentTime / player.duration) * 100;
  progressBar.value = progress;
  currentTimeEl.textContent = formatTime(player.currentTime);
  durationEl.textContent = '-' + formatTime(player.duration - player.currentTime);
});

progressBar.addEventListener('input', () => {
  player.currentTime = (progressBar.value / 100) * player.duration;
});

volumeBar.addEventListener('input', () => {
  player.volume = volumeBar.value;
  lastVolume = volumeBar.value;
  updateVolumeIcon();
});

document.getElementById('volumeIcon').addEventListener('click', () => {
  if (isMuted) {
    player.volume = lastVolume;
    volumeBar.value = lastVolume;
  } else {
    lastVolume = player.volume;
    player.volume = 0;
    volumeBar.value = 0;
  }
  isMuted = !isMuted;
  updateVolumeIcon();
});

function updateVolumeIcon() {
  if (player.volume === 0) {
    volumeIcon.src = 'icons/volume-mute.svg';
  } else if (player.volume < 0.5) {
    volumeIcon.src = 'icons/volume-low.svg';
  } else {
    volumeIcon.src = 'icons/volume-high.svg';
  }
}

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

window.addEventListener('load', () => {
  const playerBar = document.querySelector('.spotify-bar');
  setTimeout(() => {
    playerBar.classList.add('show');
  }, 800); // delay 0.8 detik biar smooth
});
