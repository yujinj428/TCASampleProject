wmatrix.define("wmatrix-plugin-network.network", function(require, exports, module) {

var exec = require('wmatrix/exec');
var wmatrix = require('wmatrix');
var channel = require('wmatrix/channel');
var utils = require('wmatrix/utils');

if (wmatrix.platformId !== 'browser' && typeof navigator !== 'undefined') {
    utils.defineGetter(navigator, 'onLine', function () {
        return this.connection.type !== 'none';
    });
}

function NetworkConnection () {
    this.type = 'unknown';
}

NetworkConnection.prototype.getInfo = function (callback) {
    exec(callback, 'WMNetworkPlugin', 'getConnectionInfo', []);
};

var me = new NetworkConnection();
var timerId = null;
var timeout = 500;

channel.createSticky('onwmatrixConnectionReady');
channel.waitForInitialization('onwmatrixConnectionReady');

channel.onJSReady.subscribe(function () {
    me.getInfo(function (info) {
        me.type = info;
        if (info === 'none') {
            timerId = setTimeout(function () {
                wmatrix.fireDocumentEvent('offline');
                timerId = null;
            }, timeout);
        } else {
            if (timerId !== null) {
                clearTimeout(timerId);
                timerId = null;
            }
          wmatrix.fireDocumentEvent('online');
        }

        if (channel.onwmatrixConnectionReady.state !== 2) {
            channel.onwmatrixConnectionReady.fire();
        }
    });
});

module.exports = me;
});
