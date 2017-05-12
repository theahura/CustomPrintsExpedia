/**
 * @Author: Amol Kapoor
 * @Description: Location for all scrapers to be called.
 */

var custominkScraper = require('./customink-scraper');
var clothes2orderscraper = require('./clothes2order-scraper')

var scrapers = [custominkScraper,
                clothes2orderscraper];

/**
 * Need to run async calls synchronously, so we create functions that return
 * promises that can then be run in a reduce call. See scraper-tools for the
 * same procedure in form filling.
 */
function getQuotesHelper(browser, data, scraper) {
    return function() {
        var promise = new Promise((resolve, reject) => {
            scrapers[scraper].getQuote(browser, data, (data, err) => {
                resolve(data);
            });
        });

        return promise;
   }
}

module.exports = {

    getQuotes: function(browser, data, callback) {
        console.log('get quotes called')
        var promises = [];
        var quotes = {};

        for (var scraper in scrapers) {
            promises.push(getQuotesHelper(browser, data, scraper));
        }

        promises.reduce(function(cur, next) {
            return cur.then(data => {
                // Still not quite sure how this works; seems to get executed
                // BEFORE cur AND next do? Likely has to do with cur being 
                // promise.resolve instead of an actual function to start
                if (data)
                    quotes[data.company] = data.value
                console.log(data)
                return next()
            });
        }, Promise.resolve()).then(data => {
            console.log('promises done')
            quotes[data.company] = data.value
            callback(quotes);
        }, (err) => {
            callback(null, err);
        });
    }
}
