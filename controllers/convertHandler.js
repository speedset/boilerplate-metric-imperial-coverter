function ConvertHandler() {
  const units = {
    gal: ['gallons', 'L', 3.78541],
    l: ['liters', 'gal', 0.26417],
    kg: ['kilograms', 'lbs', 2.20462],
    lbs: ['pounds', 'kg', 0.453592],
    mi: ['miles', 'km', 1.60934],
    km: ['kilometers', 'mi', 0.621371]
  };

  const divideFraction = (input) => {
    let result = input.split('/').map(n => parseFloat(n)).filter(n => !isNaN(n));
    let isValid = input.match(/\//g) === null ? 0 : input.match(/\//g).length
    return isValid < 2 ? result.reduce((a, b) => a / b): null;
  }

  this.getNum = function (input) {
    let result = input.replace(/[^0-9\.\/]/g, '') || 1;
    return result !== 1 ? divideFraction(result) : 1;
  };

  this.getUnit = function (input) {
    let result = Object.keys(units).find(key => key.toLowerCase() === input.toLowerCase().replace(/[^a-z]/g, ''))
    return units.hasOwnProperty(result) ? result : null;
  };

  this.getReturnUnit = function (initUnit) {
    return units[initUnit][1];
  };

  this.spellOutUnit = function (unit) {
    return units[unit.toLowerCase()][0];
  };

  this.convert = function (initNum, initUnit) {
    switch (initUnit.toLowerCase()) {
      case "gal":
        return (initNum * 3.78541).toFixed(5);
      case "l":
        return (initNum / 3.78541).toFixed(5);
      case "kg":
        return (initNum / 0.453592).toFixed(5);
      case "lbs":
        return (initNum * 0.453592).toFixed(5);
      case "mi":
        return (initNum * 1.60934).toFixed(5);
      case "km":
        return (initNum / 1.60934).toFixed(5);
      default:
        break;    
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return {
      initNum, initUnit: units[returnUnit.toLowerCase()][1], returnNum:parseFloat(returnNum), returnUnit,
      string: initNum + ' ' + this.spellOutUnit(initUnit)
        + ' converts to ' + returnNum + ' '
        + this.spellOutUnit(returnUnit)
    };
  };
}

module.exports = ConvertHandler;
