const quoteText = document.querySelector('.quote'),
      quoteAuthor = document.querySelector('.author'),
      changeQuoteButton = document.querySelector('.change-quote');

let randomNumberQuote;

async function getQuote(lang) {
    let request = await fetch(`./js/quotes-${lang}.json`);
    let quotes = await request.json();

    randomNumberQuote = getRandomNumber(0, quotes.length - 1);
    quoteText.textContent = `"${quotes[randomNumberQuote].text}"`;
    quoteAuthor.textContent = `${quotes[randomNumberQuote].author}`;
}

changeQuoteButton.addEventListener('click', function() {
    getQuote(state.language);
});

getQuote(state.language) ;


// ?????? ------------------------------------
// function translateQuotes(lang) {
//     getQuote(lang);
// }