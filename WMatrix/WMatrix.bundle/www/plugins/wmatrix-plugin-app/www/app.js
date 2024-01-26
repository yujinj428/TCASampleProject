wmatrix.define("wmatrix-plugin-app.app", function(require, exports, module) {
var exec = require('wmatrix/exec');
    
module.exports = {
    version: function(callback) {
        exec(callback,"WMAppPlugin","appVersion",[]);
    },
    finish: function(callback, param) {
        exec(callback,"WMAppPlugin","appFinish",[param]);
    },
    checkAppInstalled: function(callback, param) {
        exec(callback,"WMAppPlugin","checkAppInstalled",[param]);
    }
};

});