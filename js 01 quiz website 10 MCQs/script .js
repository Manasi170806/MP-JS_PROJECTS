document.addEventListener('DOMContentLoaded', () => 
{
    const quizData = [
        {
            question: "What comes next in the sequence: 2, 6, 12, 20, 30, ___?",
            options: ["40", "42", "44", "48"],
            answer: "42"
        },
        {
            question: "Book is to Reading as Fork is to ___?",
            options: ["Drawing", "Eating", "Writing", "Cutting"],
            answer: "Eating"
        },
        {
            question: " All roses are flowers. Some flowers fade quickly. Therefore:",
            options: ["All roses fade quickly", "Some roses fade quickly", "No roses fade quickly", "Some flowers that fade quickly are roses"],
            answer: "Some flowers that fade quickly are roses"
        },
        {
            question: "  2, 5, 10, 17, 26, ?",
            options: ["35", "37", "38", "42"],
            answer: "37"
        },
        {
            question: "If all A are B, and some B are C, then which is certain?",
            options: ["All A are C", " Some A are C", "No A are C", "Some C are A"],
            answer: "Some A are C"
        },
        {
            question: "Which word doesn't belong?",
            options: ["Square", "Circle", "Triangle", "Rectangle"],
            answer: "Circle"
        },
        {
            question: "If a clock shows 3:15, what is the angle between the hands?",
            options: ["0°", "7.5°", "15°", "30°"],
            answer: "7.5°"
        },
        {
            question: "What is the main component of the Sun?",
            options: ["Liquid lava", "Hydrogen", "Oxygen", "Carbon"],
            answer: "Hydrogen"
        },
        {
            question: "In which year did World War II end?",
            options: ["1943", "1945", "1947", "1950"],
            answer: "1945"
        },
        {
            question: "If DOG = 26, CAT = 24, then BAT = ?",
            options: ["23", "25", "26", "28"],
            answer: "23"
        }
    ];

    const quizContainer = document.querySelector(".quiz-container");
    const questionElement = document.querySelector(".question");
    const optionsElement = document.querySelector(".options");
    const nextButton = document.querySelector(".next-btn");
    const timerBar = document.querySelector(".timer-bar");
    const progressElement = document.querySelector(".progress");
    
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let selectedOption = null;
    let quizCompleted = false;

    function startQuiz() 
    {
        currentQuestionIndex = 0;
        score = 0;
        quizCompleted = false;
        showQuestion();
    }

    function showQuestion() 
    {
        resetState();
        const currentQuestion = quizData[currentQuestionIndex];
        const questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
        
        currentQuestion.options.forEach(option => 
        {
            const button = document.createElement("div");
            button.classList.add("option");
            button.innerHTML = option;
            optionsElement.appendChild(button);
            button.addEventListener("click", () => selectOption(button, option));
        });
        
        progressElement.innerHTML = `Question ${questionNo} of ${quizData.length}`;
        startTimer();
    }

    function resetState() 
    {
        clearTimeout(timer);
        selectedOption = null;
        timerBar.style.width = "100%";
        timerBar.style.transition = "none";
        timerBar.offsetHeight;
        timerBar.style.transition = "width 60s linear";
        
        while (optionsElement.firstChild) 
        {
            optionsElement.removeChild(optionsElement.firstChild);
        }
        
        nextButton.style.display = "block";
        nextButton.textContent = currentQuestionIndex === quizData.length - 1 ? "Submit Quiz" : "Next Question";
    }

    function startTimer() 
    {
        timerBar.style.width = "100%";
        timerBar.offsetHeight;
        timerBar.style.width = "0%";
        
        timer = setTimeout(() => 
        {
            if (!selectedOption) 
            {
                const options = document.querySelectorAll(".option");
                options.forEach(option => 
                {
                    if (option.textContent === quizData[currentQuestionIndex].answer) 
                    {
                        option.classList.add("correct");
                    }
                });
            }
            nextButton.click();
        }, 60000);
    }

    function selectOption(optionElement, optionText) 
    {
        if (selectedOption) return;
        
        selectedOption = optionText;
        clearTimeout(timer);
        
        const correctAnswer = quizData[currentQuestionIndex].answer;
        const options = document.querySelectorAll(".option");
        
        options.forEach(option => 
        {
            if (option.textContent === correctAnswer) 
            {
                option.classList.add("correct");
            }
            if (option === optionElement && option.textContent !== correctAnswer) 
            {
                option.classList.add("wrong");
            }
        });
        
        if (optionText === correctAnswer) 
        {
            score++;
        }
    }

    function showResult()
    {
        resetState();
        quizCompleted = true;
        
        const percentage = (score / quizData.length) * 100;
        let message = " ";
        
        if (percentage >= 80) 
        {
            message = "Excellent! You're a genius!";
        } 
        else if (percentage >= 60) 
        {
            message = "Good job! You know your stuff!";
        } 
        else if (percentage >= 40) 
        {
            message = "Not bad! Keep learning!";
        } 
        else 
        {
            message = "Keep practicing! You'll get better!";
        }
        
        quizContainer.innerHTML = `
            <div class="result-container">
                <h2>Quiz Completed!</h2>
                <div class="score">${score}/${quizData.length}</div>
                <div class="message">${message}</div>
              
            </div>
        `;
        
        document.querySelector(".restart-btn").addEventListener("click", startQuiz);
    }

    nextButton.addEventListener("click", () => 
    {
        if (selectedOption || quizCompleted)
        {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) 
            {
                showQuestion();
            } 
            else 
            {
                showResult();
            }
        } 
        else 
        {
            alert("Please select an option or wait for the timer to run out");
        }
    });

    startQuiz();
});