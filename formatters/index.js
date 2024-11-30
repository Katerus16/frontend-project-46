import printStylish from './stylish.js';
import printPlain from './plain.js';

export default (formatterType) => (diff) => {
  switch (formatterType) {
    case 'stylish': return printStylish(diff);
    case 'plain': return printPlain(diff);
    default: throw new Error(`Unknown formatter type: ${formatterType}`);
  }
};
