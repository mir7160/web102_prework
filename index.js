/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Get the "games-container" element
    const gamesContainer = document.getElementById("games-container");

    // Loop through each game in the array
    for (const game of games) {
        // Create HTML elements for each game
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card"); // Add the "game-card" class

        const gameTitle = document.createElement("h3");
        gameTitle.textContent = game.name;

        const gameDescription = document.createElement("p");
        gameDescription.textContent = game.description;

        // Include the game's image and other attributes using a template literal
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers}</p>
        `;

        // Append the game card to the "games-container"
        gamesContainer.appendChild(gameCard);
    }
}

// Assuming GAMES_JSON is already defined

// Call the function to add all games to the page
addGamesToPage(GAMES_JSON);


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;


// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
// Locate the raisedCard variable
const raisedCard = document.getElementById("total-raised");

// Use reduce to calculate the total amount pledged
const totalPledged = GAMES_JSON.reduce((accumulator, game) => {
  return accumulator + game.pledged;
}, 0);

// Update the raisedCard inner HTML to display the total amount with a dollar sign
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;


// set inner HTML using template literal


// grab number of games card and set its inner HTML
// Locate the gamesCard variable
const gamesCard = document.getElementById("num-games");

// Get the total number of games
const totalGames = GAMES_JSON.length;

// Update the gamesCard inner HTML to display the total number of games
gamesCard.innerHTML = totalGames;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}


    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM



// show only games that are fully funded
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}


// show all games
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesText = `We have ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'unfunded game' : 'unfunded games'}.`;

// create a new DOM element containing the template string and append it to the description container
const fundraisingInfo = `We have raised a total of $${totalPledged.toLocaleString()} across ${totalGames} games. Currently, ${unfundedGamesCount === 0 ? 'all games are funded.' : `there ${unfundedGamesCount === 1 ? 'is' : 'are'} ${unfundedGamesCount} unfunded game${unfundedGamesCount === 1 ? '' : 's'}.`}`;

// create a new DOM element containing the template string and append it to the description container
const fundraisingInfoElement = document.createElement("p");
fundraisingInfoElement.textContent = fundraisingInfo;
fundraisingInfoElement.classList.add("highlight-text"); 
descriptionContainer.appendChild(fundraisingInfoElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame, ...restGames] = sortedGames;

// Create a new element to hold the name of the top pledge game
const topGameElement = document.createElement("p");
topGameElement.textContent = `Top Game: ${topGame.name}`;

// Append the top game element to the firstGameContainer
firstGameContainer.appendChild(topGameElement);

// Create a new element to hold the name of the second pledge game
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `Second Game: ${secondGame.name}`;

// Append the second game element to the secondGameContainer
secondGameContainer.appendChild(secondGameElement);

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item