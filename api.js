import { apiKey, baseUrl } from './config.js';

function getHeaders() {
  const myHeaders = new Headers();
  myHeaders.append('apikey', apiKey);
  return myHeaders;
}

export async function getCurrencies() {
  const requestOptions = {
    redirect: 'follow',
    headers: getHeaders(),
  };

  const response = await fetch(`${baseUrl}/symbols`, requestOptions);
  const currencies = await response.json();

  return currencies?.symbols;
}

const rates = {};

export async function getRates(base) {
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
    `${baseUrl}/latest?base=${base}`,
    requestOptions,
  );
  const data = await response.json();
  rates[base] = data.rates;
  return rates[base];
}
