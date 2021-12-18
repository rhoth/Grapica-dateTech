const questions = [
    {
        question: " A runaway princess attracts dragon people",
        optionA: "Yona of the dawn",
        optionB: "orange",
        optionC: "squid girl",
        optionD: " angel beats",
        correctOption: "optionA"
    },

    {
        question: "It's totally normal for ninjas to wear brigtly colored clothin",
        optionA: "orange",
        optionB: "Naruto",
        optionC: "RElife",
        optionD: "Pokemon",
        correctOption: "optionB"
    },

    {
        question: "A dangerous octopus is appeasedwith a teaching position",
        optionA: "Yona of the dawn",
        optionB: "Death Parade",
        optionC: "Yurikima Arashi",
        optionD: "Assassination Classroom",
        correctOption: "optionD"
    },

    {
        question: "Two geniuses play games with eachother while a third dude has an apple addiction",
        optionA: "No game no life",
        optionB: "Code geass",
        optionC: "Death Note",
        optionD: "Soul eater",
        correctOption: "optionC"
    },

    {
        question: "School but everybody has powers, nobody knows what one character looks like",
        optionA: "Soul eater",
        optionB: "Dangonronpa",
        optionC: "Demon School",
        optionD: "My hero academia",
        correctOption: "optionD"
    },

    {
        question: "You will drown if you eat fruit",
        optionA: "One piece",
        optionB: "Bakuman",
        optionC: "Fullmetal Alchemist",
        optionD: "Naruto",
        correctOption: "optionA"
    },

    {
        question: "Bully becomes bullied",
        optionA: "One punch man",
        optionB: "Gundam",
        optionC: "Silent Voice",
        optionD: "Digimon",
        correctOption: "optionC"
    },

    {
        question: "Finding Daddy",
        optionA: "Hunter X Hunter",
        optionB: "Pokemon",
        optionC: "Black Clover",
        optionD: "Free",
        correctOption: "optionA"
    },

    {
        question: "Thick headed boy tries to save his Sister",
        optionA: "Kill la kill",
        optionB: "Gintama",
        optionC: "Gundam",
        optionD: "Demon Slayer",
        correctOption: "optionD"
    },

    {
        question: "Trying to save the forest from evil",
        optionA: "Princess Mononoke",
        optionB: "Spirited Away",
        optionC: "Dr.stone",
        optionD: "Gundam",
        correctOption: "optionA"
    },


    {
        question: "swap your body with a radom person and write to know each other",
        optionA: "Silent Voice",
        optionB: "Your Name",
        optionC: "Gintama",
        optionD: "Fate series",
        correctOption: "optionB"
    },

    {
        question: "Monkey yells really loud",
        optionA: "Eleven",
        optionB: "Black clover",
        optionC: "Attack on titan",
        optionD: "DragonBallZ",
        correctOption: "optionD"
    },

]


let shuffledQuestions = [] 

function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0 
let wrongAttempt = 0 
let indexNumber = 0

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "get some recommendations dude"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "i feel ya."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "dayumm , you good!!"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}