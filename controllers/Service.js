var models  = require('../models');
const Sequelize = require('sequelize');

exports.index = function(req, res){
  search = req.query.search || ''
	models.Service.findAll({
    where:{
      status: true,
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
    price: parseFloat(req.body.price.replace('.', '').replace(',', '.')).toFixed(2),
    package: req.body.package ? true : false
  }).then(function() {
    req.flash("info", "O cadastro foi salvo com sucesso!");
    res.redirect('/services');
  }).catch(Sequelize.ValidationError, function (msg){    
    res.render("service/new", {
      messages: msg.errors 
    })
  })
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
      price: parseFloat(req.body.price.replace('.', '').replace(',', '.')).toFixed(2),
      package: req.body.package ? true : false
    })
    .then(service => {
      req.flash("info", "O cadastro foi alterado com sucesso!");      
      res.redirect('/services');
    });
  }).catch(Sequelize.ValidationError, function (msg){    
    res.render("service/edit", {
      service: service,
      messages: msg.errors 
    })
  }); 
};

exports.destroy = function(req, res){
  models.Service.findOne({
    where: { id: req.params.service}
  })
  .then(service => {    
    service.updateAttributes({
      status: false
    })
    .then(service => {
      req.flash("info", "O cadastro foi removido com sucesso!");      
      res.redirect('/services');
    });
  }); 
};