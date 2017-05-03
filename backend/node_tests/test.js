/*
 * @Author: Amol Kapoor
 * @Description: Runs scrapers on test inputs.
 */

var phantomjs = require('phantomjs-prebuilt')
var webdriverio = require('webdriverio')

var customink = require('./customink-scraper')

var wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } }

var globalbrowser = null;
var globalprogram = null;

phantomjs.run('--webdriver=4444').then(program => {

    globalbrowser = webdriverio.remote(wdOpts);

    globalbrowser.init().then( () => {console.log("done with init")});

    globalprogram = program;
});

setTimeout( () => {

    var inputs = {
        'quantity': '10',
        'frontColors': '3',
        'backColors': '2',
        'zipcode': '07920'
    }

    console.log("Starting quotes")
    customink.getQuote(globalbrowser, inputs, function(quote, err) {

        if (err) {
            console.log(err)
        }

        console.log(quote);

        globalprogram.kill();
    });
}, 5000);

