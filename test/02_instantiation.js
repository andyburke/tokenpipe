'use strict';

const test = require( 'tape' );

test( 'INSTANTIATION: exported method is a factory method', function( t ) {
    const tokenPipe = require( '../index.js' );
    const tp = tokenPipe();
    t.ok( tp, 'creates something' );
    t.equal( typeof tp, 'object', 'creates an object' );
    t.equal( typeof tp.consume, 'function', 'has a consume method' );
    t.equal( tp.fillRate, 1, 'defaults to a fillRate of 1' );
    t.equal( tp.count, 1, 'defaults to a count of 1' );
    t.equal( tp.period, 1000, 'defaults to a period of 1 second' );
    t.end();
} );

test( 'INSTANTIATION: factory method accepts options', function( t ) {
    const tokenPipe = require( '../index.js' );
    const tp = tokenPipe( {
        count: 2,
        period: 2000
    } );
    t.equal( tp.count, 2, 'accepts count option' );
    t.equal( tp.period, 2000, 'accepts period option' );
    t.end();
} );

test( 'INSTANTIATION: period option can be specified in human terms ( "hour", "minute" )', function( t ) {
    const tokenPipe = require( '../index.js' );

    t.equal( tokenPipe( {
        period: 'second'
    } ).period, 1000 * 1, 'accepts "second"' );

    t.equal( tokenPipe( {
        period: 'minute'
    } ).period, 1000 * 60, 'accepts "minute"' );

    t.equal( tokenPipe( {
        period: 'hour'
    } ).period, 1000 * 60 * 60, 'accepts "hour"' );

    t.equal( tokenPipe( {
        period: 'day'
    } ).period, 1000 * 60 * 60 * 24, 'accepts "day"' );

    t.end();
} );

test( 'INSTANTIATION: factory function accepts a rate option', function( t ) {
    const tokenPipe = require( '../index.js' );

    const tp1 = tokenPipe( {
        rate: '2/second'
    } );
    t.equal( tp1.fillRate, 2, '2/second = fillRate of 2' );
    t.equal( tp1.period, 1000 * 1, '2/second = period of 1 second' );
    t.equal( tp1.count, 2, '2/second = defaults to full' );

    const tp2 = tokenPipe( {
        rate: '10/minute',
        count: 0
    } );
    t.equal( tp2.fillRate, 10, '10/minute = fillRate of 10' );
    t.equal( tp2.period, 1000 * 60, '10/minute = period of 1 minute' );
    t.equal( tp2.count, 0, '10/minute = can force to empty' );

    const tp3 = tokenPipe( {
        rate: '100/h'
    } );
    t.equal( tp3.fillRate, 100, '100/hour = fillRate of 100' );
    t.equal( tp3.period, 1000 * 60 * 60, '100/hour = period of 1 hour' );
    t.equal( tp3.count, 100, '100/hour = defaults to full' );

    t.end();
} );

test( 'INSTANTIATION: can create an object using Object.assign', function( t ) {
    const tokenPipe = require( '../index.js' );
    const tp = Object.assign( {}, tokenPipe.TokenPipe, {
        count: 2,
        period: 2000
    } );
    t.ok( tp, 'creates something' );
    t.equal( typeof tp, 'object', 'creates an object' );
    t.equal( typeof tp.consume, 'function', 'has a consume method' );
    t.equal( tp.count, 2, 'allows overriding count' );
    t.equal( tp.period, 2000, 'allows overriding period' );
    t.end();
} );