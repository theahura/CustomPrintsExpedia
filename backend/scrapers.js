/**
 * @Author: Amol Kapoor
 * @Description: Location for all scrapers to be called.
 */

var custominkScraper = require('./customink-scraper');

var scrapers = [custominkScraper];

module.exports = {

    getQuotes: function(browser, data, callback) {
        console.log('get quotes called')
        var promises = [];
        var quotes = {};

        for (var scraper in scrapers) {
            var promise = new Promise((resolve, reject) => {
                scrapers[scraper].getQuote(browser, data, (data, err) => {
                    quotes[data.company] = err ? err : data.quote;
                    resolve();
                });
            });

            promises.push(promise);
        }

        console.log(promises)

        Promise.all(promises).then( () => {
            console.log('promises done')
            callback(quotes);
        });
    }
}
