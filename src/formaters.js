import _ from 'lodash';
import { isObject } from './utils.js';

const makeIndent = (depth) => ' '.repeat(4 * depth + 2);

const printObjectFieldsStylish = (key, obj, action, depth) => {
  const result = `${makeIndent(depth)}${action} ${key}: {`;
  const innerFields = _.sortBy(_.keys(obj)).map((innerKey) => (isObject(obj[innerKey])
    ? printObjectFieldsStylish(innerKey, obj[innerKey], ' ', depth + 1)
    : `${makeIndent(depth + 1)}  ${innerKey}: ${obj[innerKey]}`)).join('\n');
  return `${result}\n${innerFields}\n${makeIndent(depth)}  }`;
};

const printValueStylish = (diffObj) => {
  if (isObject(diffObj.value)) {
    if (diffObj.action !== ' ') {
      return printObjectFieldsStylish(diffObj.key, diffObj.value, diffObj.action, diffObj.depth);
    }
    return `${makeIndent(diffObj.depth)}${diffObj.action} ${diffObj.key}:`;
  }
  return `${makeIndent(diffObj.depth)}${diffObj.action} ${diffObj.key}: ${diffObj.value}`;
};

export const printMessageStylish = (diff) => {
  let result = '';
  let lastDepth = 0;
  diff.forEach((obj) => {
    if (obj.depth > lastDepth) {
      result = `${result} {`;
    }
    if (obj.depth < lastDepth) {
      for (let i = lastDepth - 1; i >= obj.depth; i -= 1) {
        result = `${result}\n${makeIndent(i)}  }`;
      }
    }
    lastDepth = obj.depth;
    result = `${result}\n${printValueStylish(obj)}`;
  });
  return `{${result}\n}`;
};

export const printMessageOther = () => {
  throw new Error('Not implemented yet');
};
