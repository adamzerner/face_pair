'use strict';

var _ = require('lodash');
var Quiz = require('./quiz.model');

// Get list of quizs
exports.index = function(req, res) {
  Quiz.find(function (err, quizes) {
    if(err) { return handleError(res, err); }
    return res.json(200, quizes);
  });
};

// Get a single quiz
exports.show = function(req, res) {
  Quiz.findById(req.params.id, function (err, quiz) {
    if(err) { return handleError(res, err); }
    if(!quiz) { return res.send(404); }
    return res.json(quiz);
  });
};

// Creates a new quiz in the DB.
exports.create = function(req, res) {
  Quiz.create(req.body, function(err, quiz) {
    if(err) { return handleError(res, err); }
    return res.json(201, quiz);
  });
};

// Updates an existing quiz in the DB.
exports.update = function(req, res) {
  console.log('req body: ', req.body);
  if(req.body._id) { delete req.body._id; }

  Quiz.findById(req.params.id, function (err, quiz) {
    if (err) { return handleError(res, err); }
    if(!quiz) { return res.send(404); }
    var quiz = _.merge(quiz, req.body);
    quiz.markModified('people');
    quiz.markModified('quizName');


    quiz.save(function (err, newQuiz, numModified) {
      console.log("this is new quiz", newQuiz);
      console.log(numModified);
      if (err) { return handleError(res, err); }
      return res.json(200, quiz);
    });
  });
};

exports.destroy = function(req, res) {
  Quiz.findById(req.params.id, function (err, quiz) {
    if(err) { return handleError(res, err); }
    if(!quiz) { return res.send(404); }
    quiz.remove(function(err, removedQuiz) {
      console.log('quiz removal attempt: ', removedQuiz);
      if(err) { return handleError(res, err); }
      return res.json(200, removedQuiz);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}