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
      question: "Waarvoor kun je als mbo-student bij DUO terecht?",
      options: [
        "Alleen voor studiefinanciering",
        "Voor studiefinanciering, ov-studentenkaart en het terugbetalen van leningen",
        "Alleen voor informatie over opleidingen",
        "DUO helpt alleen hbo- en wo-studenten",
      ],
      correct: "B",
      explanation:
        "DUO regelt studiefinanciering, de ov-studentenkaart, het terugbetalen van studieleningen en helpt bij diploma-erkenning en registratie.",
    },
    {
      question: "Wat betekent DUO?",
      options: [
        "Dienst Uitvoering Onderwijs",
        "Directe Uitbetaling Onderwijs",
        "Dekkings Uitbetaling Onderwijs",
        "Dienst Onderwijs Organisatie",
      ],
      correct: "A",
      explanation:
        "DUO staat voor Dienst Uitvoering Onderwijs en is de organisatie die onder andere de studiefinanciering regelt.",
    },
    {
      question: "DUO regelt studiefinanciering in Nederland.",
      options: ["Waar", "Niet waar"],
      correct: "A",
      explanation:
        "Ja, DUO is inderdaad verantwoordelijk voor studiefinanciering in Nederland.",
    },
    {
      question: "Wie kan studiefinanciering aanvragen?",
      options: ["Iedereen", "Studenten", "Alle werkenden", "Mensen boven de 40"],
      correct: "B",
      explanation:
        "Alleen studenten kunnen studiefinanciering aanvragen. Het is niet voor iedereen toegankelijk.",
    },
    {
      question:
        "Wat gebeurt er met je basisbeurs als je binnen 10 jaar je mbo-diploma haalt?",
      options: [
        "Je moet de basisbeurs altijd terugbetalen",
        "De basisbeurs wordt omgezet in een gift en je hoeft niets terug te betalen",
        "Je krijgt een boete als je het niet binnen 10 jaar behaalt",
        "Je moet de helft van de basisbeurs terugbetalen",
      ],
      correct: "B",
      explanation:
        "Als je binnen 10 jaar je mbo-diploma op niveau 3 of 4 haalt, wordt je basisbeurs een gift. Haal je het niet op tijd, moet je het terugbetalen aan DUO.",
    },
    {
      question: "Wat gebeurt er als je studieschuld niet aflost?",
      options: [
        "Extra rente",
        "Geen gevolgen",
        "Boete",
        "Studieschuld verdwijnt",
      ],
      correct: "A",
      explanation:
        "Als je studieschuld niet aflost, wordt er rente in rekening gebracht.",
    },
    {
      question:
        "Het leenstelsel betekent dat je geld leent en later moet terugbetalen.",
      options: ["Waar", "Niet waar"],
      correct: "A",
      explanation:
        "Inderdaad, het leenstelsel houdt in dat je geld leent voor je studie en dat later moet terugbetalen.",
    },
    {
      question:
        "Wat doet DUO als je moeite hebt met het terugbetalen van je studieschuld?",
      options: [
        "DUO kan een betalingsregeling aanbieden",
        "DUO doet niets, je moet altijd op tijd betalen",
        "DUO verdubbelt je schuld als je niet betaalt",
        "DUO stopt je ov-kaart als je niet betaalt",
      ],
      correct: "A",
      explanation:
        "DUO begrijpt dat terugbetalen soms lastig is. Daarom kun je een betalingsregeling aanvragen of tijdelijk minder betalen als je inkomen laag is.",
    },
    {
      question: "DUO regelt ook de uitgifte van paspoorten.",
      options: ["Waar", "Niet waar"],
      correct: "B",
      explanation:
        "Dat is niet waar. DUO is niet verantwoordelijk voor paspoorten, dat doet de gemeente.",
    },
   
    {
      question:
        "Wat gebeurt er als je studiefinanciering ontvangt, maar langer over je mbo-opleiding doet dan gepland?",
      options: [
        "Je krijgt studiefinanciering totdat je klaar bent",
        "Studiefinanciering stopt na de maximale duur, maar je kunt nog lenen",
        "DUO betaalt je opleiding verder als je vertraging hebt",
        "Je moet de studiefinanciering terugbetalen",
      ],
      correct: "B",
      explanation:
        "Voor mbo-niveau 3 en 4 krijg je maximaal 4 jaar studiefinanciering. Daarna stopt de basisbeurs, maar je kunt nog wel lenen als je doorstudeert.",
    },
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
        explanationContainer.style.display = "none";
        explanationContainer.style.backgroundColor = ""; 
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
}