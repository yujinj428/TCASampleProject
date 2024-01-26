wmatrix.define("wmatrix-plugin-device.device", function(require, exports, module) {
var argscheck = require('wmatrix/argscheck');
var channel = require('wmatrix/channel');
var utils = require('wmatrix/utils');
var exec = require('wmatrix/exec');
var wmatrix = require('wmatrix');

channel.createSticky('onWMatrixInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onWMatrixInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function Device () {
    this.available = false;
    this.platform = null;
    this.version = null;
    this.uuid = null;
    this.wmatrix = null;
    this.model = null;
    this.manufacturer = null;
    this.isVirtual = null;
    this.serial = null;

    var me = this;

    channel.onJSReady.subscribe(function () {
        me.getInfo(function (info) {
            var buildLabel = wmatrix.version;
            me.available = true;
            me.platform = info.data.platform;
            me.version = info.data.version;
            me.uuid = info.data.uuid;
            me.wmatrix = buildLabel;
            me.model = info.data.model;
            me.isVirtual = info.data.isVirtual;
            me.manufacturer = info.data.manufacturer || 'unknown';
            me.appID = info.data.appID;
            channel.onWMatrixInfoReady.fire();
        });
    });
}

Device.prototype.getInfo = function (callback) {
    argscheck.checkArgs('f', 'Device.getInfo', arguments);
    exec(callback, 'WMDevicePlugin', 'getDeviceInfo',[]);
};

Device.prototype.checkDeviceType = function(callback) {
    exec(callback, 'WMDevicePlugin', 'checkDeviceType',[]);
}

module.exports = new Device();

});