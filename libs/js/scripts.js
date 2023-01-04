let score;
let quizQuestions = [];
let questions=[];
let answers=[];

//ajax
function ajax(url, callback,method,data=null) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    }
    xhr.open(method, url, true);
    if(data != null)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
}




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
        ajax("libs/php/Questions.class.php", function(response) {
            questions = JSON.parse(response);
            questionsCount = questions.length;
        statusModifier(2);
        
    },"POST");}
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
            // Destrucutre the choices
            let choices=[];
            Object.entries(question).forEach(([key,value]) => {
                if(key.includes("choice")){
                    // push key and value to choices
                    key = key.replace("choice_", "");
                    choices.push({
                        key,
                        value
                    });}
                });
                for (let choice in choices) {
            html += `
            <button class="card" data-answer="${choices[choice]["key"]}">${choices[choice]["value"]}</button>`
        }
        html += `</div>`;
        content.innerHTML = html;
        countDownSetter();
        // Add event listener to each card
        let cards = document.querySelectorAll(".card");
        let answer;
        let data;
        cards.forEach(card => {
            card.addEventListener("click", function() {
                answer = this.dataset.answer;
                clearInterval(timer);
                data={
                    "question":question.id,
                    "choice":answer,
                    "answers":choices
                }
                quizQuestions.push(data);
                console.log(quizQuestions);
                questionShower();
            });
        });
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
            if(!document.querySelector(".three").classList.contains("active")){
                ajax("libs/php/Answers.class.php", function(response) {
                    answers = JSON.parse(response);
                    console.log(answers);
                    statusModifier(3);
            },"POST", "data="+JSON.stringify(quizQuestions));
            }
        }
    }
}
let timer;
function countDownSetter() {
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
    answers.forEach(answer => {
        if(answer.choice == answer.correct_answer){
            score++;
        }
    });
    ajax("libs/php/Results.class.php", function(response) {
        console.log(response);
    },"POST", "score="+score);

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
    let html;
    answers.forEach(answer => {
        // get the correct answer
        let correctAnswer;
        answer.answers.forEach(choice => {
            if(choice.key == answer.correct_answer){
                correctAnswer = choice.value;
            }
        });
        (answer.choice == answer.correct_answer) ? html = `
        <div class="answerCard bgGreen">` : html = `
        <div class="answerCard bgRed">`;
        html += `
            <h3>${answer.question}</h3>
            <h4>Correct Answer:</h4><p> ${correctAnswer}</p>
            <h4>Explanation :</h4><p>${answer.explanation}</p>
        </div>
        `
        document.querySelector(".content").innerHTML += html;
    });
    document.querySelector(".buttons").innerHTML = `<button class="btn next" id="restart">Restart Quiz</button>`;
    document.querySelector("#restart").onclick = function() {
        location.reload();
    }
}