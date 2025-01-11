import _ from 'lodash';

const getDepth = (fullPath) => fullPath.split('.').length - 1;

const makeIndent = (depth) => ' '.repeat(4 * depth + 2);

const getMarker = (type) => {
  switch (type) {
    case 'add': return '+';
    case 'remove': return '-';
    case 'equals': return ' ';
    default: throw new Error(`Unknown type ${type}`);
  }
};

const printObjectFields = (key, obj, action, depth) => {
  const result = `${makeIndent(depth)}${action} ${key}: {`;
  const innerFields = _.sortBy(_.keys(obj)).map((innerKey) => (_.isPlainObject(obj[innerKey])
    ? printObjectFields(innerKey, obj[innerKey], ' ', depth + 1)
    : `${makeIndent(depth + 1)}  ${innerKey}: ${obj[innerKey]}`)).join('\n');
  return `${result}\n${innerFields}\n${makeIndent(depth)}  }`;
};

const printValue = (diffObj) => {
  const actionMarker = getMarker(diffObj.type);
  if (_.isPlainObject(diffObj.value)) {
    if (diffObj.type !== 'equals') {
      return printObjectFields(
        diffObj.key,
        diffObj.value,
        actionMarker,
        getDepth(diffObj.fullPath),
      );
    }
    return `${makeIndent(getDepth(diffObj.fullPath))}${actionMarker} ${diffObj.key}:`;
  }
  return `${makeIndent(getDepth(diffObj.fullPath))}${actionMarker} ${diffObj.key}: ${diffObj.value}`;
};

export default (diff) => {
  let result = '';
  let lastDepth = 0;
  diff.forEach((obj) => {
    const depth = getDepth(obj.fullPath);
    if (depth > lastDepth) {
      result = `${result} {`;
    }
    if (depth < lastDepth) {
      for (let i = lastDepth - 1; i >= depth; i -= 1) {
        result = `${result}\n${makeIndent(i)}  }`;
      }
    }
    lastDepth = depth;
    result = `${result}\n${printValue(obj)}`;
  });
  return `{${result}\n}`;
};
