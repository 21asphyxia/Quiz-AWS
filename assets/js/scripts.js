function statusModifier($status) {
    if($status == 2 ){
        document.querySelector(".two").classList.add("active");
        document.querySelector(".icon-two").classList.add("active");
        document.querySelector(".text-two").classList.add("active");
        questionShower();
    }
    else if($status == 3){
        document.querySelector(".three").classList.add("active");
        document.querySelector(".icon-three").classList.add("active");
        document.querySelector(".text-three").classList.add("active");
    }
}

function questionPicker() {
    // Random picker for questions
    let question = questions.splice([Math.floor(Math.random() * questions.length)], 1)[0];
    console.log(question);
    return question;
} 

function questionShower() {
    let content = document.querySelector(".content");
    content.innerHTML = "";
    // remove border
    content.style.border = "none";
    
    let question = questionPicker();
    content.innerHTML += `<div class="cards">`;
    questions.choices.forEach(choice=> {
        content.innerHTML += `
        <button class="card" id="A" onclick="checkAnswer('A');">Amazon EC2 costs are billed on a monthly basis</button>`
    });
        
//     <button class="card" id="A" onclick="checkAnswer('A');">Amazon EC2 costs are billed on a monthly basis</button>
//     <button class="card card-2" id="B" onclick="checkAnswer('B');">Users retain full administrative access to their Amazon EC2 instances.</button>
//     <button class="card card-3" id="C" onclick="checkAnswer('C');">Amazon EC2 instances can be launched on demand when needed</button>
//     <button class="card card-4" id="D" onclick="checkAnswer('D');">Users can permanently run enough instances to handle peak workloads.</button>
//   </div>
// `;
    }
    
    
// }

document.querySelector(".next").onclick = function() {
    if(!document.querySelector(".two").classList.contains("active")){
        statusModifier(2);
    }
    else if(!document.querySelector(".three").classList.contains("active")){
        statusModifier(3);
    }
}