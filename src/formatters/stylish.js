import _ from 'lodash';

const makeIndent = (depth) => ' '.repeat(4 * depth + 2);

const printObjectFields = (obj, depth) => {
  const innerFields = _.sortBy(_.keys(obj)).map((innerKey) => (_.isPlainObject(obj[innerKey])
    ? `${makeIndent(depth)}  ${innerKey}: ${printObjectFields(obj[innerKey], depth + 1)}`
    : `${makeIndent(depth)}  ${innerKey}: ${obj[innerKey]}`)).join('\n');
  return `{\n${innerFields}\n${makeIndent(depth - 1)}  }`;
};

const printValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    return printObjectFields(value, depth + 1);
  }
  return value;
};

const printDiff = (diffObj, depth) => {
  switch (diffObj.type) {
    case 'equals': return `${makeIndent(depth)}  ${diffObj.key}: ${printValue(diffObj.oldValue, depth)}`;
    case 'nested': return `${makeIndent(depth)}  ${diffObj.key}: {\n`
      + `${diffObj.innerDiff.map((innerObj) => printDiff(innerObj, depth + 1)).join('\n')}\n${makeIndent(depth)}  }`;
    case 'update': return `${makeIndent(depth)}- ${diffObj.key}: ${printValue(diffObj.oldValue, depth)}\n`
      + `${makeIndent(depth)}+ ${diffObj.key}: ${printValue(diffObj.newValue, depth)}`;
    case 'add': return `${makeIndent(depth)}+ ${diffObj.key}: ${printValue(diffObj.newValue, depth)}`;
    case 'remove': return `${makeIndent(depth)}- ${diffObj.key}: ${printValue(diffObj.oldValue, depth)}`;
    default: throw new Error(`Unknown diff type ${diffObj.type}`);
  }
};

export default (diff) => {
  const result = diff.map((obj) => printDiff(obj, 0)).join('\n');
  return `{\n${result}\n}`;
};
