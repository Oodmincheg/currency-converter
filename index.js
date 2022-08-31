import { getRates, getCurrencies } from './api.js';

const fromSelect = document.querySelector('#from');
const toSelect = document.querySelector('#to');
const amountInput = document.querySelector('#amount');
const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

async function createOptions() {
  const currencies = await getCurrencies();
  const options = Object.entries(currencies)
    .map(([key, value]) => `<option value=${key}>${value}</option>`)
    .join('');
  fromSelect.innerHTML = options;
  toSelect.innerHTML = options;
}

async function handleInput() {
  const amount = Number(amountInput.value);
  const rates = await getRates(fromSelect.value);
  console.log(rates);
  const convertedAmount = rates[toSelect.value] * amount;
  resultDiv.textContent = convertedAmount;
}

createOptions();
form.addEventListener('input', handleInput);
