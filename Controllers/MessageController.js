const cryptoRabbit = require('crypto-js/rabbit');
const CryptoJS = require('crypto-js')
const mongoose = require('mongoose');
const Notes = mongoose.model('Notes');
const { v4: uuidv4 } = require('uuid');



module.exports.getNote = (req, res) => {
    var ciphertext = "U2FsdGVkX1+/cjPWHuct6K3CltJamuIO5ZvYoq8qzZ+azvy39g2KTMCqnJU0";
    try {
        var bytes = cryptoRabbit.decrypt(ciphertext, req.body.key);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        res.send({ message: originalText })
    }
    catch (e) {
        res.send({ message: "Opss! They key is not correct note will be deleted after 3 attempts" })
    }
}

module.exports.saveNote = async (req, res) => {
    let uuid = uuidv4();
    const notes = new Notes();
    let cipherText = cryptoRabbit.encrypt(req.body.message, req.body.key).toString();
    notes.url = uuid;
    notes.message = cipherText;
    notes.attempts = 3;
    try {
        await notes.save();
        let fullUrl = req.protocol + '://' + req.get('host') +'/get-note/'+ uuid;
        res.send({ message: "Saved",url :fullUrl })
    } catch (e) {
        res.send({ message: "Something went wrong please try again!" })
    }
}
