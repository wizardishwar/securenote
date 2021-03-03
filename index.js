const express = require('express')
const bodyParser = require('body-parser');
const cryptoRabbit = require('crypto-js/rabbit');
const CryptoJS = require('crypto-js')


const app = express()
const port = 3000


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(bodyParser.urlencoded({ extended: true }));




app.post('/save-note', (req, res) => {

    let cipherText = cryptoRabbit.encrypt(req.body.message,req.body.key).toString();

    res.send(cipherText)
})

app.post('/get-note', (req, res) => {
  
    var ciphertext = "U2FsdGVkX1+/cjPWHuct6K3CltJamuIO5ZvYoq8qzZ+azvy39g2KTMCqnJU0";    
    var bytes  = cryptoRabbit.decrypt(ciphertext, req.body.key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    res.send(originalText)
})
  