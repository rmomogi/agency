var models  = require('../models');

exports.index = function(req, res){

  search = req.query.search || ''

	models.Service.findAll({
    where:{
      status: 'active',
      name: { $like: '%' + search + '%' }
    }
  }).then(services => {    
    res.render("service/index", {
      services: services,
      message: ''
    });
  })
};

exports.new = function(req, res){
  res.render("service/new") 
};

exports.create = function(req, res){
  models.Service.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price    
  }).then(function() {
    req.flash("info", "O cadastro foi salvo com sucesso!");
    res.redirect('/services');
  });
};

exports.show = function(req, res){
  res.send('show forum ' + req.params.forum);
};

exports.edit = function(req, res){  
  models.Service.find({
    where: { id: req.params.service}
  })
  .then(service => {
    res.render("service/edit", {        
      service: service
    });    
  });  
};

exports.update = function(req, res){  
  models.Service.findOne({
    where: { id: req.params.service}
  })
  .then(service => {    
    service.updateAttributes({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    })
    .then(service => {
      req.flash("info", "O cadastro foi alterado com sucesso!");      
      res.redirect('/services');
    });
  }); 
};

exports.destroy = function(req, res){
  models.Service.findOne({
    where: { id: req.params.service}
  })
  .then(service => {    
    service.updateAttributes({
      status: 'inactive'
    })
    .then(service => {
      req.flash("info", "O cadastro foi removido com sucesso!");      
      res.redirect('/services');
    });
  }); 
};