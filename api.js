function getHeaders() {
  const myHeaders = new Headers();
  myHeaders.append('apikey', 'UZYvz6gbt34vjteGe5dRRQoEyhf3nbtm');
  return myHeaders;
}

export async function getCurrencies() {
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
    `https://api.apilayer.com/exchangerates_data/latest?base=${base}`,
    requestOptions,
  );
  const data = await response.json();
  rates[base] = data.rates;
  return rates[base];
}
