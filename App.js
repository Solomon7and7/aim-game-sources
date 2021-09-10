const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;
const timeForRandomBtn = [10, 20, 30];
const colors = ['#FFFF00', '#8B0000', '#808000', '#00FFFF', '#008080', '#0000FF', '#FF00FF', '#C0C0C0']

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if(event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame()
  }
});

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

const randomTimeForRandomBtn = Math.floor(Math.random() * timeForRandomBtn.length)

btnRandom.addEventListener('click', () => {
  btnRandom.setAttribute('data-time', timeForRandomBtn[randomTimeForRandomBtn])
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  // timeEl.innerHTML = `00:${time}` создаем ф-цию setTime чтобы сократить повторяющийся код
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
  let current = --time;
  if (current < 10) {
    current = `0${current}`
  }
  // timeEl.innerHTML = `00:${current}` создаем ф-цию setTime чтобы сократить повторяющийся код
  setTime(current)
}
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
  setTimeout(() => location.reload(), 3000)
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  circle.classList.add('circle')
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  const colorNum = Math.floor(Math.random() * colors.length)
  circle.style.background = `${colors[colorNum]}`
  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

// function win() {

//   function kill() {
//     const circle = document.querySelector('.circle')

//     if (circle) {
//       circle.click()
//     }

//   }
//   setInterval(kill, 0.000000000000000000000000000001)
// }
