export const isObject = (obj) => typeof (obj) === 'object' && obj !== null;

export const isEqual = (key, obj1, obj2) => (
  isObject(obj1[key]) && isObject(obj2[key])
) || obj1[key] === obj2[key];
