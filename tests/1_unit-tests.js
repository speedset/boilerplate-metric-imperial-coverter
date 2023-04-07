const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Function convertHandler.getNum(input)', () => {
    test('read a whole number input.', done => {
      const input = '2L'
      assert.equal(convertHandler.getNum(input), 2)
      done()
    })
    test('read a decimal number input.', done => {
      const input = '10.5gal'
      assert.equal(convertHandler.getNum(input), 10.5)
      done()
    })
    test('read a fractional input.', done => {
      const input = '1/2km'
      assert.equal(convertHandler.getNum(input), 0.5)
      done()
    })
    test('read a fractional input with a decimal.', done => {
      const input = '12/4.8mi'
      assert.equal(convertHandler.getNum(input), 2.5)
      done()      
    })    
    test('return an error on a double-fraction (i.e. 3/2/3).', done => {
      const input = '3/2/3lbs'
      assert.equal(convertHandler.getNum(input), null)
      done()
    })    
    test('default to a numerical input of 1 when no numerical input is provided.', done => {
      const input = 'lbs'
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })   
  })

  suite( 'Function convertHandler.getUnit(input)', ( ) => {
    test( 'For Each Valid Unit Inputs', ( done ) => {
      const input = [ 'gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG' ];
      input.forEach( ( el ) => {
        assert.equal( convertHandler.getUnit( el ), el.toLowerCase() );
      } );
      done( );
    } );
    
    test( 'Unknown Unit Input', ( done ) => {
      const input = 'whatever';
      assert.equal( convertHandler.getUnit( input ), null );
      done( );
    } );  
    
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', ( ) => {
    
    test('For Each Valid Unit Inputs', ( done ) => {
      const input  = [ 'gal', 'l', 'mi', 'km', 'lbs', 'kg' ];
      const expect = [ 'L', 'gal', 'km', 'mi', 'kg', 'lbs' ];
      input.forEach( ( el,i ) => {
        assert.equal( convertHandler.getReturnUnit( el ), expect[ i ] );
      } );
      done( );
    } );

  } );
  
  suite('Function convertHandler.spellOutUnit(unit)', ( ) => {
    
    test('For Each Valid Unit Inputs', ( done ) => {
      const input  = [ 'gal', 'l', 'mi', 'km', 'lbs', 'kg' ];
      const expect = [ 'gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms' ];
      input.forEach( ( el,i ) => {
        assert.strictEqual( convertHandler.spellOutUnit( el ), expect[ i ] );
      } );
      done( );
    } );

  } );

  suite('Function convertHandler.convert(num, unit)', () => {    
    test('Gal to L', (done) => {
			assert.equal(convertHandler.convert(5, 'gal'), 18.92705);
			done();
		});

    test('L to Gal', ( done ) => {
      assert.equal(convertHandler.convert(6, 'l'), 1.58503);
      done();
    } );

    test('Mi to Km', ( done ) => {
      assert.equal(convertHandler.convert(10, 'mi'), 16.09340);
      done();  
    } );

    test('km to mi', ( done ) => {     
      assert.equal(convertHandler.convert(9.65604, 'km'),6);
      done();  
    } );

    test('Lbs to Kg', ( done ) => {     
      assert.equal(convertHandler.convert(4, 'lbs'), 1.81437);
      done();
    } );

    test('Kg to Lbs', ( done ) => {    
      assert.equal(convertHandler.convert(6.3/2, 'kg'),6.94457);
      done();
    } ); 
  })
});