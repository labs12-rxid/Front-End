module.exports = function parseMedStrengths(meds) {
  const scaryRegex = /^([^0-9]*?)(\d*[.]?\d*)(\D*?)$/gi;

  const regexStrength = (medStr, regex) =>
    medStr
      .split(';')
      .filter(Boolean)
      .map(ingredient => ingredient.split(regex).filter(Boolean));

  const fixToJSON = maybeJSON => {
    if (maybeJSON instanceof Array) {
      if (maybeJSON.length === 1) {
        return [JSON.parse(maybeJSON[0])];
      } else if (
        maybeJSON.every(med => (typeof med !== 'object' ? true : false))
      ) {
        return maybeJSON
          .map(JSONchunk => JSON.parse(`[${JSONchunk.slice()}]`))
          .flatMap(array => array);
      } else {
        return maybeJSON;
      }
    } else if (typeof maybeJSON === 'string') {
      if (maybeJSON.charAt(0) === '[') {
        return maybeJSON.split(',').flatMap(array => array);
      } else if (maybeJSON.charAt(0) === '{') {
        return JSON.parse(`[${maybeJSON.slice()}]`);
      }
    }
  };

  try {
    const preppedMeds = fixToJSON(meds);
    return preppedMeds.map(med => {
      med['strength'] = med['spl_strength']
        ? regexStrength(med['spl_strength'], scaryRegex)
        : [['unknown', null, null]];
      return med;
    });
  } catch (error) {
    console.error(error);
    return meds;
  }
};
