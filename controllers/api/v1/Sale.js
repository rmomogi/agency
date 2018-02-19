var models  = require('../../../models');
const Sequelize = require('sequelize');

exports.create = function(req, res){
	models.Sale.create({
    number: generateNumber(req.body.user),
    status: 1,
    payment: "W0X",
    user_id: req.body.user
  }).then(function(sale) {
  	// Save items
  	for (var i = req.body.items.length - 1; i >= 0; i--) {
  		models.SaleItem.create({
	    	sale_id: sale.id,
    		service_id: req.body.items[i].service_id,
    		description: req.body.items[i].description,
    		quantity: parseInt(req.body.items[i].quantity),
    		price: parseFloat(req.body.items[i].price)
  		})
  		console.log(req.body.items[i]);
  	};

  	res.json({ status: 'OK', message: ''});

  }).catch(Sequelize.ValidationError, function (msg){
    res.json({ status: 'KO', message: '' })
  })
};

function generateNumber(user){
	var current = new Date();
	return current.getFullYear() + "W" + current.getTime() + user
}