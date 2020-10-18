const {
  getObjectWithChosenFields,
  getObjectWithCutoutFields,
  reduceObjToString
} = require('./helpers');

/**
 * SELECT FIELDS FROM DATA
 *
 * '-' is modifier needed to cutout fields from data
 * All fields must be with modifier '-' or without it
 **/
const select = (data, fields) => {
  if (data && fields) {
    const MARKER_OF_CUTOUT = fields.every(field => field.charAt(0) === '-');

    if (typeof data === 'object') {
      if (!Array.isArray(data)) {
        if (MARKER_OF_CUTOUT) {
          return getObjectWithCutoutFields(data, fields);
        }
        return getObjectWithChosenFields(data, fields);
      }
      return data.reduce((acc, curr) => {
        if (MARKER_OF_CUTOUT) {
          const obj = getObjectWithCutoutFields(curr, fields);
          acc.push(obj);
        } else {
          const obj = getObjectWithChosenFields(curr, fields);
          acc.push(obj);
        }
        return acc;
      }, []);
    }
  } else {
    return data;
  }
};

const throwErrorsByEntityIds = (ids, entityName) => {
  if (typeof ids === 'object') {
    const params = reduceObjToString(ids);

    throw new Error(
      `Error! ${entityName} with params: ${params} doesn't exists`
    );
  } else {
    throw new Error(`Error! ${entityName} with id = ${ids} doesn't exists`);
  }
};

module.exports = {
  select,
  throwErrorsByEntityIds
};
