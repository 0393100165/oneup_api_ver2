const uuid = require('uuid');
const crypto = require('crypto');
const https = require('https');
const url = require('url');
const querystring = require('querystring');
module.exports = {


    confirmUrl: function (req, res) {
        var status = req.body.errorCode
        var message = req.body.message;
        var amount = req.body.amount;
        var partnerRefId = req.body.orderId;
        var momoTransId = req.body.transId;

        var rawSignature = "status=" + status + "&message=" + message + "&amount=" + amount + "&partnerRefId=" + partnerRefId + "&momoTransId=" + momoTransId ;

        var signature = crypto.createHmac('sha256', serectkey).update(rawSignature).digest('hex');

        var body = JSON.stringify({
            status: status,
            message: message,
            amount: amount,
            partnerRefId: partnerRefId,
            momoTransId: momoTransId,
            signature: signature
        })

        var options = {
            hostname: 'http://localhost:3007',
            port: 443,
            path: '/gw_payment/confirmUrl',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        var ketqua;

        var request = https.request(options, (ress) => {
            ress.setEncoding('utf8');
            ress.on('data', (body) => {
                ketqua += body;
                
            });
            ress.on('end', () => {
               console.log(ketqua.toString().substring(216, 520))
                res.status(200).json({
                    status: 'success',
                    data: ketqua.toString().substring(216, 520),
                });

            });
        });
        request.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        request.write(body);

        request.end();
    },



}