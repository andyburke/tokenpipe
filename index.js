'use strict';

const moment = require( 'moment' );

const TokenPipe = {
    period: 1000,
    fillRate: 1,
    count: 1,
    _lastConsumed: 0,

    consume: function consume() {
        const self = this;

        const now = Date.now();

        // account for any clock changes underneath us by pretending a time period has passed
        if ( now < self._lastConsumed ) {
            self._lastConsumed = now - self.period;
        }

        const timeDelta = now - self._lastConsumed;
        const periodDelta = timeDelta / self.period;
        const filled = parseInt( self.fillRate * periodDelta, 10 );
        self.count = Math.min( self.fillRate, self.count + filled );

        const available = self.count >= 1;

        if ( available ) {
            self.count--;
            self._lastConsumed = now;
        }

        return available;
    }
};

function createTokenPipe( _options ) {
    const options = Object.assign( {
        period: TokenPipe.period,
        fillRate: TokenPipe.fillRate
    }, _options );

    if ( typeof options.rate === 'string' ) {
        const rateValues = options.rate.split( '/' );
        options.fillRate = parseInt( rateValues[ 0 ], 10 );
        options.period = rateValues[ 1 ];
    }

    let period = typeof options.period === 'string' ? moment.duration( 1, options.period ).asMilliseconds() : options.period;

    return Object.assign( {}, TokenPipe, {
        period: period,
        fillRate: options.fillRate,
        count: typeof options.count === 'number' ? options.count : options.fillRate
    } );
}

module.exports = createTokenPipe;
module.exports.TokenPipe = TokenPipe;