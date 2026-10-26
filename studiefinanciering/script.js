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
        question: "Wat is de maximale duur van de basisbeurs in Nederland?", 
        options: ["3 jaar", "4 jaar", "5 jaar", "6 jaar"],
        correct: "B",
        explanation: " Studenten kunnen maximaal 4 jaar basisbeurs ontvangen, tenzij hun studie langer duurt."
    },
    { 
        question: "Het studentenreisproduct wordt altijd omgezet in een gift, ongeacht of je een diploma haalt.", 
        options: ["Waar", "Niet waar"],
        correct: "B",
        explanation: "Niet waar. Het reisproduct wordt alleen een gift als je je diploma binnen 10 jaar behaalt."
    },
    { 
        question: "Wat is de maximale periode waarin je je studielening kunt terugbetalen?", 
        options: ["10 jaar", "15 jaar", "20 jaar", "35 jaar"],
        correct: "D",
        explanation: "Het aflossen van een studielening kan maximaal 35 jaar duren."
    },
    { 
        question: "Je ouders zijn verplicht om financieel bij te dragen aan je studie..", 
        options: ["Waar", "Niet waar"],
        correct: "A",
        explanation: "Waar. De overheid gaat ervan uit dat ouders meebetalen, tenzij dit financieel niet haalbaar is."
    },
    { 
        question: "Wat is een voorwaarde om recht te hebben op een aanvullende beurs?", 
        options: ["Je ouders hebben een inkomen onder een bepaalde grens", "Je moet 18 jaar of ouder zijn", "Je mag niet lenen bij DUO", "Je moet minimaal 40 uur per week studeren"],
        correct: "A",
        explanation: "De aanvullende beurs is afhankelijk van het inkomen van je ouders."
    },
    { 
        question: "Je mag een studielening bij DUO vrij besteden aan andere zaken dan studiekosten.", 
        options: ["Waar", "Niet waar"],
        correct: "A",
        explanation: "Waar. Het geleende geld mag je vrij besteden, maar je moet het wel terugbetalen."
    },
    { 
        question: "Wat is de rente op een studielening in Nederland in 2025?", 
        options: ["0%", "2,56%", "1,99%", "Het percentage varieert jaarlijks."],
        correct: "D",
        explanation: "Het rentepercentage verandert jaarlijks en wordt vastgesteld door DUO."
    },
    { 
        question: " Als je een mbo-opleiding volgt, krijg je automatisch recht op studiefinanciering.", 
        options: ["Waar", "Niet waar"],
        correct: "A",
        explanation: "Waar. Mbo-studenten op niveau 3 en 4 hebben recht op studiefinanciering vanaf 18 jaar."
    },
    { 
        question: "Wat gebeurt er met een aanvullende beurs als je binnen 10 jaar geen diploma haalt?", 
        options: ["Het wordt kwijtgescholden", "Het wordt omgezet in een gift", "Het wordt omgezet in een lening", "Je moet alles direct betalen"],
        correct: "C",
        explanation: " De aanvullende beurs wordt dan omgezet in een lening"
    },
    { 
        question: "De maximale studielening is altijd gelijk, ongeacht je woonsituatie.", 
        options: ["Waar", "Niet waar"],
        correct: "B",
        explanation: "De maximale lening hangt af van of je thuis- of uitwonend bent."
    }
];


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
        explanationContainer.style.display = "none"; // Verberg uitleg na de vraag
        explanationContainer.style.backgroundColor = ""; // Reset de achtergrondkleur
    }, 6000);
}



function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("time-left").textContent = timeLeft;
    } else {
        currentQuestion++;
        loadQuestion();
    }
}


function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("end-container").style.display = "block";
    document.getElementById("final-score").textContent = score;
    document.getElementById("player-name-display").textContent = playerName;

    const clapSound = document.getElementById("clap-sound");
    clapSound.play();
}

function goToHomePage() {
    window.location.href = 'home.html'; 
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

