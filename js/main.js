'use strict'
var gNums = [];
var gGameLevel;
var gModal = document.querySelector('.modal');
var gRowLength;
var numsMarked;
var gGameInterval;
var gTimer = null;
var beginTime = 0

function init() {
    clearInterval(gGameInterval);
    gGameInterval = null;
    gTimer = null;
    gGameLevel = 0;
    numsMarked = 0;
    showStartMenu()
}

function showTime() {
    var timeShow = document.querySelector('.timer');
    gTimer = ((Date.now() - beginTime) / 1000).toFixed(3);
    timeShow.innerText = `Time:\n${gTimer}\nseconds`;
}

function startTimer() {
    beginTime = Date.now();
    gGameInterval = setInterval(showTime, 100);
}

function markNum(num, elbtn) {
    if (numsMarked === 0) startTimer();

    if (num === numsMarked + 1) {
        new Audio('audio/correct.mp3').play();
        numsMarked++;
        document.querySelector('.count').innerText = `${(numsMarked !== gGameLevel) ? 'Next Number:\n' + (numsMarked + 1) : ''}`;
        elbtn.classList.replace('notmarked', 'marked');
    }

    if (numsMarked === gGameLevel) {
        clearInterval(gGameInterval);
        gModal.innerHTML = `
        <div class:"title"><br/>Finished!<br/>
        Your time is: ${gTimer} seconds.<br/><br/>
        <div class="buttons" onclick="init()">Play some more</div>
        `
        gModal.style.display = 'block';
    }
    else if (elbtn.classList.contains('notmarked')) {
        new Audio('audio/error.mp3').play();
        elbtn.style.backgroundColor = 'red';
        elbtn.style.fontSize = '20px';
        setTimeout(function () {
            elbtn.style.backgroundColor = '';
            elbtn.style.fontSize = '';
        }, 1000)
    }
}

function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gRowLength; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gRowLength; j++) {
            var currentNum = gNums.splice(getRandomInt(0, gNums.length - 1), 1);
            strHTML += `<td class="notmarked" onclick="markNum(${currentNum},this)">${currentNum}</td>`;
        }
        strHTML += '</tr>';
    }
    var table = document.querySelector('.table');
    table.innerHTML = strHTML;
}

function showStartMenu() {
    gModal.innerHTML = `
    <div class="title">Welcome to Touch|Num<br/><br/></div>
    <div>Choose difficulty:<br/><br/><div>
    <div class="buttons" onclick="createNums(16)">16 Nums</div>
    <div class="buttons" onclick="createNums(25)">25 Nums</div>
    <div class="buttons" onclick="createNums(36)">36 Nums</div>
    `
    gModal.style.opacity = '1';
    gModal.style.display = 'block';
}

function createNums(difficutly) {
    gGameLevel = difficutly;
    gModal.innerHTML = `<div style="font-size: 50px"><br/>Click the numbers by order starting from 1...</div>`;
    setTimeout(function () {
        gModal.style.display = 'none';
    }, 3000);
    for (var i = 1; i <= difficutly; i++)
        gNums.push(i);
    gRowLength = Math.sqrt(difficutly);
    renderBoard();
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}