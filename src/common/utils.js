const { getObjectWithChosenFields, getObjectWithCutoutFields } = require("./helpers");

/**
 * SELECT FIELDS FROM DATA
 *
 * '-' is modifier needed to cutout fields from data
 * All fields must be with modifier '-' or without it
 **/
const select = (data, fields) => {
  if(data && fields) {
    const MARKER_OF_CUTOUT = fields.every(field => field.charAt(0) === "-");

    if(typeof data === "object") {
      if(!Array.isArray(data)) {
        if(MARKER_OF_CUTOUT) {
          return getObjectWithCutoutFields(data, fields);
        } else {
          return getObjectWithChosenFields(data, fields);
        }
      } else {
        return data.reduce((acc, curr) => {
          if(MARKER_OF_CUTOUT) {
            const obj = getObjectWithCutoutFields(curr, fields);
            acc.push(obj);
          } else {
            const obj = getObjectWithChosenFields(curr, fields);
            acc.push(obj);
          }
          return acc;
        }, []);
      }
    }
  } else {
    return data;
  }
};

module.exports = {
  select
};
