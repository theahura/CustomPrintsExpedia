/*
 * @Author: Amol Kapoor
 * @Description: Tools for various scrapers
 */

function fillFormHelper(browser, selector, formInputs) {

    return function() {
        var promise = new Promise( (resolve, reject) => {
            browser.click(selector).then( () => {
                browser.keys(formInputs[selector]).then( () => {
                    resolve();
                }, (err) => {
                    console.log("error with keys")
                    reject(err);
                });
            }, err => {
                console.log("error with click");
                reject(err);
            });
        });

        return promise;
    }
}

module.exports = {
    /*
     * Fills out a form and submits it.
     */
    fillForm: function(browser, formInputs, submitButton, callback) {
        var promises = [];

        for (var selector in formInputs) {
            promises.push(fillFormHelper(browser, selector, formInputs));
        }

        promises.reduce(function(cur, next) {
            return cur.then(next);
        }, Promise.resolve()).then( () => {
             browser.click(submitButton).then( () => {
                callback();
            }, err => {
                browser.saveScreenshot('./temp.png')
                console.log('error handler');
                console.log(err);
                callback("Error: Form could not be filled.")
            });
        });
    },

    /*
     * Takes an object with generic inputs and values and converts them to the
     * appropriate CSS selector values for a given scraper. Skips over all
     * values that are not present in the selector_map.
     */
    mapParamsToSelectors: function(generic, selectorMap) {

        var formInput = {}
        for (var gen in generic) {
            if (gen in selectorMap)
                formInput[selectorMap[gen]] = generic[gen];
        }

        return formInput
    },
}
