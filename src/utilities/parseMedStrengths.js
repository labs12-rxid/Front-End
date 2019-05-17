module.exports = function parseMedStrengths(meds) {
  const scaryRegex = /^(\D+)(\d+\.*\d*).+(mg|mcg|IU)/i;

  console.log(meds);

  const regexStrength = (medStr, regex) =>
    medStr
      .split(';')
      .map(ingredient => ingredient.split(regex).filter(Boolean));

  // const typeCheck = (maybeJSON) => {
  //   if (maybeJSON instanceof Array) {
  //     console.log("array")
  //     return maybeJSON
  //   } else if (typeof maybeJSON === 'string') {
  //     console.log("string")
  //     if (typeof JSON.parse(maybeJSON) === 'object') {
  //       return [JSON.parse(maybeJSON)]
  //     } else if (maybeJSON.charAt(0) === '[') {
  //       console.log("string")
  //       return maybeJSON.split('},{').flatMap(array => array)
  //     } else if (maybeJSON.charAt(0) === '{') {
  //       return maybeJSON.split(',')
  //     }
  //   }
  // }

  try {
    // const extractedMeds = typeCheck(meds);
    return meds.map(med => {
      med["strength"] = med["spl_strength"]
        ? regexStrength(med["spl_strength"], scaryRegex)
        : [['unknown', null, null]]
      return med
    });
  } catch(error) {
    console.error(error);
    return meds
  }
}
