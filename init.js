import { handleInput } from './handlers.js';
import { createOptions } from './helpers.js';
import { fromSelect, toSelect, form } from './selectors.js';

export async function init() {
  const options = await createOptions();
  fromSelect.innerHTML = options;
  toSelect.innerHTML = options;
  form.addEventListener('input', handleInput);
}
