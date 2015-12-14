var express = require('express');
var router = express.Router();
var Survey = require('../models/survey'),
    User = require('../models/User');
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
    for(var i=0; i<req.user.NumQue; i++){
      Question.findOne({belongto : 'new'}, function(err,questions){

        questions.content1 = req.body.select1 || 'N/A';
        questions.content2 = req.body.select2 || 'N/A';
        questions.content3 = req.body.select3 || 'N/A';
        questions.content4 = req.body.select4 || 'N/A';
        questions.content5 = req.body.select5 || 'N/A';
        questions.belongto = NewSurvey.id;


        questions.save(function(err){
          if(err){
            return next(err);
          }
        });
      });
    }

    req.user.NumQue = 0;
    req.user.save(function(err){
      if(err){
        next(err);
      }
    });

    Survey.find({}, function(err, surveys) {
        if (err) {
          return next(err);
        }
        res.redirect('/survey');
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

    req.user.NumQue =+ 1;
    req.user.save(function(err){
      if(err){
        next(err);
      }
    });

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
    req.user.NumQue =+ 1;
    req.user.save(function(err){
      if(err){
        next(err);
      }
    });

  var Nquestion = new Question({
    name: 'OneQueText',
    content1: 'N/A',
    content2: 'N/A',
    content3: 'N/A',
    content4: 'N/A',
    content5: 'N/A',
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
  req.user.NumQue =+ 1;
  req.user.save(function(err){
    if(err){
      next(err);
    }
  });
  var Nquestion = new Question({
    name: 'Opinion',
    content1: 'N/A',
    content2: 'N/A',
    content3: 'N/A',
    content4: 'N/A',
    content5: 'N/A',
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

router.get('/:id', function(req, res, next) {
  Survey.findById(req.params.id, function(err, survey) {
    if (err) {
      return next(err);
    }

    Question.find({belongto : survey.id}, function(err, questions){
      if (err) {
        return next(err);
      }
        res.render('survey/show', {survey: survey, questions: questions});
    });
  });
});

module.exports = router;
