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

navGeneralSection.addEventListener('click', function() {
    showSettingsMenuSection(generalSection)
});
navPhotosSection.addEventListener('click', function() {
    showSettingsMenuSection(photosSection)
});
navLanguageSection.addEventListener('click', function() {
    showSettingsMenuSection(languageSection)
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
