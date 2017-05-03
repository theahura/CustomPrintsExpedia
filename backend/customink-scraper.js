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

var submitSelector = '.sb-Btn.sb-Btn--primary.sb-Btn--block'

var customink_url = 'https://www.customink.com/quotes?product_id=04600'

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
        console.log('get quote called')

        var formInputs = tools.mapParamsToSelectors(inputs, selectorMap);

        browser.url(customink_url).then( () => {

            tools.fillForm(browser, formInputs, submitSelector, function(err) {

                if (err) {
                    callback({company: 'Customink'}, err);
                    return;
                }

                browser.getText('.qq-quotedPrice').then(quote => {
                    callback({company: 'Customink', quote: quote})
                }, err => {
                    console.log('err in getting text');
                    callback({company: 'Customink'}, err);
                });

            });

        });
    }   
}
