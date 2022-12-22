let score;
let quizQuestions = [];
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
        if (!content.previousElementSibling.classList.contains("question")) {
            var questioncontent = document.createElement("h2");
            questioncontent.classList.add("question");
            questioncontent.innerText = question.question;
            content.parentNode.insertBefore(questioncontent, content);
        }
        else {
            content.previousElementSibling.innerText = question.question;
        }
        // For each loop for choices
        for (let choice in question.choices) {
            html += `
            <button class="card" data-answer="${choice}">${question.choices[choice]}</button>`
        }
        html += `</div>`;
        content.innerHTML = html;
        // Add event listener to each card
        let cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            card.addEventListener("click", function() {
                if (card.dataset.answer == question.correct) {
                    score++;
                }
                questionShower();
            });
        });
        quizQuestions.push(question);
    }
    else{
        content.previousElementSibling.innerText = "You have completed the quiz!";
        html += `
        <button class="card">Click below to see Results!</button>`
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

function seeResults() {
    document.querySelector(".content").innerHTML = `<h2>Results</h2>`;
    document.querySelector(".content").innerHTML += `<p>You got ${score} out of ${quizQuestions.length} questions correct!</p>`;
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