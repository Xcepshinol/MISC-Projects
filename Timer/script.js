
document.addEventListener('DOMContentLoaded', () => {
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})


const stopw = document.querySelector("#stopwatch");
const display = stopw.querySelector('.display');
if (!stopw) return;


const start_button = stopw.querySelector('[data-start-pause]');
const reset_button = stopw.querySelector('[data-reset]');

let timer = null;
let start_time = 0;
let elapsed_time = 0;
let is_running = false;

function start(){
    if(!is_running){
        start_time = Date.now() - elapsed_time
        timer = setInterval(update, 10);
        is_running = true;
    }
}

function pause(){
    if(is_running){
        clearInterval(timer);
        elapsed_time = Date.now() - start_time;
        is_running = false;
    }
}

function reset(){
    clearInterval(timer);
    start_time = 0;
    elapsed_time = 0;
    is_running = false;
    display.textContent = "00:00:00:00";
}

function update(){
    const curr_time = Date.now();
    elapsed_time = curr_time - start_time;

    let hours = Math.floor(elapsed_time / (1000*60*60));
    let minutes = Math.floor(elapsed_time / (1000*60)%60);
    let seconds = Math.floor(elapsed_time / 1000%60);
    let milliseconds = Math.floor(elapsed_time % 1000/10);

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");
    milliseconds = String(milliseconds).padStart(2,"0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`
}

start_button.addEventListener('click', ()=>{
    if (start_button.textContent === 'Start'){
        start();
        start_button.textContent = 'Pause'
        start_button.classList.remove('start-pause');
        start_button.classList.add('pause');
    }else {
        pause();
        start_button.textContent = 'Start'
        start_button.classList.remove('pause');
        start_button.classList.add('start-pause');
    }
})

reset_button.addEventListener('click', ()=>{
    reset();
})

});