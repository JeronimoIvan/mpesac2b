const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/check', (req, res) => {
  res.send('working!')
})

app.listen(process.env.PORT || 3000)
