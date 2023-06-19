const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/pay', (req, res) => {
  const amount = req.body.amount;
 // res.json({ amount});
  res.send(amount);
})

app.listen(process.env.PORT || 3000)
