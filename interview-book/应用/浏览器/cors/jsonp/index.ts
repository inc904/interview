import express from 'express'

const app = express()

app.get('/api/jsonp', (req, res) => {
  console.log(req.query)
  const callback = req.query.callback
  res.send(`${callback}({ "name": "jsonp" })`)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
