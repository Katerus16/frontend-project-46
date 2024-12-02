import printStylish from './stylish.js';
import printPlain from './plain.js';
import printJson from './json.js';

export default (formatterType) => (diff) => {
  switch (formatterType) {
    case 'stylish': return printStylish(diff);
    case 'plain': return printPlain(diff);
    case 'json': return printJson(diff);
    default: throw new Error(`Unknown formatter type: ${formatterType}`);
  }
};
