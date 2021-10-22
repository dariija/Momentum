const body = document.querySelector('body'),
      nextSlide = document.querySelector('.slide-next'),
      prevSlide = document.querySelector('.slide-prev');

let randomNumber;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function setBg() {
    let timeOfDay = getTimeOfDay();
    if (!randomNumber) {
        randomNumber = getRandomNumber(1, 20);
    }
    let bgNum = (randomNumber > 10)? randomNumber : randomNumber.toString().padStart(2,0);

    let image = new Image();
    image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;

    image.onload = function() {
        body.style.backgroundImage = `url(${image.src})`;
    }
}

function getNextSlide() {
    (randomNumber === 20)? randomNumber = 1 : randomNumber += 1;
    setBg()
}

function getPrevSlide() {
    (randomNumber === 1)? randomNumber = 20 : randomNumber -= 1;
    setBg()
}

nextSlide.addEventListener('click', function(event) {
    getNextSlide()
});
prevSlide.addEventListener('click', function(event) {
    getPrevSlide()
});
setBg();