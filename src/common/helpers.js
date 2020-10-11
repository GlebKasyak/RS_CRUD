const getObjectWithCutoutFields = (obj, fields) => {
  const filterData = {};

  fields.forEach(field => {
    for (const key in obj) {
      if (`-${key}` !== field) {
        filterData[key] = obj[key];
      }
    }
  });

  return filterData;
};

const getObjectWithChosenFields = (obj, fields) => {
  const filterData = {};

  fields.forEach(field => {
    for (const key in obj) {
      if (key === field) {
        filterData[key] = obj[key];
      }
    }
  });

  return filterData;
};

const checkRequiredFields = (data, fields) => {
  const missingFields = [];
  const splitFields = fields.map(field => field.split('.'));

  const existsAllRequiredFields = splitFields
    .map(filed => {
      if (Boolean(data[filed[0]])) {
        if (filed.length === 1) {
          return true;
        }
      } else {
        missingFields.push(filed[0]);
        return false;
      }
    })
    .every(i => i);

  if (existsAllRequiredFields) {
    return true;
  }
  return missingFields;
};

const subString = (string, startSymbol, endSymbol) =>
  string.substring(startSymbol, endSymbol);

const findEntityByIds = (entity, ids) => {
  if (typeof ids === 'object') {
    const keys = Object.keys(ids);
    const value = Object.values(ids);
    const markers = [];

    for (let i = 0; i < keys.length; i++) {
      if (value[i] === entity[keys[i]]) {
        markers.push(true);
      } else {
        markers.push(false);
      }
    }
    return markers.every(m => m);
  }

  return entity.id === ids;
};

module.exports = {
  getObjectWithCutoutFields,
  getObjectWithChosenFields,
  checkRequiredFields,
  subString,
  findEntityByIds
};
