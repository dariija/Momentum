const body = document.querySelector('body'),
      nextSlide = document.querySelector('.slide-next'),
      prevSlide = document.querySelector('.slide-prev');

let randomNumber;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function setBg(source) {
    let timeOfDay = getTimeOfDay();
    if (!randomNumber) {
        randomNumber = getRandomNumber(1, 20);
    }

    if (source === 'github') {
        let bgNum = (randomNumber > 10)? randomNumber : randomNumber.toString().padStart(2,0);
        let image = new Image();
        image.src =  `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;

        image.onload = function() {
            body.style.backgroundImage = `url(${image.src})`;
        }
    } else {
        let tags = state.tags || `${timeOfDay},nature`;
        getLinkToImage(source, tags);
    };
}

async function getLinkToImage(source, tags) {
    let image = new Image();

    if (source === 'unsplash') {
        let url = `https://api.unsplash.com/photos/random?query=${tags}&orientation=landscape&client_id=G5WgmQtEww9ejIDqpr6BIb1riiF49GYvnsgIOR4w_hc`;
        let request = await fetch(url);
        let photo = await request.json();
        image.src = photo.urls.regular;
        image.onload = function() {
            body.style.background = `url(${image.src}) 50% 50% / cover no-repeat`;
        }

    } else if (source === 'flickr') {
        let randomNumber =  getRandomNumber(0, 99);
        let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=${tags}&format=json&nojsoncallback=1&extras=url_h&api_key=8f01f3413a78d4a7610f2658f8c63480`;
        let request = await fetch(url);
        let photo = await request.json();
        image.src = photo.photos.photo[randomNumber].url_h;
        image.onload = function() {
            body.style.background = `url(${image.src}) 50% 50% / cover no-repeat`;
        }
    }
}

function getNextSlide() {
    if(state.photoSource === 'github')  {
        (randomNumber === 20)? randomNumber = 1 : randomNumber += 1;
    };
    setBg(state.photoSource)
}

function getPrevSlide() {
    if(state.photoSource === 'github')  {
        (randomNumber === 1)? randomNumber = 20 : randomNumber -= 1;
    };
    setBg(state.photoSource, )
}

nextSlide.addEventListener('click', function(event) {
    getNextSlide()
});
prevSlide.addEventListener('click', function(event) {
    getPrevSlide()
});

setBg(state.photoSource, state.tags);
