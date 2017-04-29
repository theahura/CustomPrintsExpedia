/*
 * @Author: Amol Kapoor
 * @Description: Tools for various scrapers
 */
module.exports = {

    /*
     * Fills out a form and submits it.
     */
    fillForm: function(browser, formInputs, submitButton, callback) {
        var promises = [];

        for (var selector in formInputs) {
            if(formInputs[selector] == 'click')
                promises.push(browser.click(selector));
            else {
                var promise = new Promise( (resolve, reject) => {
                    browser.click(selector).keys(formInputs[selector]).then( () => {
                        resolve() 
                    });
                });

                promises.push(promise);
            }
        }

        Promise.all(promises).then(values => {
            browser.click(submitButton).then( () => {
                callback();
            });
        }, values => {
            browser.saveScreenshot('./temp.png')
            console.log('error handler')
            console.log(values)
            callback("Error: Form could not be filled.")
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
