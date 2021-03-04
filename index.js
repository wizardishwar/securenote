require('./Config/db')
const express = require('express')
const bodyParser = require('body-parser');
const cryptoRabbit = require('crypto-js/rabbit');
const CryptoJS = require('crypto-js')
const allRoutes = require('./Routes/routes'); 



const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(allRoutes);




  