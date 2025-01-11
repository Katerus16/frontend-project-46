const printValue = (obj) => {
  switch (typeof (obj.value)) {
    case 'string': return `'${obj.value}'`;
    case 'object': return obj.value ? '[complex value]' : 'null';
    default: return obj.value;
  }
};

const handleAddedField = (obj, lastObj) => {
  if (obj.key === lastObj.key && lastObj.type === 'remove') {
    return [
      `Property '${obj.fullPath}' was updated. From ${printValue(lastObj)} to ${printValue(obj)}`,
    ];
  }
  if (lastObj.type === 'remove') {
    return [
      `Property '${lastObj.fullPath}' was removed`,
      `Property '${obj.fullPath}' was added with value: ${printValue(obj)}`,
    ];
  }
  return [
    `Property '${obj.fullPath}' was added with value: ${printValue(obj)}`,
  ];
};

const handleRemovedOrEqualsField = (obj, lastObj) => {
  if (obj.key !== lastObj.key && lastObj.type === 'remove') {
    return [
      `Property '${lastObj.fullPath}' was removed`,
    ];
  }
  return [];
};

export default (diff) => {
  const result = [];
  let lastObj = {};
  diff.forEach((obj) => {
    switch (obj.type) {
      case 'add': result.push(...handleAddedField(obj, lastObj)); break;
      default: result.push(...handleRemovedOrEqualsField(obj, lastObj)); break;
    }
    lastObj = obj;
  });
  if (lastObj.type === 'remove') {
    result.push(`Property '${lastObj.fullPath}' was removed`);
  }
  return result.join('\n');
};
