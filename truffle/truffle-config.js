const WebSocket = require('ws');


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      websockets: new WebSocket("ws://127.0.0.1:7545"),
    },
    develop: {
      port: 7545
    }
  }
};
