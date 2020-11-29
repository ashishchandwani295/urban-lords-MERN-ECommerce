const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "cxrst5jbc9fqwwwq",
  publicKey: "ps3rndkhgtyv7mgk",
  privateKey: "89ca267b1c7c79fab2243731ee1d7f33"
});

exports.getToken = (req, res) => {

    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.json(response);
        };
  });
}

exports.processPayment = (req, res) => {

        let nonceFromTheClient = req.body.paymentMethodNonce;
        let amountFromTheClient = req.body.amount;

        gateway.transaction.sale({
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            
            options: {
              submitForSettlement: true
            }
          }, (err, result) => {
              if(err){
                  res.status(500).json(err);
              } else {
                  res.json(result);
              }
          });
}