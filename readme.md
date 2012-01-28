# Open Exchange Rates module for nodeJS/npm

	$ npm install exchange-rates

A nodeJS module that loads up-to-date exchange rate data from the Open Exchange Rates API project (via `openexchangerates.org/latest.json`), or any other service you specify.

Features override-able validation/parsing of raw API data, so that you can use it to load data from any service and parse/format it according to needs.

Works great with money.js (`npm install money`) - a tiny currency-conversion library for nodeJS (and web).

Requires `http-agent`

To install, type `npm install exchange-rates` in the terminal. Then see below.

## Example Usage:

#### Start with this:

	var exchange = require("exchange-rates");

#### Default - load data from openexchangerates.org:

	exchange.load(function() {
		// You can now use `exchange.rates`, `exchange.base` and `exchange.timestamp`
	});

#### Usage with some other API:

	// Custom callback function to parse the returned API data:
	exchange.parse = function(data, exchange) {
		exchange.base = "USD";
		exchange.rates = parseJSON(data);
		return exchange;
	};
	
	// Load the API data:
	exchange.load("http://mycoolwebservi.ce/api.json", function() {
		// You can now use `exchange.rates` and `exchange.base` as defined in `parse()`
	});

	// You can also set the URL globally, then just load as normal:
	exchange.url = "http://mycoolwebservi.ce/api.json";

#### Usage with money.js:

	var exchange = require("exchange-rates"),
		fx = require("money");
	
	exchange.load(function() {
		// Apply exchange rates and base rate to `fx` object:
		fx.rates = exchange.rates;
		fx.base = exchange.base;
		
		// money.js is all set up:
		fx(1).from("GBP").to("USD"); // 1.586 or etc.
	});

## More Info

For more info and examples, check out the **[Open Source Exchange Rates homepage](http://josscrowcroft.github.com/open-exchange-rates)**

### Changelog

**0.1.1** - make package.json dependency list an object

**0.1.0** - first version
