
// Initialize variables for storing the player's names 
let player1;
let player2;

// Session storage is an object that allows you to store values in the browser's cache so that it saved when the page reloads

// Create variables to store wins to place in session storage, if a value doesn't exist set it to 0
let player1Wins = parseInt(sessionStorage.getItem("player1Wins")) || 0;
let player2Wins = parseInt(sessionStorage.getItem("player2Wins")) || 0;

// Retrive the players wins from session storage
document.getElementById("score").innerText = `Player 1: ${player1Wins} wins, Player 2: ${player2Wins} wins.`;

// When the rescore button is clicked
document.getElementById("rescore").addEventListener("click", () => {

    // Set wins back to 0
    player1Wins = 0;
    player2Wins = 0;

    // Set the wins to 0 in the session storage
    sessionStorage.setItem("player1Wins", "0");
    sessionStorage.setItem("player2Wins", "0"); 
    
    // Change the text of the scores back to 0
    document.getElementById("score").innerText = `Player 1: ${player1Wins} wins, Player 2: ${player2Wins} wins.`;


    alert("Score reset successfully!"); // Alert success message
});

// Initialize a function called rgb
function rgb() {

    // Get 3 random numbers from 0-255 and return them inside rgb format
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

// Initialize a function to randomize the color of the title
function titleColor() {
    const title = document.getElementById("title"); // Select the element with an id of title from the DOM

    /*
     * Split each letter in the title into an array between each character
     * (i.e. "title" becomes ["t", "i", "t", "l", "e"])
     */
    const letters = title.innerText.split("");

    // For each item in letters
    // In for i of array, i = array[i]. In for i in array, i = an index
    for (i in letters) {

        // Change each letter to an HTML <span> tag with a color randomized by the rgb function, with it's text content retained
        letters[i] = `<span style="color: ${rgb()};">${letters[i]}</span>`;
    };

    /*
     * Join each item in the array back into a string separated by nothing
     * (i.e. ["t", "i", "t", "l", "e"] becomes "title")
     */
    title.innerHTML = letters.join(""); // Set the joined string as the HTML content of the title
};
titleColor(); // Randomize the color of the title

// Initialize a function to change the background colors of the start button and footer
function varColor() {
    const variables = document.querySelector(":root"); // Select the place where our variables are in CSS

    variables.style.setProperty("--bg-color", rgb()); // Change the --bg-color variable in CSS to a randomized rgb value
    variables.style.setProperty("--text-color", rgb()); // Change the --text-color variable in CSS to a randomized rgb value
    variables.style.setProperty("--hover-color", rgb()); // Change the --hover-color variable in CSS to a randomized rgb value
}
varColor(); // Randomize the value that the CSS variables hold (rgb colors)

function start() {
    document.querySelector("main").innerHTML = ""; // Empty the HTML content of <main>

    const greetingContainer = document.createElement("div"); // Create a <div> element
    greetingContainer.classList.add("greeting-container"); // Give it a class of "greeting-container"

    const greeting = document.createElement("h2"); // Create a <p> element
    greeting.setAttribute("id", "greeting"); // Give it an id of "greeting"
    greeting.innerText = `Hello, ${playerName}! Please select rock, paper, or scissors to proceed.`; // Write out a welcome message inside

    greetingContainer.appendChild(greeting); // Add the greeting to the container
    document.querySelector("main").appendChild(greetingContainer); // Add the container inside <main>

    // Make 3 img elements for each image
    const rockImg = document.createElement("img");
    const paperImg = document.createElement("img");
    const scissorsImg = document.createElement("img");

    const images = [rockImg, paperImg, scissorsImg]; // An array containing the images for rock, paper, and scissors

    // Set the image file paths for each item
    rockImg.src = "/assets/rock.png";
    paperImg.src = "/assets/paper.png";
    scissorsImg.src = "/assets/scissors.png";

    const container = document.createElement("div"); // Create a <div> element
    container.classList.add("container"); // Give it a class of "container"

    for (let i = 0; i < images.length; i++) {
        container.appendChild(images[i]); // Add each image to the container
        images[i].classList.add("choice-image"); // Give all of them a class of "choice-image"

        // When each image is clicked, invoke the userSelect1 function
        images[i].addEventListener("click", () => {
            userSelect1(i); // Call the userSelect1 function with the value of the selected index passed to it
        });
    };

    document.querySelector("main").appendChild(container); // Add the container to <main>
};

// Function to check if name inputs are empty
function checkNames() {

    // A function to check if a value is empty
    const isEmpty = str => {

        // If value is null, undefined, or empty after removing whitespace return true
        return str === null || str === undefined || str.trim() === "";
    };

    // If the value of either input is empty
    if (isEmpty(document.getElementById("player1").value.toString()) || isEmpty(document.getElementById("player2").value.toString())) {
        return false; // Return false

        // If else (both names are inputted)
    } else {

        // Set the values of playerName and playerName2, being the inputted values
        playerName = document.getElementById("player1").value.toString();
        playerName2 = document.getElementById("player2").value.toString();

        return true; // Return true
    };
};

// Function to correspond numbers to selections
function checkPick(value) {

    // If value is 0 return rock
    if (parseInt(value) === 0) return "rock";

    // If value is 1 return paper
    else if (parseInt(value) === 1) return "paper";

    // If value is 2 return scissors
    else if (parseInt(value) === 2) return "scissors";

    // If else return the value for error checking
    else return value;
};

function userSelect1(selection) {

    player1 = selection; // Replace the player1 variable with the value of the selection

    // Replace the <main> tag's HTML content with a success screen
    document.querySelector("main").innerHTML = `
    <h1 id="selection">You picked ${checkPick(player1)}! Time for ${playerName2}'s turn!</h1>
    `;

    // Set a time to wait before calling a function
    setTimeout(() => {
        document.querySelector("main").innerHTML = ""; // Empty the HTML content of <main>
        userSelect2(); // Call the userSelect2 function
    }, 1500); // Invoke the userSelect2 function after 1.5 seconds (1500 milliseconds)


    return player1; // Return the result of player1
};

// Initialize a function for taking the input of the second player
function userSelect2() {

    // THIS SECTION IS JUST THE START FUNCTION WITH SOME TWEAKS TO MAKE THE SAME DISPLAY POP UP FOR THE SECOND USER
    const greetingContainer = document.createElement("div"); // Create a <div> element
    greetingContainer.classList.add("greeting-container"); // Give it a class of "greeting-container"

    const greeting = document.createElement("h2"); // Create a <p> element
    greeting.setAttribute("id", "greeting"); // Give it an id of "greeting"
    greeting.innerText = `Your turn, ${playerName2}! Please select rock, paper, or scissors to proceed.`; // Write out a welcome message inside

    greetingContainer.appendChild(greeting); // Add the greeting to the container
    document.querySelector("main").appendChild(greetingContainer); // Add the container inside <main>


    // Make 3 img elements for each image
    const rockImg = document.createElement("img");
    const paperImg = document.createElement("img");
    const scissorsImg = document.createElement("img");

    // Set the image file paths for each item
    rockImg.src = "/assets/rock.png";
    paperImg.src = "/assets/paper.png";
    scissorsImg.src = "/assets/scissors.png";

    const images = [rockImg, paperImg, scissorsImg]; // An array containing the images for rock, paper, and scissors

    const container = document.createElement("div"); // Create a <div> element
    container.classList.add("container"); // Give it a class of "container"

    // For each item in the images array
    for (let i = 0; i < images.length; i++) {
        container.appendChild(images[i]); // Add the selected image to the container
        images[i].classList.add("choice-image"); // Give the selected image a class of "choice-image"

        // When each image is clicked
        images[i].addEventListener("click", () => {
            player2 = i; // Set player2 to i (the selected index)

            // Replace the <main> tag's HTML content with a success screen
            document.querySelector("main").innerHTML = `
            <h1 id="selection">You picked ${checkPick(player2)}! Let's see who won!</h1>
            `;

            // Set a time to wait before calling a function
            setTimeout(() => {
                document.querySelector("main").innerHTML = ""; // Empty the HTML content of <main>
                compare(); // Call the userSelect2 function
            }, 1500); // Invoke the userSelect2 function after 1.5 seconds (1500 milliseconds)

        });
    };

    document.querySelector("main").appendChild(container); // Add the container to <main>

    return player2; // Return the result of player2
};

// Function to compare the two values
function compare() {
    let num = player1 - player2; // Let the result be player1's selection minus player2's
    let win; // Initialize a variable to track wins

    // If num is -1 (rock - paper, paper - scissors) or -2 (scissors - rock)
    if (num === -1 || num === 2) {
        win = false; // You lose!

    // If num 1 (scissors - paper, paper - rock) or -2 (rock - scissors)
    } else if (num === -2 || num === 1) {
        win = true; // You win!

    // If else (tie, num === 0)
    } else {
        win = 0; // Set win to 0, representing a tie
    };

    const restartButton = document.createElement("button"); // Create a restart button
    restartButton.innerText = "Restart"; // Add text inside the button
    restartButton.setAttribute("id", "restart"); // Give the button an id of "restart"

    // When the restart button is clicked
    restartButton.addEventListener("click", () => {
        location.reload(); // Reload the page
    });
    
    // If win is true
    if (win) {
        player1Wins++; // Increase player 1's wins by 1
        sessionStorage.setItem("player1Wins", `${player1Wins}`); // Save wins to session storage

        // Set the HTML content of <main>
        document.querySelector("main").innerHTML = `
        <div class="result">
            <h1>${playerName} wins!</h1>
            <p>${playerName} picked ${checkPick(player1)}, ${playerName2} picked ${checkPick(player2)}!</p>
            <p id="score">Player 1: ${player1Wins} wins, Player 2: ${player2Wins}</p>
        </div>
        `;

    // If win is false (and not 0, because 0 represents a tie)
    } else if (!win && win !== 0) {
        player2Wins++; // Increase player 2's wins by 1
        sessionStorage.setItem("player2Wins", `${player2Wins}`); // Save wins to session storage

        // Set the HTML content of <main>
        document.querySelector("main").innerHTML = `
        <div class="result">
            <h1>${playerName2} wins!</h1>
            <p>${playerName} picked ${checkPick(player1)}, ${playerName2} picked ${checkPick(player2)}.</p>
            <p id="score">Player 1: ${player1Wins} wins, Player 2: ${player2Wins}</p>
        </div>
        `;

    // If else
    } else {
        // Set the HTML content of <main>
        document.querySelector("main").innerHTML = `
        <div class="result">
            <h1>It's a tie!</h1>
            <p>You both picked ${checkPick(num)}!</p>
            <p id="score">Player 1: ${player1Wins} wins, Player 2: ${player2Wins}</p>
        </div>
        `;
    };
    
    document.querySelector(".result").appendChild(restartButton); // Add the restart button to the ending screen
    return win; // Return the value of win
};

// When the start button is clicked
document.getElementById("start").addEventListener("click", () => {

    // If checkNames() returns true
    checkNames() ?
        start() : // Call the start function, if else
        alert("Both players need to input their names to begin."); // Give an error message
});