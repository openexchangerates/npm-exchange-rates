# Open Exchange Rates npm/nodeJS module

nodeJS/npm wrapper for the **[Open Exchange Rates API](http://openexchangerates.org "Free reliable exchange rates/currency conversion data API")** service. Loads up-to-date or historical currency/exchange rate data from the API, for seamless server-side integration.

Requires a free or paid App ID to connect to the service, **[available here](https://openexchangerates.org/signup "Open Exchange Rates API App ID API Key signup")**.


## Introduction

	$ npm install open-exchange-rates


To install, type `npm install open-exchange-rates` in the terminal.

Requires: `http-agent`


## Example Usage:

See the **example.js** script in this repository for a basic, working example.

#### Load the module:

	var oxr = require('open-exchange-rates');

#### Load the latest rates from https://openexchangerates.org:

	var oxr = require('open-exchange-rates');
	oxr.set({ app_id: 'YOUR_APP_ID' })
	
	oxr.latest(function() {
		// You can now use `oxr.rates`, `oxr.base` and `oxr.timestamp`
	});

#### Get historical rates ("YYYY-MM-DD"):

	var oxr = require('open-exchange-rates');
	oxr.set({ app_id: 'YOUR_APP_ID' })
	
	oxr.historical('2001-02-03', function() {
		// You can now use `oxr.rates`, `oxr.base` and `oxr.timestamp`
	});

#### Currency conversion with money.js (fx) module:

**[money.js](http://openexchangerates.github.io/money.js "JavaScript and NodeJS Currency Conversion Library")** (`npm install money`) is a tiny JavaScript currency-conversion library for web and nodeJS.

	var oxr = require('open-exchange-rates'),
		fx = require('money');
	
	oxr.set({ app_id: 'YOUR_APP_ID' })
	
	oxr.latest(function() {
		// Apply exchange rates and base rate to `fx` library object:
		fx.rates = oxr.rates;
		fx.base = oxr.base;
		
		// money.js is ready to use:
		fx(100).from('HKD').to('GBP'); // ~8.0424
	});

#### Advanced API Features:

Advanced API features (such as Time Series requests and real-time value conversion) will be added to this module in future.


## More Info

For more information, documentation, examples and showcase, check out the **[Open Exchange Rates homepage](https://openexchangerates.org "Open Exchange Rates API - real-time currency data API")**


## Roadmap

* Support HTTPS connections
* Support advanced API queries/features
* Support Time Series data requests
* Support `Date` objects for historical queries


## Changelog

**0.3**
* Now maintained by openexchangerates.org
* Tidied up library, readme and example

**0.2**
* Updated to work with Open Exchange Rates App IDs
* Renamed to 'open-exchange-rates'

**0.1** - first version
