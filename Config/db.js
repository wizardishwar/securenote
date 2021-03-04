var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/securenote';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true},(err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.');
    } else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./Notes')