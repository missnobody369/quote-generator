// console.log('testing');
// log certain data that we can then see from the javascript in the browser
// Get Quote From API
// Asyncrhonous

const quoteContainer = document.getElementById('quote-container'); //container in html
const quoteText = document.getElementById('quote'); //id quote html
const authorText = document.getElementById('author'); //id author html
const twitterBtn = document.getElementById('twitter'); //id twitter html
const newQuoteBtn = document.getElementById('new-quote'); //id getting new quote html
// for loader
const loader = document.getElementById('loader');
//show loading
function loading() {
    loader.hidden = false; //show loader
    quoteContainer.hidden = true; //hide quote container
}
//hide loader and bring back container
function complete() {
    if(! loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// function to be declared
// get quote from API
async function getQuote() {
    loading(); //start loading quote
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    // design for errors
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // console.log(data); testing view error
        // passing data to the elements

        //if author is unknown
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
            //if there is an author
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //fix long quote issue (reduce font size long quotes) *120 character in the quote
        if(data.quoteText.length  > 120 ) {
            quoteText.classList.add('long-quote');
            //if the quote length is less
        }else{
            quoteText.classList.remove('long-quote');
        }
        //data we get from the api
        quoteText.innerText = data.quoteText;
        //stop loader, show quote
        complete();
    }catch (error) {
        getQuote();
        // console.log('Whoops, No Quote!', error); testing view error
    }
}

//twitter button function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author=  authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author};`
    //opening in a new tab
    window.open(twitterUrl, '_blank');
}

//event listeners - button elements
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
