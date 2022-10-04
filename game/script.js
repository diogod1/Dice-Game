'use strict';

//All query selector's
const rolldice = document.querySelector('.btn--roll');
const newgame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');
const score_p0 = document.getElementById('score--0');
const score_p1 = document.getElementById('score--1');
const current_score_p0 = document.getElementById('current--0');
const current_score_p1 = document.getElementById('current--1');
const section_p0 = document.querySelector('.player--0');
const section_p1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');

//temp variables
var current_dice = 0;
var current_score = 0;
var current_player = 0; //start's in player 1

//all fucntions
var generate_dice = () => Math.trunc(Math.random() * 6) + 1;

const display_dice = function (number) {
  document.getElementById('dice-img').src = `dice-${number}.png`;
};

const check_win = function () {
  if (Number(score_p0.textContent) >= 100) {
    alert('Player 1 wins!');
    dice.classList.add('hidden');
    section_p0.classList.add('.player--winner');
    reset(); //reset the game
  } else if (Number(score_p1.textContent) >= 100) {
    alert('Player 2 wins!');
    section_p1.classList.add('.player--winner');
    dice.classList.add('.hidden');
    reset(); //reset the game
  }
};

const reset = function () {
  current_score = 0;
  current_player = 0;
  current_dice = 5;
  score_p0.textContent = 0;
  score_p1.textContent = 0;
  current_player = 1;
  section_p1.classList.remove('.player--winner');
  section_p0.classList.remove('.player--winner');
  change_player();
};

const change_player = function () {
  if (current_player == 0) {
    current_player = 1;
    section_p0.classList.remove('player--active');
    section_p1.classList.add('player--active');
  } else {
    current_player = 0;
    section_p1.classList.remove('player--active');
    section_p0.classList.add('player--active');
  }
};

rolldice.addEventListener('click', function () {
  current_dice = generate_dice();
  display_dice(current_dice);
  if (current_dice == 1) {
    current_score = 0;
    if (current_player == 0) {
      current_score_p0.textContent = current_score;
      change_player();
    } else {
      current_score_p1.textContent = current_score;
      change_player();
    }
  } else {
    current_score += current_dice;
    if (current_player == 0) {
      current_score_p0.textContent = current_score;
    } else {
      current_score_p1.textContent = current_score;
    }
    console.log(current_score);
  }
});

hold.addEventListener('click', function () {
  if (current_score > 0) {
    if (current_player == 0) {
      score_p0.textContent = Number(score_p0.textContent) + current_score;
      current_score_p0.textContent = 0;
      current_score = 0;
      check_win();
      change_player();
    } else {
      score_p1.textContent = Number(score_p1.textContent) + current_score;
      current_score_p1.textContent = 0;
      current_score = 0;
      check_win();
      change_player();
    }
  }
});

newgame.addEventListener('click', reset);
