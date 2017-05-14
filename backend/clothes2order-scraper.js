/*
 * @Author: Amol Kapoor
 * @Description: Scraper commands for clothes2order
 */

var tools = require('./scraper-tools')

var selectorMap = {
        'quantity':     '#quantity_amount',
        'printDesigns': '#print_amount',
        'embroideryDesigns':  '#embroidery_amount',
}

var companyName = 'Clothes2Order'
var minBaseUrl = 'https://www.clothes2order.com/T-Shirts/Fruit+of+the+Loom+Original+T-Shirt'
var maxBaseUrl = 'https://www.clothes2order.com/T-Shirts/American+Apparel+Tri-blend+Long+Sleeve+T-shirt'
var quickquoteSelector = '[title="Quick Quote"]'
var deliveryButton = '#inc_delivery_charge'
var quoteSelector = '.total*=£'

/**
 * Helper function that actually gets the quotes.
 */
function getQuoteHelper(browser, url, data, callback) {

	browser.url(url).then( () => {
	
		console.log('in url')

		browser.click(quickquoteSelector).waitForVisible(
				deliveryButton, 5000).then( () => {

			data[deliveryButton] = '';

			browser.saveScreenshot('1.png')

			tools.fillForm(browser, data, null, function(err) {

				console.log('filled form')

				if (err) {
					callback(null, err);
					return;
				}

				// This pause is definitely not ideal, will need to fix.
				browser.pause(2000).getText(quoteSelector).then(quote => {
					callback(quote[0])
				}, err => {
					console.log('err in getting text');
					callback(null, err);
				});

			});

		}, err => {
			console.log('err in clicking quickquote');
			browser.saveScreenshot('quickquoteerr.png')
			callback(null, err);
		});
	});
}


module.exports = {

    /**
     * Gets a quote from clothes2order for a basic tshirt.
     *
     * @param inputs:
     *  - quantity
     *  - embroidery count
     *  - print count
     * @param callback: function that takes as params (quote, err)
     */
    getQuote: function(browser, inputs, callback) {

        console.log('clothes2order quote called')

        var value = {};
        var formInputs = tools.mapParamsToSelectors(inputs, selectorMap);

        getQuoteHelper(browser, minBaseUrl, formInputs, (quote, err) => {
            value['min'] = err ? err : quote;
            getQuoteHelper(browser, maxBaseUrl, formInputs, (quote, err) => {
                value['max'] = err ? err : quote;
                callback({company: companyName, value: value});
            });
        });
    }
}
