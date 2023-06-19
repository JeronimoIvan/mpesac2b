const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/pay', (req, res) => {
  const amount = "250";
 // res.json({ amount});
  res.send(amount);
})

app.listen(process.env.PORT || 3000)
