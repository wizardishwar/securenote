const mongoose = require('mongoose');

const notes = new mongoose.Schema({
    url: String,
    message: String,
    attempts: Number,
    date:{
        type: Date,
        default : Date.now
    } 
  });

mongoose.model('Notes', notes);