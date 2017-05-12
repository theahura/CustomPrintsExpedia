/*
 * @Author: Amol Kapoor
 * @Description: Scraper commands for customink
 */

var tools = require('./scraper-tools')

var selectorMap = {
        'quantity':     '#quick_quote_quantity',
        'frontColors': '#quick_quote_front_colors',
        'backColors':  '#quick_quote_back_colors',
        'zipcode':      '#quick_quote_postal_code',
}

var companyName = 'Customink';
var minBaseUrl = 'https://www.customink.com/quotes?product_id=04600';
var maxBaseUrl = 'https://www.customink.com/quotes?product_id=304604';
var submitSelector = '.sb-Btn.sb-Btn--primary.sb-Btn--block'
var quoteSelector = '.qq-quotedPrice';

/**
 * Helper function that actually gets the quotes.
 */
function getQuoteHelper(browser, url, data, callback) {

    browser.url(url).then( () => {

        console.log('in url');

        tools.fillForm(browser, data, submitSelector, function(err) {

            console.log('form filed');

            if (err) {
                callback(null, err);
                return;
            }

            browser.getText(quoteSelector).then(quote => {
                console.log('quote retrieved')
                callback(quote)
            }, err => {
                console.log('err in getting text');
                callback(null, err);
            });

        });

    });

}

module.exports = {

    /**
     * Gets a quote range from customink for tshirts.
     *
     * @param inputs:
     *  - quantity
     *  - frontColors
     *  - backColors
     *  - zipcode
     * @param callback: function that takes as params (quote, err)
     */
    getQuote: function(browser, inputs, callback) {
        console.log('customink quote called');

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
