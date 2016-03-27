var mongoose = require('mongoose');
var Promise = require('bluebird');

var salesPersonSchema = new mongoose.Schema({
	name: {type: String, required: true},
	regions: {type: [String]}
});

salesPersonSchema.pre('validate', function(next) {
	var acceptedRegions = {North:true, East:true, West:true, South:true};
	this.regions = this.regions.filter(function(region) {
		return acceptedRegions[region];
	});
	if(this.isNew && this.regions.length < 1)
		throw new Error('At least one region is required!');
	if(this.regions.length > 3)
		throw new Error('At most three regions allowed!');
	next();
});

var SalesPerson = mongoose.model('SalesPerson',salesPersonSchema);

var _conn = null;
module.exports = {
  connect: function(){
    if(_conn)
      return _conn;
    _conn = new Promise(function(resolve, reject){
      mongoose.connect(process.env.CONN || 'mongodb://localhost/sales', function(err){
          if(err)
            return reject(err);
          resolve(mongoose.connection);
          });
    
    });
    return _conn;
  },
  models: {
    SalesPerson: SalesPerson
  }
};
