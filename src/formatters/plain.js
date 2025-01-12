import _ from 'lodash';

const printValue = (value) => {
  switch (typeof (value)) {
    case 'string': return `'${value}'`;
    case 'object': return value ? '[complex value]' : 'null';
    default: return value;
  }
};

const printDiff = (obj, path) => {
  switch (obj.type) {
    case 'equals': return obj.innerDiff ? obj.innerDiff.map((innerDiff) => printDiff(innerDiff, `${path}${obj.key}.`)).filter((str) => !_.isEmpty(str)).join('\n') : '';
    case 'add': return `Property '${path}${obj.key}' was added with value: ${printValue(obj.newValue)}`;
    case 'remove': return `Property '${path}${obj.key}' was removed`;
    case 'update': return `Property '${path}${obj.key}' was updated. From ${printValue(obj.oldValue)} to ${printValue(obj.newValue)}`;
    default: throw Error(`Unknown diff type ${obj.type}`);
  }
};

export default (diff) => diff
  .map((obj) => printDiff(obj, ''))
  .filter((str) => !_.isEmpty(str))
  .join('\n');
