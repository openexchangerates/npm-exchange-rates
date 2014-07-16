/**
 * open-exchange-rates npm module - v0.3
 * by Open Exchange Rates - https://openexchangerates.org
 *
 * Basic usage example - with money.js, and loading data from the Open
 * Exchange Rates API.
 *
 * Check out the readme for information and integration details about:
 * - Falling back to local/cached exchange rates, if the request fails
 * - Advanced API features and services provided by Open Exchange Rates
 * - Debugging API and module errors
 *
 * Documentation for money.js: http://openexchangerates.github.io/money.js
 *
 * See readme.md for further examples
 */

// Modules:
var fx = require('money'),
	oxr = require('open-exchange-rates');

// Set App ID (required):
oxr.set({
	app_id: 'YOUR_APP_ID'
});

// Get latest exchange rates from API; pass to callback function when loaded:
oxr.latest(function(error) {

	if ( error ) {
		// `error` will contain debug info if something went wrong:
		console.log( 'ERROR loading data from Open Exchange Rates API! Error was:' )
		console.log( error.toString() );

		// Fall back to hard-coded rates if there was an error (see readme)
		return false;
	}

	// Rates are now stored in `oxr` object as `oxr.rates` - enjoy!
	// Examples to follow:

	// The timestamp (published time) of the rates is in `oxr.timestamp`:
	console.log( 'Exchange rates published: ' + (new Date(oxr.timestamp)).toUTCString() );

	// Each currency is a property in the object/hash, e.g:
	console.log( 'USD -> AED: ' + oxr.rates.AED );
	console.log( 'USD -> HKD: ' + oxr.rates['HKD'] );

	// To load rates into the money.js (fx) library for easier currency
	// conversion, simply apply the rates and base currency like so:
	fx.rates = oxr.rates;
	fx.base = oxr.base;

	// money.js is now initialised with the exchange rates, so this will work:
	var amount = fx(10).from('EUR').to('GBP').toFixed(6);
	console.log( '10 EUR in GBP: ' + amount );

});
