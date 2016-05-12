'use strict';

const test = require( 'tape' );

test( 'BURST: bursting works', function( t ) {
    const tokenPipe = require( '../index.js' );
    const tp = tokenPipe( {
        fillRate: 3
    } );
    let available = 0;
    for ( let i = 0; i < 10; ++i ) {
        available += tp.consume() ? 1 : 0;
    }
    t.equal( available, 3, 'can burst up to the fill rate' );

    setTimeout( () => {
        for ( let j = 0; j < 10; ++j ) {
            available += tp.consume() ? 1 : 0;
        }

        t.equal( available, 6, 'after timeout, pipe has refilled' );

        t.end();
    }, 1000 );
} );