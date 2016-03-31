salesTeam.controller('FormController', function(FormFactory) {
	
	this.regions = function() {
		return FormFactory.regions;
	};

	this.newRegionCount = function() {
		return FormFactory.getNewRegionCount();
	};

	this.toggleRegion = function(region) {
		FormFactory.toggleRegion(region);
	};	

	this.isActiveRegion = function(region) {
		return FormFactory.isActiveRegion(region);
	};	

	this.canSubmit = function() {
		return FormFactory.getNewRegionCount() > 0 && this.name;
	};

	this.addSalesPerson = function() {
		FormFactory.addSalesPerson(this.name)
			.then(function(salesPerson) {
				this.name = "";
				FormFactory.resetNewRegions();
				console.log(salesPerson);	
			}.bind(this));//not crazy about this -- feels like your factory needs to know about your controller?
	};
	
	this.displayFormError = function(err) {
		this.displayError = true;
		this.errorMessage = "Processing error";
		$window.document.getElementById("newName").focus();
		console.log(err);
	};

});

salesTeam.controller('ListController', function(ListFactory) {
  // ok so controller as syntac.. i'm fine with that.

	this.salesPeople = function() {
		return ListFactory.getSalesPeople();
	};

	this.regions = function() {
		return ListFactory.regions;
	};

	this.hasRegion = function(salesPerson,region) {
		return ListFactory.hasRegion(salesPerson,region);
	};

	this.toggleRegion = function(salesPerson, region) {
		ListFactory.toggleRegion(salesPerson, region);
	};

	this.removeSalesPerson = function(id) {
		ListFactory.removeSalesPerson(id)
			.then(function(salesPerson) {
				console.log(salesPerson);	
			}.bind(this));//same comment as above comment
	};

});
