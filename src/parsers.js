import yaml from 'js-yaml';

const parseContent = (content, type) => {
  switch (type) {
    case 'json': return JSON.parse(content);
    case 'yaml': return yaml.load(content);
    default: return null;
  }
};

export default parseContent;
