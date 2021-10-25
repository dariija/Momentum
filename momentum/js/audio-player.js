import {playlistAudio} from './playlist.js';

const audio = document.querySelector('.audio'),
      playlist = document.querySelector('.play-list');

const playAudioButton = document.querySelector('.play'),
      nextAudioButton = document.querySelector('.play-next'),
      prevAudioButton = document.querySelector('.play-prev'),
      soundButton = document.querySelector('.sound');

const trackName = document.querySelector('.player__track-name'),
      trackTotalTime = document.querySelector('.track-total-time'),
      trackCurrentTime = document.querySelector('.track-current-time');

const soundRange = document.querySelector('.sound-range'),
      trackDurationRange = document.querySelector('.track-duration');

let numAudio = 0;
let isPlay = false;

function playAudio() {
    if (isPlay) {
        audio.pause();
        isPlay = false; 

        // pauseAudio()
    } else {
        audio.src = playlistAudio[numAudio].src;
        audio.currentTime = 0;

        playlist.children[numAudio].classList.add('item-active');
        playlist.children[numAudio].classList.add('play-item_pause');
        trackName.textContent = playlistAudio[numAudio].name;
        trackTotalTime.textContent = playlistAudio[numAudio].duration;

        audio.play();
        isPlay = true; 
    }; 
}

// function pauseAudio() {
//     audio.pause();
//     isPlay = false; 
//     playAudioButton.classList.remove('pause');
// }

function toggleButton() {
    playlist.children[numAudio].classList.toggle('play-item_pause');
    playAudioButton.classList.toggle('pause');
    playAudio();
}

function playNextAudio() {
    if (isPlay) {
        isPlay = false;
        playAudioButton.classList.remove('pause');
        audio.pause();

        // pauseAudio()
    };
    playlist.children[numAudio].classList.remove('item-active');
    playlist.children[numAudio].classList.remove('play-item_pause');
    numAudio = (numAudio === 3) ? 0 : numAudio  += 1;
    toggleButton();
    // playAudio()
}

function playPrevAudio() {
    if (isPlay) {
        isPlay = false;
        playAudioButton.classList.toggle('pause');
        audio.pause();

        // pauseAudio()
    };

    playlist.children[numAudio].classList.remove('item-active');
    playlist.children[numAudio].classList.remove('play-item_pause');
    numAudio  = (numAudio === 0)? 3 : numAudio  -= 1;
    toggleButton();
}

function displayPlaylist() {
    playlistAudio.forEach( function(song, index) {
        let track = document.createElement('li');
        track.classList.add('play-item');
        track.textContent =  song.name;    

        track.addEventListener('click', function() {
            selectTrack(index);
        });
        playlist.append(track);
    });
}

function selectTrack(index) {
        if ( numAudio === index) {
                toggleButton()
        } else {
            if (isPlay) {
                toggleButton()
            };
            playlist.children[numAudio].classList.remove('item-active');
            numAudio = index;
            toggleButton();
        }
}

function toggleSoundButton() {
    if (!audio.muted) {
        soundRange.value = 0;
        soundButton.classList.add('mute');
        audio.muted = true;
    } else {
        soundButton.classList.remove('mute');
        audio.muted = false;
        soundRange.value = audio.volume * 100;
    } 
}

function changeVolume() {
    if (soundRange.value === '0') toggleSoundButton()
    else {
        soundButton.classList.remove('mute');
        audio.muted = false;
        audio.volume = soundRange.value/100;
    }
}

function updateTrackRange() {
    trackDurationRange.value = audio.currentTime/audio.duration * 100;
    trackCurrentTime.textContent = countCurrentTime();
}

function countCurrentTime() {
    let sec;
    let min;

    sec = Math.floor(audio.currentTime%60);
    if (sec < 10) sec = `0${sec}`;
    min = Math.floor(audio.currentTime/60);

    return `${min}:${sec}`
}

function changeTimeline() {
    audio.currentTime = trackDurationRange.value*audio.duration/100;
}

playAudioButton.addEventListener('click', toggleButton);
nextAudioButton.addEventListener('click', playNextAudio);
prevAudioButton.addEventListener('click', playPrevAudio);

soundButton.addEventListener('click', toggleSoundButton);
soundRange.addEventListener('input', changeVolume);

audio.addEventListener('timeupdate', updateTrackRange);
trackDurationRange.addEventListener('change', changeTimeline);
audio.addEventListener('ended', playNextAudio);

window.addEventListener('load', displayPlaylist);










