# Open Exchange Rates module for nodeJS/npm

**Important update:** v0.2 is not backwards-compatible with v0.1, and the name has been changed from 'exchange-rates' to 'open-exchange-rates', to reflect the fact that it is solely a wrapper for the OXR service (the previous module had the rarely-used feature of being able to work with any other APIs, via a custom `parse` method). 


## Introduction

	$ npm install open-exchange-rates

A nodeJS module that loads up-to-date currency/exchange rate data from the **[Open Exchange Rates API](http://openexchangerates.org "Exchange Rates API, free currency conversion data")** service, for use in your nodeJS scripts and apps.

Works perfectly with **[money.js](http://josscrowcroft.github.com/money.js "JavaScript and NodeJS Currency Conversion Library")** (`npm install money`) - a tiny currency-conversion library for nodeJS (and web) - but you can use the data however you like.

**NB:** an App ID is required to connect to the API. It's free for personal/small-scale use and a bargain for business/commercial. Get yours in 30 seconds or less at **[openexchangerates.org/signup](https://openexchangerates.org/signup "Exchange Rates API key signup")**.

Requires: `http-agent`

To install, type `npm install open-exchange-rates` in the terminal. Then see below.


## Example Usage:

See the **example.js** in this repository for a basic, working usage example.

#### Start with this:

	var oxr = require('open-exchange-rates');

#### Load latest rates from openexchangerates.org:

	var oxr = require('open-exchange-rates');
	oxr.set({ app_id: 'YOUR_APP_ID' })
	
	oxr.latest(function() {
		// You can now use `oxr.rates`, `oxr.base` and `oxr.timestamp`...
	});

#### Get historical rates:

	var oxr = require('open-exchange-rates');
	oxr.set({ app_id: 'YOUR_APP_ID' })
	
	oxr.historical('2004-02-16', function() {
		// You can now use `oxr.rates`, `oxr.base` and `oxr.timestamp`...
	});

#### Currency conversion with money.js (fx) module:

	var oxr = require('open-exchange-rates'),
		fx = require('money');
	
	oxr.set({ app_id: 'YOUR_APP_ID' })
	
	oxr.latest(function() {
		// Apply exchange rates and base rate to `fx` library object:
		fx.rates = oxr.rates;
		fx.base = oxr.base;
		
		// money.js is all set up now:
		fx(100).from('HKD').to('GBP'); // 8.0424 or etc.
	});

#### Advanced API Features:

The **[Open Exchange Rates API](http://openexchangerates.org "Open Exchange Rates - currency conversion API for developers")** features several advanced features, for paying clients. These will be added to the module (and documented here) soon!


## More Info

For more information, documentation, examples and showcase, check out the **[Open Exchange Rates homepage](https://openexchangerates.org "Open Exchange Rates API - real-time currency data API")**


### Changelog

**0.2.0** - updated to work with latest version of Open Exchange Rates API with App IDs; renamed to 'open-exchange-rates'

**0.1.0** - first version
