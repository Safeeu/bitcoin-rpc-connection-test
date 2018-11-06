const express = require ('express');
const app = express();
const rpcClient = require('bitcoind-rpc');


var configSetting = {
  host: '127.0.0.1',
  port: '3882',
  user: 'bitcoinN0deAccess',
  password: 'bitc0inRPCpass',
  protocol: 'http'
};


app.get('/getBalance', (req, res, configSetting) => {
  const rpc = new rpcClient(configSetting);
  rpc.getBalance('*', 6, (err, balance) => {
    if(err) {
      return res.status(200).json({
        message: "Cannot Get"
      }),
      console.log(err.message);
    }
    console.log('Balance :', +balance);
  });

});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});