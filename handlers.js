import { getRates } from './api.js';
import { amountInput, fromSelect, resultDiv, toSelect } from './selectors.js';

export async function handleInput() {
  const amount = Number(amountInput.value);
  const rates = await getRates(fromSelect.value);
  console.log(rates);
  const convertedAmount = rates[toSelect.value] * amount;
  resultDiv.textContent = convertedAmount;
}
