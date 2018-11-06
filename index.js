const RpcClient = require ('bitcoind-rpc');
// const bitcore = require ('bitcoin-core');


const run = () => {

  //setting the cofigurations for the rpc connection
  var configSetting = {
    host: 'ec2-18-222-164-52.us-east-2.compute.amazonaws.com',
    port: '3882',
    user: 'bitcoinN0deAccess',
    password: 'bitc0inRPCpass',
    protocol: 'http'
  };

  const rpc = new RpcClient(configSetting);

  rpc.getBalance = ('*', 6, (err, balance, resHeaders) => {
    if(err){
      console.log(err.message);
    }
    return console.log('Balance :', +balance);
  });

  return {
    getBalance
  };
};

module.exports = run;