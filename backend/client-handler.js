/**
 * @Author: Amol Kapoor
 * @Description: Handles the client.
 */

var io = require('socket.io').listen(4000);
var phantomjs = require('phantomjs-prebuilt')
var webdriverio = require('webdriverio')

var scrapers = require('./scrapers');

var wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } }
var browser = null;
var program = null;

/**
 * Generic error reply function. Sends a message to a socket with error as
 * message header.
 */
function serverError(socket, message, callback) {
    console.log(message);
    callback(null, {name: 'Error', message: message});
}

/**
 * Handles all client requests from a socket. Takes incoming requests, parses
 * data by name,and runs the necessary checks for function inputs before sending
 * data to a requested function.
 */
function serverHandler(socket, data, callback) {

    if (data.name === 'getQuote') {
        scrapers.getQuotes(browser, data, (quotes, err) => {
            if (err)
                serverError(socket, 'Quote retrieval failed: ' + err, callback);
            else
                callback(quotes);
        });
    } else {
        serverError(socket, 'function not found', callback);
    }
}


/**
 * Starts up browser. Technically everything else should be wrapped in a promise
 * around this.
 */
phantomjs.run('--webdriver=4444').then(localprogram => {

    browser = webdriverio.remote(wdOpts);

    browser.init();

    program = localprogram;
});


/**
 * Sets up io connections.
 */
io.sockets.on('connection', function(socket) {
    console.log("Connected");

    socket.on('disconnect', () => {
        console.log('got disconnect');
    });

    socket.on("clientToServer", function(data, callback) {
        if(!(data && data.name))
            serverError(socket, 'Data did not have a name', callback);
        else
            serverHandler(socket, data, callback);
    });
});
