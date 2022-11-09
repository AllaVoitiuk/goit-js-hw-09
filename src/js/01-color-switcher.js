const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
let timerId;

btnStart.addEventListener('click', changeBGColor);
btnStop.addEventListener('click', stopChangeBGColor);
// getEl('.interval').addEventListener('click', changeBGColor);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function changeBGColor(){
    timerId = setInterval(()=>{
      console.log('current color ->' ,getRandomHexColor())
      document.body.style.backgroundColor = getRandomHexColor()
    },1000)
    btnStart.disabled = true;
}

function stopChangeBGColor(){
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
  btnStart.disabled = false;
}
  