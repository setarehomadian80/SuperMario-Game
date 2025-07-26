const street = document.querySelector(".street");
const mario = document.querySelector(".mario");
const level = 15;
let left = 50;
let bottom = 300;
let isJumping = false;

// width to street ////
let fullWidth = window.innerWidth;
console.log(fullWidth);
street.style.width = fullWidth * level + "px";
// width to street ////
// create div to street ////
for (let i = 0; i < level; i++) {
  let myDiv = document.createElement("div");

  // create stop //
  if (i != 0) {
    let x = document.createElement("div");
    x.classList.add("stop");
    x.style.left = Math.floor(Math.random() * 85) + 10 + "%";
    x.style.height = Math.floor(Math.random() * 50) + 150 + "px";
    myDiv.appendChild(x);
    // create stop //
    street.appendChild(myDiv);
  }
}
// create div to street ////
///////////////keyup//////////////////
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 39 || e.code === "ArrowRight" || e.key === "ArrowRight") {
    e.preventDefault();

    mario.classList.remove("stand")
    mario.classList.add("walk")

    left += 10;
    mario.style.left = left + "px";
    mario.style.transform = "scaleX(1)";
  }

  if (e.code === "Space" && !isJumping) {
        mario.classList.remove("walk")
    isJumping = true;
    mario.style.bottom = bottom + 300 + "px";

    setTimeout(() => {
      mario.style.bottom = bottom + "px";
      isJumping = false;
    }, 500);
  }
});
///////////////keyup//////////////////
// get left of .stop//
const myLeft = []
let myStop = document.querySelectorAll('.stop')
console.log(myStop)
myStop.forEach((val, i)=>{
    let temp = (fullWidth * (i + 1))+(val.offsetLeft)
    myLeft.push(temp)
})
console.log(myLeft)
// get left of .stop//