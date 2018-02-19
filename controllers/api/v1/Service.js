var models  = require('../../../models');

exports.all = function(req, res){
  models.Service.findAll({
    where:{
      status: true
    }
  }).then(services => {    
    res.json(services);
  })
};