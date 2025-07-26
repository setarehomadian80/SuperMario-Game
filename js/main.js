const street = document.querySelector(".street");
const mario = document.querySelector(".mario");
const level = 15;
let left = 50;
let bottom = 300;
let isJumping = false;
let jumpCount = 0;
let jumpTimeout = null;
let secondJumpAvailable = false;

// تنظیم عرض خیابان
let fullWidth = window.innerWidth;
street.style.width = fullWidth * level + "px";

// ایجاد مانع‌ها
for (let i = 0; i < level; i++) {
  let myDiv = document.createElement("div");

  if (i != 0) {
    let x = document.createElement("div");
    x.classList.add("stop");
    x.style.left = Math.floor(Math.random() * 85) + 10 + "%";
    x.style.height = Math.floor(Math.random() * 50) + 150 + "px";
    myDiv.appendChild(x);
  }

  street.appendChild(myDiv);
}

// ذخیره موقعیت موانع
const myLeft = [];
let myStop = document.querySelectorAll(".stop");

myStop.forEach((val, i) => {
  let temp = fullWidth * (i + 1) + val.offsetLeft;
  myLeft.push(temp);
});

// حرکت به راست
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    e.preventDefault();
    if (document.body.classList.contains("game-over")) return;

    mario.classList.remove("stand");
    mario.classList.add("walk");

    left += 20;
    mario.style.left = left + "px";
    mario.style.transform = "scaleX(1)";
  }

  // پرش
  if (e.code === "Space") {
    e.preventDefault();

    if (document.body.classList.contains("game-over")) return;

    mario.style.animation = "runner 100s";

    // پرش اول
    if (!isJumping) {
      isJumping = true;
      jumpCount = 1;
      mario.style.bottom = bottom + 250 + "px";
      secondJumpAvailable = true;

      jumpTimeout = setTimeout(() => {
        if (jumpCount === 1) {
          mario.style.bottom = bottom + "px";
          isJumping = false;
          jumpCount = 0;
          secondJumpAvailable = false;
          mario.style.animation = "none";
        }
      }, 700);
    }

    // پرش دوم
    else if (isJumping && secondJumpAvailable && jumpCount === 1) {
      mario.style.bottom = bottom + 350 + "px";
      jumpCount = 2;
      secondJumpAvailable = false;

      if (jumpTimeout) clearTimeout(jumpTimeout);

      setTimeout(() => {
        mario.style.bottom = bottom + "px";
        isJumping = false;
        jumpCount = 0;
        mario.style.animation = "none";
      }, 700);
    }
  }
});

// بررسی برخورد
function checkSideCollision() {
  const marioRect = mario.getBoundingClientRect();

  document.querySelectorAll(".stop").forEach((stop) => {
    const stopRect = stop.getBoundingClientRect();

    const isHorizontallyColliding =
      marioRect.right >= stopRect.left &&
      marioRect.left < stopRect.left + 10; // به لبۀ چپ مانع نزدیک شده

    const isSameVerticalLevel =
      marioRect.bottom >= stopRect.top &&
      marioRect.top <= stopRect.bottom; // یعنی تقریباً در یک ارتفاع‌اند

    if (isHorizontallyColliding && isSameVerticalLevel && !isJumping) {
      triggerGameOver();
    }
  });
}

setInterval(() => {
  if (!document.body.classList.contains("game-over")) {
    checkSideCollision();
  }
}, 50); // هر ۵۰ میلی‌ثانیه بررسی میشه


function triggerGameOver() {
  document.body.classList.add("game-over");
  mario.style.transition = "bottom 1s ease";
  mario.style.bottom = "-300px";
  console.log("🎮 Game Over");
}
