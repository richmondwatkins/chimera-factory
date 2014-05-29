'use strict';

var Mongo = require('mongodb');

exports.index = (req, res)=>{
  var chrimeras = global.nss.db.collection('chrimeras');
  chrimeras.find(req.query).toArray((err,records)=>{
    res.render('chrimeras/index', {bg: 'bg2.jpg', chrimeras: records, title: 'All Chrimeras'});
  });



};

exports.show = (req,res)=>{
  var chrimeras = global.nss.db.collection('chrimeras');
  var _id = Mongo.ObjectID(req.params.id);

  chrimeras.findOne({_id:_id}, (err, record)=>{
    res.render('chrimeras/show', {chrimera: record, title: 'Welcome to Node.js'});
  });
};

exports.new = (req, res)=>{
  res.render('chrimeras/new', {title: 'All Chrimeras'});

};


exports.create = (req, res)=>{
  var headPhoto;

  switch(req.body.headPhoto){
  case 'Lizard':
    headPhoto = 'lizard-head.jpg';
    break;
  case 'Horse':
    headPhoto = 'horse-head.jpg';
    break;
  case 'Gorilla':
    headPhoto = 'chyld.jpg';
    break;
  }

  var bodyPhoto;

  switch(req.body.bodyPhoto){
  case 'Lizard':
    bodyPhoto = 'lizard-body.jpg';
    break;
  case 'Horse':
    bodyPhoto = 'horse-body.jpg';
    break;
  case 'Gorilla':
    bodyPhoto = 'gorilla-body.png';
    break;
  }

  var legsPhoto;

  switch(req.body.legsPhoto){
  case 'Lizard':
    legsPhoto = 'lizard-legs.jpg';
    break;
  case 'Horse':
    legsPhoto = 'horse-legs.jpg';
    break;
  case 'Gorilla':
    legsPhoto = 'gorilla-legs.jpg';
    break;
  }

  req.body.headPhoto = headPhoto;
  req.body.bodyPhoto = bodyPhoto;
  req.body.legsPhoto = legsPhoto;
  var chrimeras = global.nss.db.collection('chrimeras');
  chrimeras.save(req.body, (err, obj)=>{  //req.body is the pet object
    res.redirect('/chrimeras');
  });
};

exports.destroy = (req, res)=>{
  var chrimeras = global.nss.db.collection('chrimeras');
  var _id = Mongo.ObjectID(req.params.id);

  chrimeras.findAndRemove({_id:_id}, (err, record)=>{
    console.log(record);
    res.redirect('/chrimeras');
  });
};
