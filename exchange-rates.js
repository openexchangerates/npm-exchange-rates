/**
 * Open Source Exchange Rates API - nodeJS/npm module - v0.1.2
 * by Joss Crowcroft | http://www.josscrowcroft.com
 *
 * NB: This module has been DEPRECATED and REPLACED by the improved
 * 'open-exchange-rates' module (https://npmjs.org/package/open-exchange-rates)
 *
 * It's highly recommended that you use that one instead! (This module will no
 * longer work, unless you modify it to include an `app_id` with your requests.
 *
 * ---
 *
 * Loads up-to-date exchange rate data from the https://openexchangerates.org API
 * or any other service. Doesn't mind what format you need the exchange rates
 * in or where you get them from. Easy to override post-receive parsing method.
 *
 * Requires: http-agent
 *
 * Usage:
 *     var exchange = require("exchange-rates");
 *     exchange.load([url], function(error, data) {
 *         // if no `error`, `exchange.rates` and `exchange.base` are available
 *         // `error` is the same as `exchange.error` and contains debug info
 *         // `data` is the raw response that was passed to `exchange.parse`
 *     });
 *
 * Define your own `exchange.parse` if needed for another API or service.
 *
 * Params:
 * `url` is optional, defaults to 'http://openexchangerates.org/latest.json'
 * (specify another to load rates from a different service or local file)
 * `callback` function is only executed async once the rates have been loaded.
 */

(function() {
	var exchange = {};

	// Module version:
	exchange.version = "0.1.1";

	// Default API URL, loads data from the Open Exchange Rates project:
	exchange.url = "http://openexchangerates.org/latest.json"

	// Loads exchange rates from a given URL (default `exchange.url`):
	exchange.load = function(url, callback) {
		if (typeof url === "function") callback = url;
		url = (typeof url === "string") ? url : exchange.url;

		// Create the http agent that will grab the data:
		var agent = require("http-agent").create('', [{method: 'GET', uri: url}]);
		agent.addListener('next', function (err, agent) {
			var data = (agent && agent.body) ? agent.body : null;
			exchange.error = err;

			// Parse the API response:
			if ( !err ) {
				exchange.parse.call(exchange, data, exchange);
			}

			// Fire callback function, passing in any error and the raw data:
			if ( typeof callback === "function" ) {
				callback(exchange.error, data);
			}
		});

		// Start http-agent:
		agent.start();
	};

	// The rates object and base currency:
	exchange.rates = {};
	exchange.base = "";

	// If something went wrong, you'll hear about it via `exchange.error`
	exchange.error = "";

	// The parse callback function takes the raw API data and parses/validates it.
	// Default implementation is designed for the openexchangerates.org API data.
	// Replace with custom parsing/validation logic for other APIs or as required.
	// NB: `this` refers to the module object (also referenced in 2nd argument)
	exchange.parse = function(data, exchange) {

		// Try to parse the data as JSON:
		try {
			data = JSON.parse(data);
		} catch(err) {
			exchange.error = "Error in parsing JSON rates data: " + err.toString();
			return exchange;
		}

		// The Open Exchange Rates API response object contains the base currency,
		// an exchange rates hash and the unix time when the rates were collected:
		if ( data && data.base && data.rates ) {
			exchange.base = data.base;
			exchange.rates = data.rates;
			exchange.timestamp = data.timestamp * 1000;
		} else {
			exchange.error = "No rates or base currency returned from API";
		}

		// exchange.parse
		return exchange;
	};

	// Export the module:
	module.exports = exchange;
}())
