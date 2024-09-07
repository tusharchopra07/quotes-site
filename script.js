const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const refreshButton = document.getElementById("refreshButton");

async function fetchQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const quoteData = await response.json();
        return quoteData;
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = "Failed to fetch quote.";
        authorElement.textContent = "";
    }
}

function displayQuote(quote) {
    quoteElement.textContent = `"${quote.content}"`;
    authorElement.textContent = `— ${quote.author}`;
    
    // Add animation when quote changes
    const quoteContainer = document.querySelector('.quote-container');
    quoteContainer.style.animation = 'none';
    void quoteContainer.offsetWidth; // Trigger reflow
    quoteContainer.style.animation = null;
}

function getRandomPalette() {
    const palettes = [
        'palette1', 'palette2', 'palette3', 'palette4', 'palette5',
        'palette6', 'palette7', 'palette8', 'palette9', 'palette10',
        'palette11', 'palette12', 'palette13', 'palette14', 'palette15',
        'palette16', 'palette17', 'palette18', 'palette19', 'palette20'
    ];
    const randomIndex = Math.floor(Math.random() * palettes.length);
    return palettes[randomIndex];
}

function applyPalette(palette) {
    document.body.classList.remove('palette1', 'palette2', 'palette3', 'palette4', 'palette5',
        'palette6', 'palette7', 'palette8', 'palette9', 'palette10',
        'palette11', 'palette12', 'palette13', 'palette14', 'palette15',
        'palette16', 'palette17', 'palette18', 'palette19', 'palette20');
    document.body.classList.add(palette);
}

async function refreshQuote() {
    const palette = getRandomPalette();
    applyPalette(palette);
    
    const quote = await fetchQuote();
    if (quote) {
        displayQuote(quote);
    }
}

// Initial palette selection and quote display
refreshQuote();

// Refresh button click event
refreshButton.addEventListener('click', refreshQuote);