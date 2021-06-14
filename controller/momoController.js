const uuid = require('uuid');
const crypto = require('crypto');
const https = require('https');
const url = require('url');
const querystring = require('querystring');
module.exports = {


    ThemDonHang_MOMO: function (req, res) {


        var partnerCode = "MOMOLYYH20210531";
        var accessKey = process.env.ACCESS_KEY_MOMO;
        var serectkey = process.env.SECRET_KEY_MOMO; 
        var orderInfo = `OneUp : Thanh toán hóa đơn ${req.body.orderInfo}`;
        var returnUrl = `http://localhost:3007/checkout/payment/success/${req.body.orderInfo}`;
        var notifyurl = `http://localhost:3007/checkout/payment/success/${req.body.orderInfo}`;
        var amount = req.body.amount;
        var orderId = uuid.v1();
        var requestId = uuid.v1();
        var requestType = "captureMoMoWallet";
        var extraData = "merchantName=;merchantId=";

        var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyurl + "&extraData=" + extraData;

        var signature = crypto.createHmac('sha256', serectkey).update(rawSignature).digest('hex');

        var body = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            returnUrl: returnUrl,
            notifyUrl: notifyurl,
            extraData: extraData,
            requestType: requestType,
            signature: signature
        })

        var options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/gw_payment/transactionProcessor',
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
                res.status(200).json({
                    status: 'success',
                    data: ketqua.toString().substring(216, 520),
            
                });
            });
        })

        
        request.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        request.write(body);
        request.end();
    },
    
    ConfirmUrl_MoMo: function (req, res) {
        
        function getSearchParameters() {
            var prmstr = window.location.search.substr(1);
            return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
        }
        
        function transformToAssocArray( prmstr ) {
            var params = {};
            var prmarr = prmstr.split("&");
            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        }
        
        var params = getSearchParameters();


    
    }

}