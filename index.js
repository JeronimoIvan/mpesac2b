const express = require('express');
const Transaction = require('mpesa-mz-nodejs-lib');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World! ');
})

const config = {
    public_key: process.env.PUBLIC_KEY,
    api_host: process.env.API_HOST,
    api_key: process.env.API_KEY,
    origin: process.env.ORIGIN,
    service_provider_code: process.env.SERVICE_PROVIDER_CODE,
    initiator_identifier: process.env.INITIATOR_IDENTIFIER,
    security_credential: process.env.SECURITY_CREDENTIAL,
}

const transaction = new Transaction(config);

app.post('/pay', (req, res) => {
  const amount = req.body.amount;
  const phone = req.body.phone;
  const reference = req.body.reference;
  const third_party_reference = req.body.third_party_reference;

  if (amount && phone && reference && third_party_reference) {
      try {
        const response = await transaction.c2b({
          amount: amount,
          msisdn: phone,
          reference: reference,
          third_party_reference: third_party_reference
        });
        console.log(response);
        res.json(response);
        res.end();
      } catch (error) {
        console.log(error);
        res.json(error);
        res.end();
      }
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Missing query parameters.');
      res.end();
    }
 // res.json({ amount});
  //res.json({ amount, phone, reference, third_party_reference });
})

app.listen(process.env.PORT || 3000)
