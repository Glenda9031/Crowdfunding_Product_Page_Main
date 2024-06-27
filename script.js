// DOM Elements

const header = document.querySelector('header');
const navButton = document.querySelector('nav .btn-nav');
const cards = document.querySelectorAll('.about .card');
const form = document.querySelector('form');
const list = document.querySelector('#listContainer');
const currentPledgeAmount = document.querySelector('#currentPAmount');
const currentBackersAmount = document.querySelector('.backers_people . backer__title');
const currentBarProgress = document.querySelector('#currentProgress');
const backProject = document.querySelector('#backProject');
const bookmarkProject = document.querySelector('#bookmarkProject');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('#closeModalBtn');
const selectRewardButtons = document.querySelectorAll('.reward');
const inputRadios = document.querySelectorAll('input[nam="reward-group"]');
const amountInStock = document.querySelectorAll('.card__stock span');
const successMessage = document.querySelector('.success');
const successMessageButton = document.querySelector('#closeMessage');

// assets

const navButtenOpen = './images/icon-hamburger.svg';
const navButtenClose = './images/icon-close-menu.svg';

// Features

const MAX_AMOUNT = 100000;
let updatedPledgeAmount;
let updatedBackersAmount;
let updatedStock;

const addDisabled(formElement, element) => {
    const cardBtn = element.querySelector('button,reward');
    element.classList.add('card-disabled');
    formElement.classList.add('card-disabled');
    cardBtn.attribute('disabled', '');
    cardBtn.classList.add('btn--disabled');
    cardBtn.textContent = 'Out of stock';
}


