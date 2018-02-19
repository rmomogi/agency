var models  = require('../models');
const Sequelize = require('sequelize');

exports.index = function(req, res){
  search = req.query.search || ''
	models.Sale.findAll({
    where:{
      number: { $like: '%' + search + '%' }
    },
    include: [{ model: models.User, attributes: ['fullName'] }]
  }).then(sales => {    
    res.render("sale/index", {
      sales: sales,
      message: ''
    });
  })
};