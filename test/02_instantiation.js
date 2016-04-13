'use strict';

const test = require( 'tape' );

test( 'INSTANTIATION: exported method is a factory method', function( t ) {
    const TokenPipe = require( '../index.js' );
    const tokenPipe = TokenPipe();
    t.ok( tokenPipe, 'creates something' );
    t.equal( typeof tokenPipe, 'object', 'creates an object' );
    t.equal( typeof tokenPipe.consume, 'function', 'has a consume method' );
    t.equal( tokenPipe.count, 1, 'defaults to a count of 1' );
    t.equal( tokenPipe.period, 1000, 'defaults to a period of 1 second' );
    t.end();
} );

test( 'INSTANTIATION: factory method accepts options', function( t ) {
    const TokenPipe = require( '../index.js' );
    const tokenPipe = TokenPipe( {
        count: 2,
        period: 2000
    } );
    t.equal( tokenPipe.count, 2, 'accepts count option' );
    t.equal( tokenPipe.period, 2000, 'accepts period option' );
    t.end();
} );

test( 'INSTANTIATION: period option can be specified in human terms ( "hour", "minute" )', function( t ) {
    const TokenPipe = require( '../index.js' );

    t.equal( TokenPipe( {
        period: 'second'
    } ).period, 1000 * 1, 'accepts "second"' );

    t.equal( TokenPipe( {
        period: 'minute'
    } ).period, 1000 * 60, 'accepts "minute"' );

    t.equal( TokenPipe( {
        period: 'hour'
    } ).period, 1000 * 60 * 60, 'accepts "hour"' );

    t.equal( TokenPipe( {
        period: 'day'
    } ).period, 1000 * 60 * 60 * 24, 'accepts "day"' );

    t.end();
} );

test( 'INSTANTIATION: factory function accepts a rate option', function( t ) {
    const TokenPipe = require( '../index.js' );

    const tp1 = TokenPipe( {
        rate: '2/second'
    } );
    t.equal( tp1.count, 2, '2/second = count of 2' );
    t.equal( tp1.period, 1000 * 1, '2/second = period of 1 second' );

    const tp2 = TokenPipe( {
        rate: '10/minute'
    } );
    t.equal( tp2.count, 10, '10/minute = count of 10' );
    t.equal( tp2.period, 1000 * 60, '10/minute = period of 1 minute' );

    const tp3 = TokenPipe( {
        rate: '100/h'
    } );
    t.equal( tp3.count, 100, '100/hour = count of 100' );
    t.equal( tp3.period, 1000 * 60 * 60, '100/hour = period of 1 hour' );

    t.end();
} );

test( 'INSTANTIATION: can create an object using Object.assign', function( t ) {
    const TokenPipe = require( '../index.js' );
    const tokenPipe = Object.assign( {}, TokenPipe.TokenPipe, {
        count: 2,
        period: 2000
    } );
    t.ok( tokenPipe, 'creates something' );
    t.equal( typeof tokenPipe, 'object', 'creates an object' );
    t.equal( typeof tokenPipe.consume, 'function', 'has a consume method' );
    t.equal( tokenPipe.count, 2, 'allows overriding count' );
    t.equal( tokenPipe.period, 2000, 'allows overriding period' );
    t.end();
} );
