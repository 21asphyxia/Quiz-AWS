function statusModifier($status) {
    if($status == 2 ){
        document.querySelector(".two").classList.add("active");
        document.querySelector(".icon-two").classList.add("active");
        document.querySelector(".text-two").classList.add("active");
        // hide button
        document.querySelector("#next").style.display = "none";
        document.querySelector(".buttons").innerHTML = `<button class="btn next" id="next-question">Next Question</button>`;
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