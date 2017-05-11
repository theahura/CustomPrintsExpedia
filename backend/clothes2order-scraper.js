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
var baseUrl = 'https://www.clothes2order.com/T-Shirts/Fruit+of+the+Loom+Original+T-Shirt'
var quickquoteSelector = '[title="Quick Quote"]'
var deliveryButton = '#inc_delivery_charge'
var quoteSelector = '.total*=£'

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

        var formInputs = tools.mapParamsToSelectors(inputs, selectorMap);

        browser.url(baseUrl).then( () => {

            console.log('in url')

            browser.click(quickquoteSelector).waitForVisible(
                    deliveryButton, 5000).then( () => {

                formInputs[deliveryButton] = '';

                tools.fillForm(browser, formInputs, null, function(err) {

                    console.log('filled form')

                    if (err) {
                        callback({company: companyName}, err);
                        return;
                    }

                    browser.getText(quoteSelector).then(quote => {
                        console.log('quote retrieved')
                        callback({company: companyName, quote: quote[0]})
                    }, err => {
                        console.log('err in getting text');
                        callback({company: companyName}, err);
                    });

                });

            }, err => {
                console.log('err in clicking quickquote');
                callback({company: companyName}, err);
            })
        });
    }
}
