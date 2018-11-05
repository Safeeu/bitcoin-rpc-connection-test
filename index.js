var RpcClient = require('bitcoind-rpc');
var bitcore = require ('bitcoin-core');

var run = function() {
  
    var config = {
      protocol: 'http',
      user: 'bitcoinN0deAccess',
      pass: 'bitc0inRPCpass',
      host: '127.0.0.1',
      port: '8332',
    };
  
    // config can also be an url, e.g.:
    //var config = 'http://user:pass@127.0.0.1:18332';
  
    var rpc = new RpcClient(config);
  
    var txids = [];
  
    function showNewTransactions() {
      rpc.getRawMemPool(function (err, ret) {
        if (err) {
          console.error(err);
          return setTimeout(showNewTransactions, 10000);
        }
  
        function batchCall() {
          ret.result.forEach(function (txid) {
            if (txids.indexOf(txid) === -1) {
              rpc.getRawTransaction(txid);
            }
          });
        }
  
        rpc.batch(batchCall, function(err, rawtxs) {
          if (err) {
            console.error(err);
            return setTimeout(showNewTransactions, 10000);
          }
  
          rawtxs.map(function (rawtx) {
            var tx = new bitcore.Transaction(rawtx.result);
            console.log('\n\n\n' + tx.id + ':', tx.toObject());
          });
  
          txids = ret.result;
          setTimeout(showNewTransactions, 2500);
        });
      });
    }
  
    showNewTransactions();
  };