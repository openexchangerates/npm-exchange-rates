/**
 * Open Source Exchange Rates API - nodeJS/npm module
 * by Joss Crowcroft | http://josscrowcroft.github.com/open-exchange-rates
 *
 * NB: This module has been DEPRECATED and REPLACED by the improved
 * 'open-exchange-rates' module (https://npmjs.org/package/open-exchange-rates)
 *
 * It's highly recommended that you use that one instead! (This module will no
 * longer work, unless you modify it to include an `app_id` with your requests.
 *
 * ---
 *
 * Basic usage example
 */

// Example usage with money.js, loading data from the openexchangerates.org API:
var fx = require("money"),
	exchange = require("exchange-rates");


// Fire the load function:
exchange.load(function(error) {
	// Apply exchange rates and baserate to money.js `fx` object:
	fx.rates = exchange.rates;
	fx.base = exchange.base;

	// Check it worked (`err` is aliased in `exchange.error`)
	if ( error ) {
		console.log(error.toString());
	}

	// This should now work
	console.log("1 GBP only bags you " + fx(1).from("GBP").to("USD").toFixed(6) + " USD these days. Damn economy.");
});


// `exchange.parse` can be used to implement data from other APIs or services, or for
// validation / error-checking. You could even fall back to local data if the API is unavailable.

// See the readme and http://josscrowcroft.github.com/open-exchange-rates/#nodejs-npm for more
