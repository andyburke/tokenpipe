## tokenpipe

A simple, tested implementation of a 'token bucket' algorithm.

## Code Example

```javascript
const TokenPipe = require( 'tokenpipe' );
const tokenPipe = TokenPipe( {
    rate: '10/second'
} );

(function example() {
    if ( tokenPipe.consume() ) {
        console.log( 'below rate limit' );
    }
    else {
        console.log( 'over rate limit' );
    }

    setTimeout( example, Math.random() * 100 );
})();

```

## Motivation

The various token bucket implementations I came across either:

 - didn't have tests
 - weren't standalone, were part of a larger project
 - were complex to configure

## Installation

```
npm install --save tokenpipe
```

## API Reference

### factory method

```javascript
const TokenPipe = require( 'tokenpipe' );

const defaultPipe = TokenPipe(); // defaults to 1/s

const rateDefinedPipe = TokenPipe( {
    rate: '10/minute'
} );

const countAndPeriodDefinedPipe = TokenPipe( {
    count: 10,
    period: 1000 * 60
} );
```

### Object.assign

```javascript
const TokenPipe = require( 'tokenpipe' ).TokenPipe;

const tokenPipe = Object.assign( {}, TokenPipe, {
    count: 10,
    period: 1000 * 60;
} );
```

### TokenPipe.consume()

```javascript
const TokenPipe = require( 'tokenpipe' );
const tokenPipe = TokenPipe( {
    rate: '10/s'
} );

tokenPipe.consume(); // returns true if there are available tokens, false otherwise
```

## Tests

```
npm run test
```

## Contributors

If you'd like to contribute:

 1) Add tests for any new feature or bugfix
 2) Ensure your code passes jshint according to the .jshintrc
 3) Ensure your code is formatted according to the .jsbeautifyrc
 4) Submit a Pull Request

## License

MIT
