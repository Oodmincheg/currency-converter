const fromSelect = document.querySelector('#from');
const toSelect = document.querySelector('#to');
const amountInput = document.querySelector('#amount');
const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

function getHeaders() {
  const myHeaders = new Headers();
  myHeaders.append('apikey', 'UZYvz6gbt34vjteGe5dRRQoEyhf3nbtm');
  return myHeaders;
}

async function getCurrencies() {
  const requestOptions = {
    redirect: 'follow',
    headers: getHeaders(),
  };

  const response = await fetch(
    'https://api.apilayer.com/exchangerates_data/symbols',
    requestOptions,
  );
  const currencies = await response.json();

  return currencies?.symbols;
}

const rates = {};

async function getRates(base) {
  if (rates[base]) {
    console.log(rates);
    return rates[base];
  }
  console.log(`we don't have rates for this base`);

  const requestOptions = {
    redirect: 'follow',
    headers: getHeaders(),
  };

  const response = await fetch(
    `https://api.apilayer.com/exchangerates_data/latest?base=${base}`,
    requestOptions,
  );
  const data = await response.json();
  rates[base] = data.rates;
  return rates[base];
}

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

//TODO: figure out why 0 happend not NaN
