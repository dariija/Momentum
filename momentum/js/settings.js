// ~~~~~~~~~~~~~~~ Settings Menu

const settingsMenuButton = document.querySelector('.settings-button'),
      settingsMenu = document.querySelector('.settings-menu');

const navGeneralSection = document.querySelector('.navigation__general-section'),
      navPhotosSection = document.querySelector('.navigation__photos-section'),
      navLanguageSection = document.querySelector('.navigation__language-section');

const generalSection = document.querySelector('.general-section'),
      photosSection = document.querySelector('.photos-section'),
      languageSection = document.querySelector('.language-section');

let currentSettingsSection = document.querySelector('.active-section');  

function showSettingsMenu() {
    settingsMenu.classList.toggle('fadeIn')
}

function showSettingsMenuSection(section) {
    currentSettingsSection.classList.remove('active-section');
    currentSettingsSection = section;
    currentSettingsSection.classList.add('active-section');
}

settingsMenuButton.addEventListener('click', showSettingsMenu);

navGeneralSection.addEventListener('click', () => showSettingsMenuSection(generalSection));
navPhotosSection.addEventListener('click', () => showSettingsMenuSection(photosSection));
navLanguageSection.addEventListener('click', () => showSettingsMenuSection(languageSection));


// ~~~~~~~~~~~~~~~ Settings Menu Functionality

const settingsMenuNavItems = document.querySelectorAll('.navigation__item');
      
const generalSectionHeader = document.querySelector('.general-section > .settings-section__header').children,
      photosSectionHeader = document.querySelector('.photos-section > .settings-section__header').children,
      languagesSectionHeader = document.querySelector('.language-section > .settings-section__header').children;

const generalSectionText = document.querySelector('.general-section > .settings-section__content > .settings-section__text'),
      photosSectionText = document.querySelector('.photos-section > .settings-section__content > .settings-section__text'),
      languagesSectionText = document.querySelector('.language-section > .settings-section__content > .settings-section__text'),
      photosSectionTag = document.querySelector('.find-tag');    
    
const generalSectionWidgets = document.querySelectorAll('.general-section > .settings-section__content > .settings-item > span'),
      photosSectionSelect = document.querySelectorAll('.photos-section > .settings-section__content > .settings-item > span'),
      languagesSectionSelect = document.querySelectorAll('.language-section > .settings-section__content > .settings-item > span');

const choiceLanguages = document.querySelectorAll('input[type="radio"][name="language"]'),
      choicePhotoSource = document.querySelectorAll('input[type="radio"][name="photo-src"]'),
      checkboxes = document.querySelectorAll('input[type="checkbox"]'),
      photoTags = document.querySelector('.tag');


const timeWidget = document.querySelector('.time'),
      dateWidget = document.querySelector('.date'),
      greetingWidget = document.querySelector('.greeting-container'),
      quoteWidget = document.querySelector('.quote-container'),
      weatherWidget =document.querySelector('.weather'),
      playerWidget  = document.querySelector('.player-container'),
      todoWidget = document.querySelector('.todo-container');

let widgets = [timeWidget, dateWidget, greetingWidget, quoteWidget, weatherWidget, playerWidget, todoWidget];

let state = {
    language: 'en',
    photoSource: 'github',
    tags: '',
    widgets: ['time', 'date', 'greeting', 'quotes',' weather', 'player']
};

setData();

//-----
choiceLanguages.forEach(function(choice) {
    choice.addEventListener('change', () => {
        localStorage.setItem(`${choice.name}`, choice.value);
    })
});

choicePhotoSource.forEach( function(choice) {
    choice.addEventListener('change', () => {
        localStorage.setItem(`${choice.name}`, choice.value);
    })
});

//-----

function setData() {
    choiceLanguages.forEach( function(choice) {
        if (choice.value === localStorage.getItem(`${choice.name}`)) {
            choice.checked = true;
            state.language = localStorage.getItem(`${choice.name}`);
            translateMenu(state.language);
        }
    });

    choicePhotoSource.forEach( function(choice) {
        if (choice.value === localStorage.getItem(`${choice.name}`)) {
            choice.checked = true;
            state.photoSource = localStorage.getItem(`${choice.name}`);
        }
    });
};

//------

choiceLanguages.forEach(function(input) {
    input.addEventListener('change', () => {
        changeLanguage(input.value);
    })
});

choicePhotoSource.forEach( function(input) {
    input.addEventListener('change', () => changePhotoSource(input.value))
});

photoTags.addEventListener('change', () => changeBackgroundTag(photoTags.value));


checkboxes.forEach( function(checkbox, index) {
    checkbox.addEventListener('change', () => showWidget(checkbox.name, index))
});

function showWidget(widgetName, index) {
    widgets[index].classList.toggle('fadeIn');
}

function changeLanguage(lang) {
    state.language = lang;

    translateMenu(lang);
    greetingTranslate(lang);
    // showGreeting(lang);
    showDate(lang);
    getWeather(lang);
    getQuote(lang);
}

function changePhotoSource(source) {
    state.photoSource = source;
    setBg(source, state.tags);
}

function changeBackgroundTag(tags) {
    state.tags = tags;
    setBg(state.photoSource)
}

function translateMenu(lang) {
    let menuTranslation = {
        ru : {
            nav: ['Общие', 'Фотографии', 'Язык'],
            section: {
                general: {
                    header: ['Общие', 'Настройте свою панель управления'],
                    text: 'Показать:',
                    widgets: ['Время', 'Дата', 'Приветствие', 'Цитаты', 'Погода', 'Аудиоплеер', 'Список дел']
                },
                photos: {
                    header: ['Фотографии', 'Настройте свой фон'],
                    text: 'Выберите источник фотографий:',
                    select: ['Github', 'Unsplash', 'Flickr'],
                    tag: 'Найти по тегу:'
                },
                language: {
                    header: ['Язык', 'Изменить язык приложения'],
                    text: 'Выберите язык:',
                    select: ['Английский', 'Русский']
                },
            },
        },
    
        en : {
            nav: ['General', 'Photos', 'Language'],
            section: {
                general: {
                    header: ['General', 'Customize your dashboard'],
                    text: 'Show:',
                    widgets: ['Time', 'Date', 'Greeting', 'Quotes', 'Weather', 'Audio Player', 'Todo-list']
                },
                photos: {
                    header: ['Photos', 'Customize your background'],
                    text: 'Select photo source:',
                    select: ['Github', 'Unsplash', 'Flickr'],
                    tag: 'Find by tag:'
                },
                language: {
                    header: ['Language', 'Change application language'],
                    text: 'Select language:',
                    select: ['English', 'Russian']
                },
            },
        },
    };

    settingsMenuNavItems.forEach( function(navItem, index) {
        navItem.textContent = menuTranslation[lang].nav[index];
    });

    [...generalSectionHeader].forEach( function(text, index) {
        text.textContent = menuTranslation[lang].section.general.header[index];
    });

    [...photosSectionHeader].forEach( function(text, index) {
        text.textContent = menuTranslation[lang].section.photos.header[index];
    });

    [...languagesSectionHeader].forEach( function(text, index) {
        text.textContent = menuTranslation[lang].section.language.header[index];
    });

    generalSectionText.textContent = menuTranslation[lang].section.general.text;
    photosSectionText.textContent = menuTranslation[lang].section.photos.text;
    languagesSectionText.textContent = menuTranslation[lang].section.language.text;

    generalSectionWidgets.forEach( function(widget, index) {
        widget.textContent = menuTranslation[lang].section.general.widgets[index];
    });

    photosSectionSelect.forEach( function(widget, index) {
        widget.textContent = menuTranslation[lang].section.photos.select[index];
    });

    photosSectionTag.textContent = menuTranslation[lang].section.photos.tag;

    languagesSectionSelect.forEach( function(widget, index) {
        widget.textContent = menuTranslation[lang].section.language.select[index];
    });
}
