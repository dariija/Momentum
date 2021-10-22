const quoteText = document.querySelector('.quote'),
      quoteAuthor = document.querySelector('.author'),
      changeQuoteButton = document.querySelector('.change-quote');

let randomNumberQuote;

async function getQuote() {
    let request = await fetch('/js/quotes.json');
    let quotes = await request.json();

    randomNumberQuote = getRandomNumber(0, quotes.length - 1);
    quoteText.textContent = `"${quotes[randomNumberQuote].text}"`;
    quoteAuthor.textContent = `${quotes[randomNumberQuote].author}`;
}

changeQuoteButton.addEventListener('click', function() {
    getQuote();
});
getQuote() 