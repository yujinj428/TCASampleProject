wmatrix.define('wmatrix/plugin_list', function(require, exports, module) {
    module.exports = [
  {
    "file" : "plugins/wmatrix-plugin-app/www/app.js",
    "id" : "wmatrix-plugin-app.app",
    "clobbers" : [
      "wmatrix.plugin.app"
    ],
    "pluginId" : "wmatrix-plugin-app"
  },
  {
    "file" : "plugins/wmatrix-plugin-device/www/device.js",
    "clobbers" : [
      "device"
    ],
    "pluginId" : "wmatrix-plugin-device",
    "id" : "wmatrix-plugin-device.device"
  },
  {
    "file" : "plugins/wmatrix-plugin-camera/www/CameraConstants.js",
    "clobbers" : [
      "Camera"
    ],
    "id" : "wmatrix-plugin-camera.Camera",
    "pluginId" : "wmatrix-plugin-camera"
  },
  {
    "pluginId" : "wmatrix-plugin-camera",
    "id" : "wmatrix-plugin-camera.CameraPopoverOptions",
    "file" : "plugins/wmatrix-plugin-camera/www/CameraPopoverOptions.js",
    "clobbers" : [
      "CameraPopoverOptions"
    ]
  },
  {
    "pluginId" : "wmatrix-plugin-camera",
    "id" : "wmatrix-plugin-camera.camera",
    "clobbers" : [
      "navigator.camera"
    ],
    "file" : "plugins/wmatrix-plugin-camera/www/Camera.js"
  },
  {
    "pluginId" : "wmatrix-plugin-camera",
    "file" : "plugins/wmatrix-plugin-camera/www/ios/CameraPopoverHandle.js",
    "id" : "wmatrix-plugin-camera.CameraPopoverHandle",
    "clobbers" : [
      "CameraPopoverHandle"
    ]
  },
  {
    "clobbers" : [
      "Connection"
    ],
    "pluginId" : "wmatrix-plugin-network",
    "file" : "plugins/wmatrix-plugin-network/www/Connection.js",
    "id" : "wmatrix-plugin-network.Connection"
  },
  {
    "pluginId" : "wmatrix-plugin-network",
    "id" : "wmatrix-plugin-network.network",
    "clobbers" : [
      "navigator.connection",
      "navigator.network.connection"
    ],
    "file" : "plugins/wmatrix-plugin-network/www/network.js"
  }
];
    module.exports.metadata =
    // TOP OF METADATA
{
  "wmatrix-plugin-app" : {
    "version" : "1.0.1",
    "type" : "basic"
  },
  "wmatrix-plugin-camera" : {
    "name" : "Camera",
    "version" : "1.0.0",
    "type" : "basic"
  },
  "wmatrix-plugin-network" : {
    "name" : "Network",
    "version" : "1.0.0",
    "type" : "basic"
  },
  "wmatrix-plugin-device" : {
    "version" : "1.0.1",
    "type" : "basic"
  }
}
// BOTTOM OF METADATA
});
