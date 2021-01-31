// console.log('testing');
// log certain data that we can then see from the javascript in the browser
// Get Quote From API
// Asyncrhonous

// function to be declared
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    // design for errors
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
    }catch (error) {
        getQuote();
        console.log('Whoops, No Quote!', error);
    }
}

// On Load
getQuote();