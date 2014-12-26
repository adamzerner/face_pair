'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PeopleSchema = new Schema({
	name: String,
	images: {}
}, { _id: false });

var QuizSchema = new Schema({
  quizName: String,
  people: [PeopleSchema]
});

// mongoose.model('People', PeopleSchema);

module.exports = mongoose.model('Quiz', QuizSchema);