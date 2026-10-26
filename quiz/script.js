let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let playerName = "";

function playCorrectSound() {
    const correctSound = document.getElementById("correct-sound");
    correctSound.play();
}

function playWrongSound() {
    const wrongSound = document.getElementById("wrong-sound");
    wrongSound.play();
}

const questions = [
    { 
        question: "Wat is het studentenreisproduct?", 
        options: ["Gratis reizen in Nederland", "Kortingskaart voor het openbaar vervoer", "Abonnement voor de trein", "Maandabonnement voor studenten"],
        correct: "B",
        explanation: "Het studentenreisproduct is een kortingskaart waarmee studenten gratis of met korting kunnen reizen in het openbaar vervoer."
    },
    { 
        question: "Wie kan het studentenreisproduct aanvragen?", 
        options: ["Iedereen", "Alleen studenten die recht hebben op studiefinanciering", "Alleen hbo- en wo-studenten", "Alleen mbo-studenten"],
        correct: "B",
        explanation: "Het studentenreisproduct kan alleen door studenten worden aangevraagd die recht hebben op studiefinanciering."
    },
    { 
        question: "Waar kun je het studentenreisproduct aanvragen?", 
        options: ["Bij de gemeente", "Op de website van DUO", "In de supermarkt", "Bij je universiteit"],
        correct: "B",
        explanation: "Je kunt het studentenreisproduct aanvragen via de website van DUO."
    },
    { 
        question: "Tot wanneer kun je je studentenreisproduct gebruiken?", 
        options: ["Tot je 30 bent", "Tot je afstudeert", "Tot je 27 jaar bent", "Tot je 25 bent"],
        correct: "B",
        explanation: "Het studentenreisproduct is geldig tot je afstudeert of tot je geen recht meer hebt op studiefinanciering."
    },
    { 
        question: "Wat gebeurt er als je het studentenreisproduct niet op tijd stopzet?", 
        options: ["Je krijgt een boete", "Je mag niet meer reizen", "Je krijgt extra studiefinanciering", "Niets"],
        correct: "A",
        explanation: "Als je het studentenreisproduct niet stopzet op tijd, kun je een boete krijgen."
    },
    { 
        question: "Wat moet je doen als je het studentenreisproduct verliest?", 
        options: ["Nieuwe aanvragen via je school", "Nieuwe aanvragen via DUO", "Nieuwe aanvragen via de gemeente", "Je kunt het niet vervangen"],
        correct: "B",
        explanation: "Als je je studentenreisproduct verliest, kun je een nieuwe aanvragen via de DUO-website."
    },
    { 
        question: "Kan je het studentenreisproduct in het buitenland gebruiken?", 
        options: ["Ja, overal in Europa", "Ja, in sommige landen", "Nee, alleen in Nederland", "Ja, wereldwijd"],
        correct: "B",
        explanation: "Je kunt het studentenreisproduct gebruiken in bepaalde Europese landen, maar niet wereldwijd."
    },
    { 
        question: "Hoeveel mag je reizen met het studentenreisproduct per week?", 
        options: ["Onbeperkt", "5 dagen per week", "Het is afhankelijk van je studiefinanciering", "2 dagen per week"],
        correct: "A",
        explanation: "Met het studentenreisproduct kun je onbeperkt reizen tijdens de periode waarin je recht hebt op het product."
    },
    { 
        question: "Wat gebeurt er als je niet genoeg studiepunten haalt tijdens je studie?", 
        options: ["Je krijgt geen korting op je OV-chipkaart", "Je mag niet meer reizen", "Je krijgt een boete", "Je moet je studentenreisproduct stopzetten"],
        correct: "D",
        explanation: "Als je niet genoeg studiepunten haalt, kan het zijn dat je je studentenreisproduct moet stopzetten."
    },
    { 
        question: "Wie regelt de verstrekking van het studentenreisproduct?", 
        options: ["De gemeente", "DUO", "NS", "Het ministerie van Onderwijs"],
        correct: "B",
        explanation: "De verstrekking van het studentenreisproduct wordt geregeld door DUO, de Dienst Uitvoering Onderwijs."
    }
];


// Start de quiz
function startQuiz() {
    const nameInput = document.getElementById("player-name");
    if (!nameInput.value.trim()) {
        alert("Voer eerst je naam in!");
        return;
    }
    
    playerName = nameInput.value.trim();
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    
    document.getElementById("background-music").play(); 

    loadQuestion();
    timer = setInterval(updateTimer, 1000);
}

// Laadt de vraag
function loadQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("question-number").textContent = currentQuestion + 1;
        document.getElementById("question-text").textContent = questions[currentQuestion].question;

        let options = questions[currentQuestion].options;

        document.getElementById("optionA").textContent = `A) ${options[0]}`;
        document.getElementById("optionB").textContent = `B) ${options[1]}`;

        if (options.length < 4) {
            document.getElementById("optionC").style.display = "none";
            document.getElementById("optionD").style.display = "none";
        } else {
            document.getElementById("optionC").style.display = "inline-block";
            document.getElementById("optionD").style.display = "inline-block";
            document.getElementById("optionC").textContent = `C) ${options[2]}`;
            document.getElementById("optionD").textContent = `D) ${options[3]}`;
        }

        document.getElementById("optionA").onclick = () => checkAnswer("A");
        document.getElementById("optionB").onclick = () => checkAnswer("B");
        document.getElementById("optionC").onclick = () => checkAnswer("C");
        document.getElementById("optionD").onclick = () => checkAnswer("D");

        resetAnswerButtons();

        timeLeft = 30;
    } else {
        endQuiz();
    }
}


function resetAnswerButtons() {
    const options = document.querySelectorAll('.options button');
    options.forEach((button) => {
        button.classList.remove('correct-answer', 'wrong-answer');
        button.disabled = false;
    });
}

function checkAnswer(answer) {
    const correctAnswer = questions[currentQuestion].correct;
    const options = document.querySelectorAll('.options button');
    const explanation = questions[currentQuestion].explanation;
    const explanationContainer = document.getElementById("explanation-container");

    options.forEach((option) => {
        option.disabled = true;
        if (option.textContent.startsWith(correctAnswer)) {
            option.classList.add('correct-answer');
        } else if (option.textContent.startsWith(answer) && answer !== correctAnswer) {
            option.classList.add('wrong-answer');
        }
    });

    explanationContainer.textContent = explanation;
    explanationContainer.style.display = "block"; 

    if (answer === correctAnswer) {
        explanationContainer.style.backgroundColor = "#4CAF50"; // Groen
    } else {
        explanationContainer.style.backgroundColor = "#F44336"; // Rood
    }

    if (answer === correctAnswer) {
        score += 10;
        playCorrectSound(); 
    } else {
        playWrongSound(); 
    }

    document.getElementById("score").textContent = score;
    currentQuestion++;

    setTimeout(() => {
        loadQuestion(); 
        explanationContainer.style.display = "none";
        explanationContainer.style.backgroundColor = ""; 
    }, 6000);
}


// Timer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("time-left").textContent = timeLeft;
    } else {
        currentQuestion++;
        loadQuestion();
    }
}
function goToHomePage() {
    window.location.replace('home.html');
}



function endQuiz() {
    clearInterval(timer); // Stop the timer
    document.getElementById("quiz-container").style.display = "none"; // Hide the quiz container
    document.getElementById("end-container").style.display = "block"; // Show the end screen
    document.getElementById("final-score").textContent = score; // Show the final score
    document.getElementById("player-name-display").textContent = playerName;

    const clapSound = document.getElementById("clap-sound");
    clapSound.play();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    document.getElementById("player-name").value = "";
    document.getElementById("end-container").style.display = "none";
    document.getElementById("start-container").style.display = "block";
    document.getElementById("score").textContent = "0";
    document.getElementById("background-music").pause(); 
    document.getElementById("background-music").currentTime = 0;
}
