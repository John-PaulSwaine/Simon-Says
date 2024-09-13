let sequence = [];       // Stores the computer's sequence
let playerSequence = [];  // Stores the player's sequence
let level = 0;            // Tracks the game level
let buttons = ["btn1", "btn2", "btn3", "btn4"]; // Button IDs
let playerTurn = false;   // Tracks if it's the player's turn
let lives = 3;            // Player starts with 3 lives

// Start game logic
document.getElementById("start-button").addEventListener("click", () => startGame());

const startGame = () => {
    sequence = [];
    playerSequence = [];
    level = 0;
    lives = 3; // Reset lives at the start of the game
    document.getElementById("status").textContent = `Lives: ${lives}`;
    playerTurn = false;
    nextRound();
};

const nextRound = () => {
    playerTurn = false;  // Disable player input while showing sequence
    playerSequence = [];
    level++;
    document.getElementById("status").textContent = `Level ${level} | Lives: ${lives}`;

    // Add a new random button to the sequence
    let randomButton = buttons[Math.floor(Math.random() * buttons.length)];
    sequence.push(randomButton);

    // Show the sequence to the player
    showSequence();
};

const showSequence = () => {
    let i = 0;
    const interval = setInterval(() => {
        flashButton(sequence[i]); // Flash each button in sequence
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                playerTurn = true;  // Enable player input after sequence is shown
            }, 500); // Small delay to ensure the last button finishes flashing
        }
    }, 1000); // Adjust this timing for button flashing speed
};

// Function to flash a button
const flashButton = (buttonId) => {
    const button = document.getElementById(buttonId);
    button.classList.add("active");
    setTimeout(() => {
        button.classList.remove("active");
    }, 500); // Button stays highlighted for 500ms
};

// Player clicks a button
buttons.forEach(buttonId => {
    document.getElementById(buttonId).addEventListener("click", (e) => {
        if (!playerTurn) return;  // Ignore clicks when it's not the player's turn

        const chosenButton = e.target.id;
        playerSequence.push(chosenButton);
        flashButton(chosenButton);

        // Check if the player's sequence is correct
        checkPlayerMove(playerSequence.length - 1);
    });
});

const checkPlayerMove = (index) => {
    if (playerSequence[index] !== sequence[index]) {
        // Player made a mistake, lose a life
        lives--;
        document.getElementById("status").textContent = `Incorrect! Lives: ${lives}`;
        
        if (lives <= 0) {
            // If no lives left, game over
            document.getElementById("status").textContent = "Game Over! Press Start to try again.";
            playerTurn = false;
            return;
        }
        return;
    }

    if (playerSequence.length === sequence.length) {
        // Player completed the sequence, move to the next round
        setTimeout(() => nextRound(), 1000);
    }
};
