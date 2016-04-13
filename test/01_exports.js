'use strict';

const test = require( 'tape' );

test( 'EXPORTS: module exports something', function( t ) {
    const TokenPipe = require( '../index.js' );
    t.ok( TokenPipe, 'exports ok' );
    t.end();
} );

test( 'EXPORTS: module exports a function', function( t ) {
    const TokenPipe = require( '../index.js' );
    t.equal( typeof TokenPipe, 'function', 'exports a function' );
    t.end();
} );

test( 'EXPORTS: exported function has reference to bare object', function( t ) {
    const TokenPipe = require( '../index.js' );
    t.ok( TokenPipe.TokenPipe, 'has a reference' );
    t.equal( typeof TokenPipe.TokenPipe, 'object', 'reference is an object' );
    t.end();
} );
