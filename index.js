'use strict';

const moment = require( 'moment' );

const TokenPipe = {
    period: 1000,
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
        const tokens = Math.min( self.count, self.count * periodDelta );
        const available = tokens >= 1;

        self._lastConsumed = available ? now : self._lastConsumed;

        return available;
    }
};

function createTokenPipe( _options ) {
    const options = Object.assign( {
        period: TokenPipe.period,
        count: TokenPipe.count
    }, _options );


    if ( typeof options.rate === 'string' ) {
        const rateValues = options.rate.split( '/' );
        options.count = parseInt( rateValues[ 0 ], 10 );
        options.period = rateValues[ 1 ];
    }

    let period = typeof options.period === 'string' ? moment.duration( 1, options.period ).asMilliseconds() : options.period;

    return Object.assign( {}, TokenPipe, {
        period: period,
        count: options.count
    } );
}

module.exports = createTokenPipe;
module.exports.TokenPipe = TokenPipe;
