var bitcoin = require(bitcoin);
var client = new bitcoin.Client('ec2-18-222-164-52.us-east-2.compute.amazonaws.com', 8332, 'bitcoinN0deAccess', 'bitc0inRPCpass');

client.getBalance('*', 6, (err, balance) => {
    if(err) { 
        console.log(err);
    }
    console.log('Balance:' , balance);
});