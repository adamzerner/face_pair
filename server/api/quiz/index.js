'use strict';

var express = require('express');
var controller = require('./quiz.controller');

var router = express.Router();

// /api/quiz/:id/people
// router.use('/:id/people', require('../person'))

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;