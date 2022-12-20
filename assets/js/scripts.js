const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const iconOne = document.querySelector(".icon-one");
const iconTwo = document.querySelector(".icon-two");
const iconThree = document.querySelector(".icon-three");
const textOne = document.querySelector(".text-one");
const textTwo = document.querySelector(".text-two");
const textThree = document.querySelector(".text-three");

one.onclick = function() {
    one.classList.add("active");
    iconOne.classList.add("active");
    textOne.classList.add("active");
    two.classList.remove("active");
    iconTwo.classList.remove("active");
    textTwo.classList.remove("active");
    three.classList.remove("active");
    iconThree.classList.remove("active");
    textThree.classList.remove("active");
}

two.onclick = function() {
    one.classList.add("active");
    iconOne.classList.add("active");
    textOne.classList.add("active");
    two.classList.add("active");
    iconTwo.classList.add("active");
    textTwo.classList.add("active");
    three.classList.remove("active");
    iconThree.classList.remove("active");
    textThree.classList.remove("active");
}

three.onclick = function() {
    one.classList.add("active");
    iconOne.classList.add("active");
    textOne.classList.add("active");
    two.classList.add("active");
    iconTwo.classList.add("active");
    textTwo.classList.add("active");
    three.classList.add("active");
    iconThree.classList.add("active");
    textThree.classList.add("active");
}