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
      languagesSectionText = document.querySelector('.language-section > .settings-section__content > .settings-section__text');      
    
const generalSectionWidgets = document.querySelectorAll('.general-section > .settings-section__content > .settings-item > span'),
      photosSectionSelect = document.querySelectorAll('.photos-section > .settings-section__content > .settings-item > span'),
      languagesSectionSelect = document.querySelectorAll('.language-section > .settings-section__content > .settings-item > span');

const choiceLanguages = document.querySelectorAll('input[type="radio"][name="language"]'),
      choicePhotoSource = document.querySelectorAll('input[type="radio"][name="photo-src"]'),
      checkboxes = document.querySelectorAll('input[type="checkbox"]'),
      photoTags = document.querySelector('.tag');

let state = {
    language: 'en',
    photoSource: 'github',
    tags: '',
    widgets: {
        time: document.querySelector('.time'),
        date: document.querySelector('.date'),
        greeting: document.querySelector('.greeting-container'),
        quotes: document.querySelector('.quote-container'),
        weather: document.querySelector('.weather'),
        player: document.querySelector('.player-container'),
    },
};

choiceLanguages.forEach(function(input) {
    input.addEventListener('change', () => changeLanguage(input.value))
});

choicePhotoSource.forEach( function(input) {
    input.addEventListener('change', () => changePhotoSource(input.value))
});

checkboxes.forEach( function(checkbox) {
    checkbox.addEventListener('change', () => showWidget(checkbox.name))
});

photoTags.addEventListener('change', () => changeBackgroundTag(photoTags.value))

function showWidget(widgetName) {
    state.widgets[`${widgetName}`].classList.toggle('fadeIn');
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
                    widgets: ['Время', 'Дата', 'Приветствие', 'Цитаты', 'Погода', 'Аудиоплеер']
                },
                photos: {
                    header: ['Фотографии', 'Настройте свой фон'],
                    text: 'Выберите источник фотографий:',
                    select: ['Github', 'Unsplash', 'Flickr']
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
                    widgets: ['Time', 'Date', 'Greeting', 'Quotes', 'Weather', 'Audio Player']
                },
                photos: {
                    header: ['Photos', 'Customize your background'],
                    text: 'Select photo source:',
                    select: ['Github', 'Unsplash', 'Flickr']
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

    languagesSectionSelect.forEach( function(widget, index) {
        widget.textContent = menuTranslation[lang].section.language.select[index];
    });
}

