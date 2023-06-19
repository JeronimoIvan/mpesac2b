const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/pay', (req, res) => {
 // const amount = req.body.amount;
 // res.json({ amount});
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000)
