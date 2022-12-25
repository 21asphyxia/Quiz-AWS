let score;
let quizQuestions = [];
let questionsCount = questions.length;
function statusModifier($status) {
    if($status == 2 ){
        document.querySelector(".two").classList.add("active");
        document.querySelector(".icon-two").classList.add("active");
        document.querySelector(".text-two").classList.add("active");
        questionShower();
        // hide button
        document.querySelector("#next").style.display = "none";
        score = 0;

    }
    else if($status == 3){
        document.querySelector(".three").classList.add("active");
        document.querySelector(".icon-three").classList.add("active");
        document.querySelector(".text-three").classList.add("active");
        seeResults();
    }
}

document.querySelector("#next").onclick = function() {
    if(!document.querySelector(".two").classList.contains("active")){
        statusModifier(2);
    }
    else if(!document.querySelector(".three").classList.contains("active")){
        statusModifier(3);
    }
}

function questionPicker() {
    // Random picker for questions
    let question = questions.splice([Math.floor(Math.random() * questions.length)], 1)[0];
    return question;
}

function questionShower() {
    let content = document.querySelector(".content");
    // remove border
    content.style.border = "none";
    content.style.width = "90%";
    let html;
    html = `<div class="cards">`;
    if(questions.length > 0){
        let question = questionPicker();
        if (!content.previousElementSibling.classList.contains("countDown")) {
            var questionContent = document.createElement("h2");
            var progressBar = document.createElement("div");
            var progress = document.createElement("div");
            progress.classList.add("progressCount");
            var countDown = document.createElement("div");
            progressBar.classList.add("progressBar");
            progress.innerText =  quizQuestions.length / questionsCount * 100 + "%";
            countDown.classList.add("countDown");
            countDown.innerText = "Time left : 30";
            questionContent.classList.add("question");
            questionContent.innerText = question.question;
            progressBar.appendChild(progress);
            content.parentNode.insertBefore(questionContent, content);
            content.parentNode.insertBefore(progressBar, content);
            content.parentNode.insertBefore(countDown, content);
        }
        else {
            document.querySelector(".question").innerText = question.question;
            document.querySelector(".progressCount").innerText = quizQuestions.length / questionsCount * 100 + "%";
            document.querySelector(".progressCount").style.width = quizQuestions.length / questionsCount * 100 + "%";
        }
        // For each loop for choices
        for (let choice in question.choices) {
            html += `
            <button class="card" data-answer="${choice}">${question.choices[choice]}</button>`
        }
        html += `</div>`;
        content.innerHTML = html;
        countDownSetter();
        // Add event listener to each card
        let cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.addEventListener("click", function() {
                if (card.dataset.answer == question.correct) {
                    score++;
                }
                clearInterval(timer);
                questionShower();
            });
        });
        quizQuestions.push(question);
    }
    else{
        document.querySelector(".countDown").remove();
        document.querySelector(".progressCount").innerText = quizQuestions.length / questionsCount * 100 + "%";
        document.querySelector(".progressCount").style.width = quizQuestions.length / questionsCount * 100 + "%";
        document.querySelector(".question").innerText = "You have completed the quiz!";
        html += `
        <button class="card" style="flex:unset;width:60%;">Click below to see Results!</button>`
        html += `</div>`;
        content.innerHTML = html;
        document.querySelector(".buttons").innerHTML = `<button class="btn next" id="next">See Results</button>`;
        document.querySelector("#next").onclick = function() {
            if(!document.querySelector(".two").classList.contains("active")){
                statusModifier(2);
            }
            else if(!document.querySelector(".three").classList.contains("active")){
                statusModifier(3);
            }
        }
    }
}
let timer;
function countDownSetter() {
    console.log(1);
    let countDown = document.querySelector(".countDown");
    let time = 29;
    countDown.innerText = `Time left : 30`;
    timer = setInterval(function() {
        if(time <= 3 && time > 0){
            countDown.classList.toggle("red");
            setTimeout(function(){
                countDown.classList.toggle("blinker");
                countDown.classList.toggle("red");
                setTimeout(function(){
                    countDown.classList.toggle("blinker");
                }, 900);
            }, 100);
        }
        countDown.innerText = `Time left : ${time}`;
        time--;
        if (time < 0) {
            
            clearInterval(timer);
            questionShower();
        }
    }, 1000);
}

function seeResults() {
    document.querySelector(".content").innerHTML = `<h2>Results</h2>`;
    document.querySelector(".content").innerHTML += `<p>You got ${score} out of ${quizQuestions.length} questions correct!</p>`;
    document.querySelector(".progressBar").remove();
    document.querySelector(".buttons").innerHTML = `<button class="btn next" id="restart">Restart Quiz</button>
    <button class="btn next" id="answers">See Answers</button>
    `;
    document.querySelector("#restart").onclick = function() {
        location.reload();
    }
    document.querySelector("#answers").onclick = function() {
        seeAnswers();
    }
}

function seeAnswers() {
    document.querySelector(".content").innerHTML = `<h2>Answers</h2>`;
    quizQuestions.forEach(question => {
        document.querySelector(".content").innerHTML += `
        <div class="answerCard">
            <h3>${question.question}</h3>
            <p>Correct Answer:<br> ${question.choices[question.correct]}</p>
            <p>Explanation :<br>${question.explanation}</p>
        </div>
        `;
    });
    document.querySelector(".buttons").innerHTML = `<button class="btn next" id="restart">Restart Quiz</button>`;
    document.querySelector("#restart").onclick = function() {
        location.reload();
    }
}