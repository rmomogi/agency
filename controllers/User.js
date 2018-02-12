var models  = require('../models');

exports.index = function(req, res){
  search = req.query.search || ''
	models.User.findAll({
    where:{
      enabled: true,
      name: {
          $like: '%' + search + '%'
      }
    }
  }).then(users => {    
    res.render("user/index", {
      users: users
    });
  })
};

exports.new = function(req, res){
  res.render("user/new")
};

exports.create = function(req, res){
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    enabled: true
  }).then(function() {
    req.flash("info", "O cadastro foi salvo com sucesso!");
    res.redirect('/users');
  });
};

exports.show = function(req, res){
  res.send('show forum ' + req.params.forum);
};

exports.edit = function(req, res){  
  models.User.find({
    where: { id: req.params.user}
  })
  .then(user => {
    res.render("user/edit",{
      user: user
    });
  });  
};

exports.update = function(req, res){
  models.User.findOne({
    where: { id: req.params.user}
  })
  .then(user => {
    console.log(req.body);
    user.updateAttributes({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    })
    .then(user => {
      req.flash("info", "O cadastro foi alterado com sucesso!");      
      res.redirect('/users');
    });
  }); 
};

exports.destroy = function(req, res){
  models.User.findOne({
    where: { id: req.params.user}
  })
  .then(user => {
    user.updateAttributes({
      enabled: false
    })
    .then(user => {
      req.flash("info", "O cadastro foi removido com sucesso!");      
      res.redirect('/users');
    });
  }); 
};