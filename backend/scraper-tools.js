/*
 * @Author: Amol Kapoor
 * @Description: Tools for various scrapers
 */


/*
 * Returns a function that returns a promise.
 *
 * This is necessary to store the selector in context, which would otherwise
 * change by the time the promise executes. In addition, note that click and
 * keys are async commands that are forced to run sequentially by the caller.
 * This guarantees that the right element is clicked when keys runs.
 *
 * Inputs should be given as selector : keys. If the keys field is empty,
 * functionally works as a click.
 */
function fillFormHelper(browser, selector, formInputs) {

    return function() {
        var promise = new Promise( (resolve, reject) => {
            browser.click(selector).then( () => {
                browser.saveScreenshot(selector + '.png')
                browser.keys(formInputs[selector]).then( () => {
                    resolve();
                }, (err) => {
                    console.log("error with keys: " + selector)
                    reject(err);
                });
            }, err => {
                console.log("error with click: " + selector);
                reject(err);
            });
        });

        return promise;
    }
}

module.exports = {
    /*
     * Fills out a form and submits it.
     *
     * The trick here is figuring out how to make clicks and keys sequential as
     * both are async in webdriver.io. This function generates a list of
     * functions that return promises and then executes those functions
     * sequentially, forcing synchronous behavior on asynchronous commands -
     * specifically, it ensures that the right element is clicked when keys is
     * run.
     */
    fillForm: function(browser, formInputs, submitButton, callback) {
        var promises = [];

        for (var selector in formInputs) {
            promises.push(fillFormHelper(browser, selector, formInputs));
        }

        promises.reduce(function(cur, next) {
            return cur.then(next);
        }, Promise.resolve()).then( () => {
            if (submitButton) {
                 browser.click(submitButton).then( () => {
                    callback();
                }, err => {
                    browser.saveScreenshot('./err.png')
                    console.log('error handler');
                    console.log(err);
                    callback("Error: Form could not be filled.")
                });
             } else {
                 callback();
             }
        }, err => {
            console.log('err in filling form')
            callback(null, err);
        });
    },

    /*
     * Takes an object with generic inputs and values and converts them to the
     * appropriate CSS selector values for a given scraper. Skips over all
     * values that are not present in the selectorMap.
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
