'use strict';

var traceur = require('traceur');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var chrimeras = traceur.require(__dirname + '/../routes/chrimeras.js');

  app.get('/', home.index);
  app.get('/help', home.help);
  app.get('/about', home.about);

  app.get('/chrimeras', chrimeras.index);
  app.get('/chrimeras/new', chrimeras.new);

  app.get('/chrimeras/:id', chrimeras.show);
  app.post('/chrimeras', chrimeras.create);

  app.post('/chrimeras/:id/delete', chrimeras.destroy);
  // app.post('/chrimeras', chrimeras.createHead);

  // app.post('/chrimeras', chrimeras.createBody);

  console.log('Routes Loaded');
  fn();
}
