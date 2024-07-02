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

const addDisabled = (formElement, element) => {
  const cardBtn = element.querySelector('button.reward');
  element.classList.add('card--disabled');
  formElement.classList.add('card--disabled');
  cardBtn.setAttribute('disabled', '');
  cardBtn.classList.add('btn--disabled');
  cardBtn.textContent = 'Out of stock';
};

const calculateProgress = () => {
  let totalPledgeAmount = Number(
    currentPledgeAmount.textContent.replace(/\D/, '')
  );
  let widthInPercent = (totalPledgeAmount / MAX_AMOUNT) * 100;

  currentBarProgress.style.width = `${widthInPercent}%`;
};

calculateProgress();

const modalOpen = () => {
  modal.style.display = 'flex';
  modal.setAttribute('opened', '');

  if ((modal.style.display = 'flex')) {
    document.body.style.overflow = 'hidden';
  }
};

const modalClose = () => {
  modal.removeAttribute('style');
  document.body.removeAttribute('style');
  modal.removeAttribute('opened');
  successMessage.removeAttribute('style');
  form.removeAttribute('style');
};

const removeDuplicateClass = (className) => {
  document.querySelector(`.${className}`)?.classList.remove(`${className}`);
};

const addClass = (className, element) => {
  removeDuplicateClass(`${className}`);
  element.classList.add(`${className}`);
};

const scrollIntoView = (element) => {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const formatStringToNumber = (string) => {
  return Number(string.replace(/\D/, ''));
};

const handleStock = (element, formElement, stock) => {
  element.querySelector('.card__stock span').textContent = stock.toString();

  if (stock == 0) {
    addDisabled(formElement, element);
  }
};

const validateForm = () => {
  const formCard = document.querySelector('.card.selected');
  const cardInputNumber = formCard.querySelector("input[type='number']");
  const cardStock = formCard.querySelector('.card__stock span');

  let totalPledgeAmount = formatStringToNumber(currentPledgeAmount.textContent);
  let inputValue = Number(cardInputNumber.value);
  let currentStock;

  if (cardStock) {
    currentStock = Number(cardStock.textContent);
  }

  const calculatePledgeAmount = () => {
    updatedAmount = inputValue + totalPledgeAmount;
    currentPledgeAmount.textContent = updatedAmount.toLocaleString('en-US', {
      style: 'decimal',
      trailingZeroDisplay: 'stripIfInteger',
    });
    calculateProgress(updatedAmount);
  };

  const updateStats = () => {
    updatedBackersAmount =
      formatStringToNumber(currentBackersAmount.textContent) + 1;

    currentBackersAmount.textContent = updatedBackersAmount.toString();

    if (cardStock) {
      if (updatedStock == 0) {
        cardStock.textContent = 0;
      }

      updatedStock = currentStock - 1;

      cardStock.textContent = updatedStock.toString();

      if (cardInputNumber.id == 'reward1') {
        handleStock(cards[0], formCard, updatedStock);
      }
      if (cardInputNumber.id == 'reward2') {
        handleStock(cards[1], formCard, updatedStock);
      }
      if (cardInputNumber.id == 'reward3') {
        handleStock(cards[2], formCard, updatedStock);
      }
    }
  };

  if (
    !cardInputNumber.parentElement.classList.contains('error') &&
    inputValue != ''
  ) {
    calculatePledgeAmount();
    updateStats();
    successMessage.style.display = 'flex';
    form.style.display = 'none';
  }

  if (inputValue == '') {
    cardInputNumber.parentElement.classList.add('error');
  }
};

// Event Listeners
backProject.addEventListener('click', () => {
  removeDuplicateClass('selected');
  modalOpen();

  inputRadios.forEach((radio) => {
    radio.checked = false;
    if (radio.id == 'input1') {
      radio.focus();
      radio.checked = true;
      scrollIntoView(radio.closest('.card'));
      addClass('selected', radio.closest('.card'));
    }
  })
});

bookmarkProject.addEventListener('click', () => {
  bookmarkProject.classList.toggle('active');
  if (bookmarkProject.classList.contains('active')) {
    bookmarkProjectText.textContent = 'Bookmarked';
  } else {
    bookmarkProjectText.textContent = 'Bookmark';
  }
});

for (let i = 0; i < selectRewardButtons.length; i++) {
  selectRewardButtons[i].addEventListener('click', () => {
    modalOpen();
    inputRadios[i + 1].checked = true;
    scrollIntoView(inputRadios[i + 1].closest('.card'));
    addClass('selected', inputRadios[i + 1].closest('.card'));
  });
}

closeModalButton.addEventListener('click', () => {
  modalClose();
});

form.addEventListener('click', (e) => {
  inputRadios.forEach((radio) => {
    if (e.target == radio) {
      scrollIntoView(radio.closest('.card'));
      addClass('selected', radio.closest('.card'));
    }
  });
});








