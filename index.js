const express = require ('express');
const app = express();
const rpcClient = require('bitcoind-rpc');


var configSetting = {
  host: 'ec2-18-222-164-52.us-east-2.compute.amazonaws.com',
  port: '3882',
  user: 'bitcoinN0deAccess',
  password: 'bitc0inRPCpass',
  protocol: 'http'
};


app.get('/', (req, res, configSetting) => {
  const rpc = new rpcClient(configSetting);
  rpc.getBalance('*', 6, (err, balance) => {
    if(err) {
      console.log(err.message);
    }
    console.log('Balance :', +balance);
  });

});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
