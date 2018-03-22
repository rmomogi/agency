var models  = require('../models');

exports.index = function(req, res){

  search = req.query.search || ''

	models.Genre.findAll({
    where: {
      enabled: true,
      title: {
          $like: '%' + search + '%'
      }      
    }
  }).then(genres => {    
    res.render("genre/index", {
      genres: genres
    });
  })
};

exports.new = function(req, res){
  res.render("genre/new")
};

exports.create = function(req, res){
  models.Genre.create({
    title: req.body.title,
    enabled: true
  }).then(function() {
    req.flash("info", "O cadastro foi salvo com sucesso!");
    res.redirect('/genres');
  });
};

exports.show = function(req, res){
  res.send('show forum ' + req.params.forum);
};

exports.edit = function(req, res){  
  models.Genre.find({
    where: { id: req.params.genre}
  })
  .then(genre => {
    res.render("genre/edit",{
      genre: genre
    });
  });  
};

exports.update = function(req, res){
  console.log(req.body)
  models.Genre.findOne({
    where: { id: req.params.genre}
  })
  .then(genre => {
    console.log(req.body);
    genre.updateAttributes({
      title: req.body.title
    })
    .then(genre => {
      req.flash("info", "O cadastro foi alterado com sucesso!");      
      res.redirect('/genres');
    });
  }); 
};

exports.destroy = function(req, res){
  models.Genre.findOne({
    where: { id: req.params.genre}
  })
  .then(genre => {
    console.log(req.body);
    genre.updateAttributes({
      enabled: false
    })
    .then(genre => {
      req.flash("info", "O cadastro foi removido com sucesso!");      
      res.redirect('/genres');
    });
  }); 
};