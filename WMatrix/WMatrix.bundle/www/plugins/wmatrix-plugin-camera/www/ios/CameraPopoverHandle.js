wmatrix.define("wmatrix-plugin-camera.CameraPopoverHandle", function(require, exports, module) {
var exec = require('wmatrix/exec');

/** 
 * @namespace navigator
 */

/**
 * A handle to an image picker popover.
 *
 * __Supported Platforms__
 *
 * ![](doc/img/android-fail.png) ![](doc/img/blackberry-fail.png) ![](doc/img/browser-fail.png) ![](doc/img/firefox-fail.png) ![](doc/img/fireos-fail.png) ![](doc/img/ios-success.png) ![](doc/img/windows-fail.png) ![](doc/img/wp8-fail.png) ![](doc/img/ubuntu-fail.png) 
 *
 * @example
 * var cameraPopoverHandle = navigator.camera.getPicture(onSuccess, onFail,
 * { 
 *     destinationType: Camera.DestinationType.FILE_URI,
 *     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
 *     popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
 * });
 * 
 * // Reposition the popover if the orientation changes.
 * window.onorientationchange = function() {
 *     var cameraPopoverOptions = new CameraPopoverOptions(0, 0, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);
 *     cameraPopoverHandle.setPosition(cameraPopoverOptions);
 * }
 * @module CameraPopoverHandle
 */
var CameraPopoverHandle = function() {
    /** Set the position of the popover.
     * @param {module:CameraPopoverOptions} popoverOptions
     */
    this.setPosition = function(popoverOptions) {
        var args = [ popoverOptions ];
        exec(null, "WMCameraPlugin", "repositionPopover", args);
    };
};

module.exports = CameraPopoverHandle;

});
