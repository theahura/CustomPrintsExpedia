/**
 * @Author: Amol Kapoor
 * @Description: Location for all scrapers to be called.
 */

var custominkScraper = require('customink-scraper')

var scrapers = new Set([custominkScraper])

module.exports = {

    getQuotes: function(browser, data, callback) {
        var promises = [];
        var quotes = {};

        for (scraper in scrapers) {
            var promise = new Promise(resolve, reject) {
                scraper.getQuote(browser, data, (data, err) => {
                    quotes[data.company] = err ? err : data.quote;
                    resolve();
                });
            }
        }

        Promises.all(promises).then( () => {
            callback(quotes);
        });
    }
}
