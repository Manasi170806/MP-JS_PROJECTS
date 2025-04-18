const song = document.getElementById("song");
const progress = document.getElementById("progress");
const ctrlIcon = document.getElementById("ctrlIcon");
const forwardBtn = document.querySelector(".fa-forward");
const backwardBtn = document.querySelector(".fa-backward");

const playlist = [
{
    name: "	Gheli Thai Jaaun From Shastra",
    artist: "Bhargav Purohit",
    src: "songs/HAc7VRMIUUA.mp3",
    img: "img/1.jpg ",
},
{
    name: "Mari Laadki",
    artist: "Jignesh Barot",
    src: "songs/JThZdg1xBFc.mp3",
    img: "img/2.jpg",
},
{
    name: "TOM JERRY",
    artist: "Bhargav Purohit, Parth Tarpara, Dilip Rawal, Prashant Satose",
    src: "songs/JFEydUB4dl0.mp3",
    img: "img/3.jpg",
}];

let currentSongIndex = 0;

function loadSong(index) 
{
  const { name, artist, src, img } = playlist[index];
  song.src = src;
  document.querySelector("h1").innerText = name;
  document.querySelector("p").innerText = artist;
  document.querySelector(".song_img").src = img;
}

function playPause() 
{
  if (song.paused) 
  {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
  } 
  else 
  {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
}

song.onloadedmetadata = function () 
{
  progress.max = song.duration;
  progress.value = song.currentTime;
};

song.ontimeupdate = function () 
{
  progress.value = song.currentTime;
};

progress.oninput = function () 
{
  song.currentTime = progress.value;
};

song.onended = function () 
{
  nextSong();
};

function nextSong() 
{
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  song.play();
  ctrlIcon.classList.remove("fa-play");
  ctrlIcon.classList.add("fa-pause");
}

function prevSong() 
{
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  song.play();
  ctrlIcon.classList.remove("fa-play");
  ctrlIcon.classList.add("fa-pause");
}

forwardBtn.addEventListener("click", nextSong);
backwardBtn.addEventListener("click", prevSong);

const volumeControl = document.createElement("input");
volumeControl.type = "range";
volumeControl.min = 0;
volumeControl.max = 1;
volumeControl.step = 0.01;
volumeControl.value = 0.5;
volumeControl.classList.add("volume-slider");
volumeControl.style.marginTop = "20px";
document.querySelector(".music_player").appendChild(volumeControl);

volumeControl.oninput = function () 
{
  song.volume = this.value;
};

loadSong(currentSongIndex);
song.volume = volumeControl.value;