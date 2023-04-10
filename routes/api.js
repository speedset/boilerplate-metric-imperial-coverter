'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    //console.log(req.query)
    const {input} = req.query;
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input);
    if ( !initNum && !initUnit )  return res.send( 'invalid number and unit' );
    else if ( !initNum )          return res.send( 'invalid number' );
    else if ( !initUnit )         return res.send( 'invalid unit' );
    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const toString = convertHandler.getString(initNum,initUnit,returnNum,returnUnit)
    res.send(toString)
  })
};
