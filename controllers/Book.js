var models  = require('../models');

exports.index = function(req, res){

  search = req.query.search || ''

	models.Book.findAll({
    where:{
      enabled: true,
      $or: 
      [{ name: { $like: '%' + search + '%' } },
       { author: { $like: '%' + search + '%'} }]
    },
    include: 
    [{ model: models.Genre, attributes: ['title'] }]
  }).then(books => {    
    res.render("book/index", {
      books: books
    });
  })
};

exports.new = function(req, res){
  models.Genre.findAll({
    where: {
      enabled: true
    }
  }).then(genres => {    
    res.render("book/new", {
      genres: genres
    });
  }) 
};

exports.create = function(req, res){
  models.Book.create({
    name: req.body.name,
    author: req.body.author,
    publishing_company: req.body.publishing_company,
    genre_id: req.body.GenreId,
    enabled: true
  }).then(function() {
    req.flash("info", "O cadastro foi salvo com sucesso!");
    res.redirect('/books');
  });
};

exports.show = function(req, res){
  res.send('show forum ' + req.params.forum);
};

exports.edit = function(req, res){  
  models.Book.find({
    where: { id: req.params.book}
  })
  .then(book => {
    models.Genre.findAll({
      where:{
        enabled: true
      }
    }).then(genres => {    
      res.render("book/edit", {
        genres: genres,
        book: book
      });
    }) 
  });  
};

exports.update = function(req, res){  
  models.Book.findOne({
    where: { id: req.params.book}
  })
  .then(book => {    
    book.updateAttributes({
      name: req.body.name,
      author: req.body.author,
      publishing_company: req.body.publishing_company,
      genre_id: req.body.GenreId
    })
    .then(book => {
      req.flash("info", "O cadastro foi alterado com sucesso!");      
      res.redirect('/books');
    });
  }); 
};

exports.destroy = function(req, res){
  models.Book.findOne({
    where: { id: req.params.book}
  })
  .then(book => {    
    book.updateAttributes({
      enabled: false
    })
    .then(book => {
      req.flash("info", "O cadastro foi removido com sucesso!");      
      res.redirect('/books');
    });
  }); 
};