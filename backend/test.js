var customink = require('./customink_scraper')
var phantomjs = require('phantomjs-prebuilt')
var webdriverio = require('webdriverio')
var wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } }

phantomjs.run('--webdriver=4444').then(program => {

    var inputs = {
        'quantity': '10',
        'front_colors': '3',
        'back_colors': '2',
        'zipcode': '07920'
    }

    browser = webdriverio.remote(wdOpts);

    browser.init().then( () => {
        customink.getQuote(browser, inputs, function(quote, err) {

            if (err) {
                console.log(err)
            }

            console.log(quote);

            program.kill();
        });
    });

});


