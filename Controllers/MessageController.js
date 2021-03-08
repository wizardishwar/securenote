const cryptoRabbit = require('crypto-js/rabbit');
const CryptoJS = require('crypto-js')
const mongoose = require('mongoose');
const Notes = mongoose.model('Notes');
const { v4: uuidv4 } = require('uuid');



module.exports.getNote = async (req, res) => {
    let messageId = req.params.messageId;
    let key = req.body.key;
    let note;
    try {
        note = await Notes.findOne({ url: messageId });
        var bytes = cryptoRabbit.decrypt(note.message, key);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        note.delete();
        res.send({ message: originalText })
    } catch (e) {
        note.attempts--;
        if (note.attempts === 0) {
            note.delete();
            res.send({ status: 'error' , message: "Opps!! you have used three attempts message has been deleted" })
        }
        res.send({ status: 'error', message: "Opps!! Key seems to be wrong , message will be deletedafter 3 attempts." })
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
        let fullUrl = req.protocol + '://' + req.get('host') + '/get-note/' + uuid;
        res.send({ status: 'success' ,message: "Saved", url: fullUrl })
    } catch (e) {
        res.send({ status: 'error', message: "Something went wrong please try again!" })
    }
}
