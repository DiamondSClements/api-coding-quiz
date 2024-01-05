const questions = [
  {
    question: "What does API stand for?",
    options: ["Artificial Printing Intelligence", "Application Programming Interface", "Automatic Programming Inquiry", "Application Pointing Inserts"],
    correctAnswer: "Application Programming Interface"
  },
  {
    question: "Which of these variables is supported by JavaScript?",
    options: ["Boolean", "String", "Undefined", "All of them"],
    correctAnswer: "All of them"
  },
  {
    question: "Which character is used to define an expression as not true?",
    options: ["*", "%", "!", "$"],
    correctAnswer: "!"
  },
  {
    question: "Does a boolean have the values of true and false?",
    options: ["True", "False"],
    correctAnswer: "True"
  },
];

var currentQuestionIndex = 0;
    var timeLeft = 60;
    var timerInterval;

    var startBtn = document.getElementById("start-btn");
    var questionContainer = document.getElementById("question-container");
    var timerElement = document.getElementById("time");
    var resultElement = document.getElementById("result");
    var initialsInput = document.getElementById("initials");
    var submitInitialsBtn = document.getElementById("submit-initials");
    var scoreboardContainer = document.getElementById("scoreboard");

    startBtn.addEventListener("click", startQuiz);
    submitInitialsBtn.addEventListener("click", saveInitials);

    function startQuiz() {
      startBtn.style.display = "none";
      renderQuestion();
      timerInterval = setInterval(function () {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
          endQuiz();
        }
      }, 1000);
    }

    function renderQuestion() {
      var currentQuestion = questions[currentQuestionIndex];
      var optionsHtml = currentQuestion.options.map((option, index) => `
        <button onclick="submitAnswer(${index})">${option}</button>
      `).join('');

      questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        ${optionsHtml}
      `;
    }

    function submitAnswer(selectedIndex) {
      var userAnswer = questions[currentQuestionIndex].options[selectedIndex];

      if (userAnswer === questions[currentQuestionIndex].correctAnswer) {
        resultElement.textContent = "Correct!";
      } else {
        resultElement.textContent = "Incorrect!";
        timeLeft -= 10; 
      }

      setTimeout(()=>{resultElement.textContent ='';},1000);

      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        renderQuestion();
      } else {
        endQuiz();
      }
    }

    function endQuiz() {
      clearInterval(timerInterval);
      questionContainer.innerHTML = "";
      resultElement.textContent = `Game Over! Your score: ${timeLeft}`;
      initialsInput.style.display = "block";
      submitInitialsBtn.style.display = "block";
      displayScoreboard();
    }

    function saveInitials() {
      var userInitials = initialsInput.value;
      var scoreData = {
        initials: userInitials,
        score: timeLeft
      };

      
      var scores = JSON.parse(localStorage.getItem("scores")) || [];
      scores.push(scoreData);
      localStorage.setItem("scores", JSON.stringify(scores));

      
      displayScoreboard();
    }

    function displayScoreboard() {
    
      var scores = JSON.parse(localStorage.getItem("scores")) || [];
      scores.sort((a, b) => b.score - a.score);
      scoreboardContainer.innerHTML = "<h2>Scoreboard</h2>";

      if (scores.length > 0) {
        scores.forEach((score, index) => {
          scoreboardContainer.innerHTML += `<p>${index + 1}. ${score.initials}: ${score.score}</p>`;
        });
      } else {
        scoreboardContainer.innerHTML += "<p>No scores yet.</p>";
      }
}