//seems a little overcomplicated...
salesTeam.factory('FormFactory', function(SalesPeopleFactory, $http, $log, $rootScope) {
	var formObj = {};
	var newRegions = {};
	
	var getNewRegions = function() {
		return formObj.regions.filter(function(region) {return newRegions[region];});
	};

	$rootScope.regions = ["North","East","West","South"];
	formObj.regions = $rootScope.regions;

	formObj.getNewRegionCount = function() {
		return getNewRegions().length;
	};

	formObj.toggleRegion = function(region) {
		newRegions[region] = !newRegions[region];
	};

	formObj.isActiveRegion = function(region) {
		return newRegions[region];
	};

	formObj.addSalesPerson = function(name) {
		var newSalesPerson = {name: name, regions: getNewRegions()};
		return SalesPeopleFactory.create(newSalesPerson)
			.then(function(salesPerson) {
				deferred.resolve(salesPerson);
				$rootScope.salesPeople.push(salesPerson);//root scope bad.. you don't need it..
			});
	};

	formObj.resetNewRegions = function() {
		newRegions = {};
	};

	return formObj;
});

salesTeam.factory('ListFactory', function(SalesPeopleFactory, $log, $q, $rootScope) {
	var listObj = {};
	
	listObj.regions = $rootScope.regions;

	listObj.getSalesPeople = function() {
		return $rootScope.salesPeople;
	};

	listObj.hasRegion = function(salesPerson, region) {
		return salesPerson.regions.filter(function(reg) {return reg === region;}).length > 0;
	};

	listObj.removeSalesPerson = function(id) {
		var deferred = $q.defer();
		SalesPeopleFactory.delete(id)
			.then(function(salesPerson) {
				deferred.resolve(salesPerson);
				$rootScope.salesPeople = $rootScope.salesPeople.filter(function(salesPerson) {return salesPerson._id !== id});
			});
		return deferred.promise;
	};

	listObj.toggleRegion = function(salesPerson, region) {
		var deferred = $q.defer();
		var toggledRegions = salesPerson.regions.slice(0);
		var toggledSalesPerson = {_id: salesPerson._id, name: salesPerson.name, regions: toggledRegions};

		if(!listObj.hasRegion(salesPerson, region)) {
			toggledRegions.push(region);
		}
		else {
			toggledRegions.splice(toggledRegions.indexOf(region),1);
		}
		
		SalesPeopleFactory.update(toggledSalesPerson)
			.then(function(person) {
				deferred.resolve(person);
				salesPerson.regions = person.regions;
			});
		return deferred.promise;
	};

	SalesPeopleFactory.fetchAll()
		.then(function(salesPeople) {
			$rootScope.salesPeople = salesPeople;
		}.bind(this));

	return listObj;
});

salesTeam.factory('SalesPeopleFactory', function($http, $log) {

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
		return $http.post('/api/salespeople/', salesPerson)
		  .then(function (res) { return res.data; })
		  .catch($log.error);
	};

	salesPeopleObj.update = function(salesPerson) {
		return $http.put('/api/salespeople/' + salesPerson._id, salesPerson)
		  .then(function (res) { return res.data; })
		  .catch($log.error);
	};

	salesPeopleObj.delete = function(id) {
		return $http.delete('/api/salespeople/' + id)
		  .then(function (res) { return res.data; })
		  .catch($log.error);
	};

	return salesPeopleObj;
});
