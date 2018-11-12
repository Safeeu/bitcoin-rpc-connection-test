var express = require('express')
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.text({ type: 'text/html' }))

var Client = require('bitcoin-core')
var client = new Client({
    port: 8332,
    host: '127.0.0.1',
    username: 'bitcoinN0deAccess',
    password: 'bitc0inRPCpass'
});


app.get('/getBlockChainInfo', (req, res) => {
    client.getBlockchainInformation().
    then((info) => res.json(info), console.log(res)).
    catch(err => {
        console.log(err.message);
    });
});

app.get('/getBalance', (req, res) => {
    client.getBalance("*", 6).then((balance) => res.json(balance));
});

app.post('/getNewAddress', (req, res) => {
        client.getNewAddress().then(
            (Account_Address) => {

                var account_name = req.body.account_name;
                
                return res.status(200).json({
                "Address": Account_Address,
                "Account Name" : account_name
            }),
            console.log('Account Address: ' + Account_Address + '\n'+ 'Account Name :' + account_name)
        }).
            catch((err)=> {
            console.log(err.message);
        })
    });


app.listen(3001, () => {
    console.log("Listening on port 3001");
});

