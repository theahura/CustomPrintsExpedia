/*
 * @Author: Amol Kapoor
 * @Description: Scraper commands for customink
 */

var tools = require('./scraper_tools')

var selectorMap = {
        'quantity':     '#quick_quote_quantity',
        'front_colors': '#quick_quote_front_colors',
        'back_colors':  '#quick_quote_back_colors',
        'zipcode':      '#quick_quote_postal_code',
}

var submitSelector = '.sb-Btn.sb-Btn--primary.sb-Btn--block'

var customink_url = 'https://www.customink.com/quotes?product_id=04600'

module.exports = {

    getQuote: function(browser, inputs, callback) {

        var formInputs = tools.mapParamsToSelectors(inputs, selectorMap);

        browser.url(customink_url).then( () => {

            tools.fillForm(browser, formInputs, submitSelector, function(err) {

                if (err) {
                    callback(null, err);
                    return;
                }

                console.log("form done");
                browser.saveScreenshot('./temp.png')
                browser.getText('.qq-quotedPrice').then(quote => {
                    console.log('got the quote')
                    callback(quote)
                });

            });

        });
    }   
}
