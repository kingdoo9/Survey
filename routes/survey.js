var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');
var Question = require('../models/Question');


function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  Survey.find({}, function(err, surveys) {
    if (err) {
      return next(err);
    }
    res.render('survey/index', {surveys: surveys});
  });
});

router.post('/', function(req, res, next) {
    var NewSurvey = new Survey({
      name: req.body.name,
      userid: req.user.id,
      content: req.body.content
    });
    NewSurvey.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success','됬어요!!!!!');

    });

    Question.find({belongto : 'new'}, function(err,questions){

        questions.content1 = req.body.select1 || 'N/A';
        questions.content2 = req.body.select2 || 'N/A';
        questions.content3 = req.body.select3 || 'N/A';
        questions.content4 = req.body.select4 || 'N/A';
        questions.content5 = req.body.select5 || 'N/A';
        questions.belongto = NewSurvey.id;

    });

    Survey.find({}, function(err, surveys) {
        if (err) {
          return next(err);
        }
        res.render('/survey/index', {surveys: surveys});
    });
});

router.get('/new', needAuth, function(req, res, next) {
  Question.find({belongto : 'new'}, function(err,questions){
    if (err){
      return next(err);
    }
    res.render('survey/new', {questions: questions});
  });

});

router.post('/new/Question1', function(req, res, next) {
  var Nquestion = new Question({
    name: 'Selection',
    content1: 'N/A',
    content2: 'N/A',
    content3: 'N/A',
    content4: 'N/A',
    content5: 'N/A',
    number: 1,
    belongto: 'new'
  });

  Nquestion.save(function(err) {
    if (err) {
      req.flash('success','에러...!!!!!');
      return next(err);
    }
    req.flash('success','됬어요!!!!!');
    res.redirect('/survey/new');
  });
});

router.post('/new/Question2', function(req, res, next) {
  var Nquestion = new Question({
    name: 'OneQueText',
    content: 'string',
    number: 2,
    belongto: 'new'
  });

  Nquestion.save(function(err) {
    if (err) {
      req.flash('success','에러...!!!!!');
      return next(err);
    }
    req.flash('success','됬어요!!!!!');
    res.redirect('/survey/new');
  });
});
router.post('/new/Question3', function(req, res, next) {
  var Nquestion = new Question({
    name: 'Opinion',
    content: 'string',
    number: 3,
    belongto: 'new'
  });

  Nquestion.save(function(err) {
    if (err) {
      req.flash('success','에러...!!!!!');
      return next(err);
    }
    req.flash('success','됬어요!!!!!');
    res.redirect('/survey/new');
  });
});


module.exports = router;
