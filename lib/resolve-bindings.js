var os = require('os');

module.exports = function() {
  var platform = os.platform();

  if (process.env.NOBLE_WEBSOCKET || process.title === 'browser') {
    return require('./websocket/bindings');
  } else if (process.env.NOBLE_DISTRIBUTED) {
    return require('./distributed/bindings');
  } else if (platform === 'darwin') {
    return require('./mac/bindings');
  } else if (platform === 'linux' || platform === 'freebsd' || platform === 'win32') {
    return require('./hci-socket/bindings');
  } else if (platform === 'ios' || platform == 'android') {
    return require('react-native-ble/bindings')
  } else {
    throw new Error('Unsupported platform');
  }
};
