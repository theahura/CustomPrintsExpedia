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
var baseUrl = 'https://www.customink.com/quotes?product_id=04600';
var submitSelector = '.sb-Btn.sb-Btn--primary.sb-Btn--block'
var quoteSelector = '.qq-quotedPrice';

module.exports = {

    /**
     * Gets a quote from customink for a basic tshirt.
     *
     * @param inputs:
     *  - quantity
     *  - frontColors
     *  - backColors
     *  - zipcode
     * @param callback: function that takes as params (quote, err)
     */
    getQuote: function(browser, inputs, callback) {
        console.log('customink quote called')

        var formInputs = tools.mapParamsToSelectors(inputs, selectorMap);

        browser.url(baseUrl).then( () => {

            console.log('in url')

            tools.fillForm(browser, formInputs, submitSelector, function(err) {

                console.log('form filed')

                if (err) {
                    callback({company: companyName}, err);
                    return;
                }

                browser.getText(quoteSelector).then(quote => {
                    console.log('quote retrieved')
                    callback({company: companyName, quote: quote})
                }, err => {
                    console.log('err in getting text');
                    callback({company: companyName}, err);
                });

            });

        });
    }   
}
