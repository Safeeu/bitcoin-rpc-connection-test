const express = require ('express');
const app = express();
const rpcClient = require('bitcoind-rpc');

var configSetting = {
  host: '127.0.0.1',
  port: '8332',
  user: 'bitcoinN0deAccess',
  password: 'bitc0inRPCpass'
};

rpc = new rpcClient(configSetting);


app.get('/getBalance', (req, res) => {
  
  const rpc = new rpcClient(configSetting);
  rpc.getBalance('*', 0, (err, balance) => {
    if(err) {
      return res.status(400).json({
        message: err.message
      }),
      console.log(err.message);
    }
    return res.status(200).json(balance),
    console.log('Balance :', +balance);
  });

});

app.get('/getMiningInfo', (req, res) => {
  rpc.getmininginfo((err, miningInfo) => {
    if(err){
      return res.status(400).json({
        message: err.message
      }),
      console.log(err.message);
    }
    return res.status(200).json(miningInfo),
    console.log(miningInfo);
  });
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});