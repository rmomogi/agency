var models  = require('../models');

exports.index = function(req, res){

  search = req.query.search || ''

	models.Loan.findAll({
    include: [{ model: models.Book, attributes: ['name'] },
              { model: models.User, attributes: ['name'] }
             ]
  }).then(loans => {    
    res.render("loan/index", {
      loans: loans
    });
  })
};

exports.new = function(req, res){
  models.Book.findAll({
    where: {
      enabled: true
    }
  }).then(books => {
    models.User.findAll({
      where: {
        enabled: true
      }
    }).then(users => {
      res.render("loan/new", {
        books: books,
        users: users
      });
    });
  }) 
};

exports.create = function(req, res){
  models.Loan.create({
    name: req.body.name,
    author: req.body.author,
    publishing_company: req.body.publishing_company,
    genre_id: req.body.GenreId,
    enabled: true
  }).then(function() {
    req.flash("info", "O cadastro foi salvo com sucesso!");
    res.redirect('/loans');
  });
};

exports.show = function(req, res){
  res.send('show forum ' + req.params.forum);
};

exports.edit = function(req, res){  
  models.Loan.find({
    where: { id: req.params.loan}
  })
  .then(loan => {
    models.Genre.findAll({
      where:{
        enabled: true
      }
    }).then(genres => {    
      res.render("loan/edit", {
        genres: genres,
        loan: loan
      });
    }) 
  });  
};

exports.update = function(req, res){  
  models.Loan.findOne({
    where: { id: req.params.loan}
  })
  .then(loan => {    
    loan.updateAttributes({
      name: req.body.name,
      author: req.body.author,
      publishing_company: req.body.publishing_company,
      genre_id: req.body.GenreId
    })
    .then(loan => {
      req.flash("info", "O cadastro foi alterado com sucesso!");      
      res.redirect('/loans');
    });
  }); 
};

exports.destroy = function(req, res){
  models.Loan.findOne({
    where: { id: req.params.loan}
  })
  .then(loan => {    
    loan.updateAttributes({
      enabled: false
    })
    .then(loan => {
      req.flash("info", "O cadastro foi removido com sucesso!");      
      res.redirect('/loans');
    });
  }); 
};