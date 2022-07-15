'use strict';

/* 
  Improve Code 

  1. use type coercion to NUM to STR  --- + instead of Number()



*/
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Sachin Verma',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-01-18T21:31:17.178Z',
    '2022-02-23T07:42:02.383Z',
    '2022-03-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-06-22T17:01:17.194Z',
    '2022-06-23T23:36:17.929Z',
    '2022-06-24T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'hi-IN', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-01-01T13:15:33.035Z',
    '2022-02-30T09:48:16.867Z',
    '2022-02-25T06:04:23.907Z',
    '2022-03-25T14:18:46.235Z',
    '2022-04-05T16:33:06.386Z',
    '2022-06-22T14:43:26.374Z',
    '2022-06-23T18:49:59.371Z',
    '2022-06-24T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// format date
const formateDate = function(date, locale) {

  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
    // console.log(daysPassed);    

  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed > 7) return `${daysPassed} days ago`;
  
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
}


// format currency
const formatCurrency = function(value, locale, currType) {
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currType,
  }).format(value);

};


// movement row
const displayMovements = function(acc, sort = false) {
  containerMovements.innerHTML  = '';

  const movs = sort ? acc.movements.slice().sort((curr, next) => curr - next) : acc.movements

  movs.forEach(function(mov, i){
    
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const date = new Date(acc.movementsDates[i]);
    
    const displayDate = formateDate(date, acc.locale);

    const formatNum = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
     <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}
     </div>
     <div class="movements__date">${displayDate}</div>
     <div class="movements__value">${formatNum}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);


// global balance
const calDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce( 
    (acc, curr) => acc + curr, 0 
  );

  labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
}
// calDisplayBalance(account1.movements);


const calDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0)
   .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
  
  const out = acc.movements
   .filter(mov => mov < 0)
   .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
  
  const interest = acc.movements
   .filter(mov => mov > 0)
   .map(deposit => deposit * acc.interestRate/100)
   .filter((int, i, arr) => {
    //  console.log(arr);
     return int >= 1; 
    })
   .reduce((acc , mov) => acc + mov, 0); 

  labelSumInterest.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);

}
// calDisplaySummary(account1.movements);


// Create username form USER REAl NAME
const createUsernames = function (accs) {

  accs.forEach(function(acc) {
      acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('');
  });

};
createUsernames(accounts);
// console.log(accounts);


// Update UI Funcs
const updateUI = function(acc) {
  // Display movements
  displayMovements(acc);

  // Display Balance
  calDisplayBalance(acc);

  // Display Summary
  calDisplaySummary(acc);
}


// Global Var
let currentAccount, timer;
let sorted = false;

// Date
const date = function() {
  const now = new Date();

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  };

  const locale = currentAccount.locale;
  const date = new Intl.DateTimeFormat(locale, options).format(now);

  return date;
}


// setLogOutTimer
const logOutTimer = function () {
  
  const perSecond = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // in each call print the remaining
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 seconds, stop timer and log out user
    if(time === 0){
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started'
      containerApp.style.opacity = 0;
    }
     
    // decrease 1sec from let time
    time--;
  }
  
  // set timer to 5 minutes
  let time = 60;

  // Call the timer every second
  perSecond(); // call first becoz it setInterval() excute after 1sec
  const timer = setInterval(perSecond, 1000);
  
  return timer;

}


// Event Handler
console.log(accounts);

// For Login
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submiting
  // HTML submit reload page on click so prevent this event use use preventDeagfault()
  e.preventDefault();    
  
  // Find Method Usage
  // currentAccount undefined if not find username
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if(currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and Welcome msg
    labelWelcome.textContent = `Welcome back, 
      ${currentAccount.owner.split(' ')[0] }`;

    // Show UI
    containerApp.style.opacity = 100;  
    
    // Date
    const now = date();
    labelDate.textContent = `${now}`;
    
    // Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = ''; 
    inputLoginPin.blur();

    if(timer) clearInterval(timer);
    timer = logOutTimer();

    updateUI(currentAccount);

  }

});

// Transfer
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  
  const amount = +(inputTransferAmount.value);
  const receiverAcc =  accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
   
  if(
    amount > 0 && 
    receiverAcc &&
    currentAccount.balance >= amount && 
    receiverAcc?.username !== currentAccount.username
  ) {
    
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    
    // Add transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // update ui
    updateUI(currentAccount);

    // reset timer
    clearInterval(timer);
    timer = logOutTimer();

  }
});


// Loan
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  // round value down
  const amount = Math.floor(inputLoanAmount.value);

  // Some Method UseCase
  // some() same as includes() but includes() check for EQUALITY and some() is for ANY value which match condition
  if(amount > 0 && 
    currentAccount.movements.some(
      mov => mov >= amount * 0.1
    )
  ) {

    setTimeout(() => {
      // Add Movement 
      currentAccount.movements.push(amount);

      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
    
      // update ui
      updateUI(currentAccount);
    }, 2000);
  }

  inputLoanAmount.value = '';

  // reset timer
  clearInterval(timer);
  timer = logOutTimer();
  
});

// Account Close
btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  
  if(
    inputCloseUsername.value === currentAccount.username &&
    +(inputClosePin.value) === currentAccount.pin
  ){
      
    // alternative indexOf(value)
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    
    // Delete Account obj
    accounts.splice(index, 1);
    
    // Hide UI
    containerApp.style.opacity = 0;
        
  }
      
  // clear field
  inputCloseUsername.value = inputClosePin.value = ''

});

// Sort 
btnSort.addEventListener('click', function(e) {
  
  e.preventDefault();

  displayMovements(currentAccount, !sorted);

  sorted = !sorted;

});











