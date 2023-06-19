const express = require('express')
const transaction = require('./transaction.js');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World! ');
})

app.post('/pay', (req, res) => {
  const amount = req.body.amount;
  const phone = req.body.phone;
  const reference = req.body.reference;
  const third_party_reference = req.body.third_party_reference;
 // res.json({ amount});
  res.json({ amount, phone, reference, third_party_reference });
})

app.listen(process.env.PORT || 3000)
