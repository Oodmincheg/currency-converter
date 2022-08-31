import { getCurrencies } from './api.js';

export async function createOptions() {
  const currencies = await getCurrencies();
  const options = Object.entries(currencies)
    .map(([key, value]) => `<option value=${key}>${value}</option>`)
    .join('');
  return options;
}
