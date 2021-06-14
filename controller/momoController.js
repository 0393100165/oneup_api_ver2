const uuid = require('uuid');
const crypto = require('crypto');
const https = require('https');
const url = require('url');
const querystring = require('querystring');
module.exports = {


    ThemDonHang_MOMO: function (req, res) {

        var hoTen = req.body.thongTinNguoiMua.hoTen;
        var sdt = req.body.thongTinNguoiMua.sdt;
        var diaChi = req.body.thongTinNguoiMua.diaChi;
        var partnerCode = "MOMOLYYH20210531";
        var accessKey = process.env.ACCESS_KEY_MOMO;
        var serectkey = process.env.SECRET_KEY_MOMO; 
        var orderInfo = `OneUp : Thanh toán hóa đơn ${req.body.orderInfo}`;
        var returnUrl = `http://localhost:5000/api/hethong/gw_payment/ConfirmUrl_MoMo?hoTen=${hoTen}&sdt=${sdt}&diaChi=${diaChi}`;
        var notifyurl = `http://localhost:5000/api/hethong/gw_payment/NotifyUrl_MoMo`;
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
        var queryObject = url.parse(req.url,true).query;
        var queryObject_json = JSON.stringify(queryObject);
        var queryObject_parse = JSON.parse(queryObject_json);
        var partnerCode = queryObject_parse.partnerCode;
        var accessKey = queryObject_parse.accessKey;
        var requestId = queryObject_parse.requestId;
        var amount = queryObject_parse.amount;
        var orderId = queryObject_parse.orderId;
        var orderInfo = queryObject_parse.orderInfo;
        var orderType = queryObject_parse.orderType;
        var transId = queryObject_parse.transId;
        var message = queryObject_parse.message;
        var localMessage = queryObject_parse.localMessage;
        var responseTime = queryObject_parse.responseTime;
        var errorCode = queryObject_parse.errorCode;
        var payType = queryObject_parse.payType;
        var extraData = queryObject_parse.extraData;
        var serectkey = process.env.SECRET_KEY_MOMO;
        var hoTen = queryObject_parse.hoTen;
        var sdt = queryObject_parse.sdt;
        var diaChi = queryObject_parse.diaChi;
        var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey
         + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId
          + "&orderInfo=" + orderInfo + "&orderType=" + orderType + "&transId=" + transId
          + "&message=" + message + "&localMessage=" + localMessage
          + "&responseTime=" + responseTime + "&errorCode=" + errorCode
          + "&payType=" + payType  + "&extraData=" + extraData
          ; 
        var signature = crypto.createHmac('sha256', serectkey).update(rawSignature).digest('hex');
        if(queryObject_parse.signature === signature && errorCode === '0') {
            console.log('success');
            res.redirect(`http://localhost:3007/checkout/payment/confirm/momo?hoTen=${hoTen}&sdt=${sdt}&diaChi=${diaChi}`);
        }
        else {  
            console.log('fail');
            res.redirect(`${process.env.CLIENT_URL_LOCAL}`);
        }
    },

    ConfirmNotify_Url: function (req, res) { 
        console.log(req.body)
    }

}

