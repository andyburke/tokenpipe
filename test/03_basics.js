'use strict';

const test = require( 'tape' );

test( 'BASICS: can consume', function( t ) {
    const TokenPipe = require( '../index.js' );
    const tokenPipe = TokenPipe();
    t.ok( tokenPipe.consume(), 'can consume one time' );
    t.end();
} );

test( 'BASICS: consume at too high a rate fails', function( t ) {
    const TokenPipe = require( '../index.js' );
    const tokenPipe = TokenPipe();
    t.ok( tokenPipe.consume(), 'can consume one time' );
    t.notOk( tokenPipe.consume(), 'can not consume again immediately' );
    t.end();
} );

test( 'BASICS: can consume at specified rate (10 second test)', function( t ) {
    const TokenPipe = require( '../index.js' );
    const tokenPipe = TokenPipe();

    const start = Date.now();
    (function periodic() {
        const now = Date.now();
        if ( now - start > 1000 * 10 ) {
            t.pass( 'consuming at specified rate works' );
            t.end();
            return;
        }

        if ( !tokenPipe.consume() ) {
            t.fail( 'no tokens available' );
            t.end();
            return;
        }

        setTimeout( periodic, 1000 );
    })();
} );

test( 'BASICS: consuming at too high a rate fails at the expected rate (10 second test)', function( t ) {
    const TokenPipe = require( '../index.js' );
    const tokenPipe = TokenPipe();

    const rate = 500;
    const EPISILON = 0.01;
    let executions = 0;
    let failures = 0;

    const start = Date.now();
    (function periodic() {
        const now = Date.now();
        if ( now - start > 1000 * 10 ) {
            const failureRate = failures / executions;
            const expectedFailureRate = rate / tokenPipe.period;
            const delta = Math.abs( failureRate - expectedFailureRate );
            const ok = delta < EPISILON;

            if ( !ok ) {
                t.fail( `FAIL: failure rate: ${failureRate} / expected failure rate: ${expectedFailureRate} / delta: ${delta} / EPISILON: ${EPISILON}` );
            }
            else {
                t.pass( 'failure rate within expected norm' );
            }
            t.end();
            return;
        }

        failures += tokenPipe.consume() ? 0 : 1;
        ++executions;

        setTimeout( periodic, rate );
    })();
} );
