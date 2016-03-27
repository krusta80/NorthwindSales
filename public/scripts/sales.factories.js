salesTeam.factory('FormFactory', function(SalesPeopleFactory, $http, $log) {
	var formObj = {};
	var newRegions = {};

	formObj.regions = ["North","East","West","South"];

	formObj.getNewRegionCount = function() {
		return formObj.regions.filter(function(region) {return newRegions[region];}).length;
	};

	formObj.toggleRegion = function(region) {
		newRegions[region] = !newRegions[region];
	};

	formObj.isActiveRegion = function(region) {
		return newRegions[region];
	};

	return formObj;
});

salesTeam.factory('SalesPeopleFactory', function($http,$log) {

	var salesPeopleObj = {};

	salesPeopleObj.fetchAll = function() {
		return $http.get('/api/salespeople/')
		  .then(function (res) { return res.data; })
		  .catch($log.error);
	};

	salesPeopleObj.fetchById = function(id) {
		return $http.get('/api/salespeople/' + id)
		  .then(function (res) { return res.data; })
		  .catch($log.error);
	};

	salesPeopleObj.create = function(salesPerson) {
		return $http.post('/api/salespeople/')
		  .then(function (res) { return res.data; })
		  .catch($log.error);
	};

	salesPeopleObj.update = function(salesPerson) {
		return $http.put('/api/salespeople/' + salesPerson._id)
		  .then(function (res) { return res.data; })
		  .catch($log.error);
	};

	salesPeopleObj.delete = function(salesPerson) {
		return $http.delete('/api/salespeople/' + salesPerson._id)
		  .then(function (res) { return res.data; })
		  .catch($log.error);
	};

	return salesPeopleObj;
});