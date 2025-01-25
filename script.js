let currentRiddle;
let attempts = 0;
const maxAttempts = 5;
let score = 0;

function fetchRiddle() {
    fetch('/riddle')
        .then(response => response.json())
        .then(data => {
            currentRiddle = data;
            document.getElementById('riddle').innerText = currentRiddle.question;
            document.getElementById('answer').value = '';
            document.getElementById('message').innerText = '';
            document.getElementById('next-button').style.display = 'none';
            document.getElementById('score').innerText = `Score: ${score}`;
            attempts = 0;
        })
        .catch(error => console.error('Error fetching riddle:', error));
}

// Function to handle answer submission
function handleAnswerSubmission() {
    const userAnswer = document.getElementById('answer').value.toLowerCase();
    if (userAnswer === currentRiddle.answer) {
        score++;
        document.getElementById('message').innerText = 'Correct! You can try the next riddle.';
        document.getElementById('next-button').style.display = 'block';
    } else {
        attempts++;
        if (attempts < maxAttempts) {
            document.getElementById('message').innerText = `Wrong! You have ${maxAttempts - attempts} attempts left.`;
        } else {
            document.getElementById('message').innerText = `Game Over! The correct answer was: ${currentRiddle.answer}`;
            document.getElementById('submit-button').disabled = true;
            document.getElementById('next-button').style.display = 'block';
        }
    }
}

// Event listener for the "Submit" button
document.getElementById('submit-button').addEventListener('click', handleAnswerSubmission);

// Event listener for the "Enter" key in the answer input
document.getElementById('answer').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission (if within a form)
        handleAnswerSubmission(); // Call the function to handle answer submission
    }
});

// Event listener for the "Next Riddle" button
document.getElementById('next-button').addEventListener('click', () => {
    fetchRiddle();
    document.getElementById('submit-button').disabled = false;
});

// Fetch the first riddle when the page loads
fetchRiddle();
