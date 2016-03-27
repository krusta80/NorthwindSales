salesTeam.controller('FormController', function(FormFactory,SalesPeopleFactory) {
	
	this.refreshSalesPeople = function() {
		SalesPeopleFactory.fetchAll()
			.then(function(salesPeople) {
				this.salesPeople = salesPeople;
		});		
	};

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
	

	this.moveUp = function(index) {
		this.swapSpots(index - 1, index);
	};
	
	this.moveDown = function(index) {
		this.swapSpots(index, index + 1);
	};

	this.swapSpots = function(index1,index2) {
		var url1 = '/api/appointments/'+this.appointments[index1]._id;
		var data1 = { priority: this.appointments[index2].priority };
		var appt1;

    //consider using $q.all -- these calls are independent.. no?
		
		$http.put(url1, data1)
		.then(function(response) {
			return response.data;
		})
		.then(function(appointment) {
			console.log("updated appointment " + appointment._id);
			appt1 = appointment;
			var url2 = '/api/appointments/' + this.appointments[index2]._id;
			var data2 = {priority: this.appointments[index1].priority};
			return $http.put(url2, data2);
		})
		.then(function(response) {
			return response.data;
		})
		.then(function(appointment) {
			console.log("updated appointment " + appointment._id);
			var appt2 = appointment;
			this.appointments[index1] = appt2;
			this.appointments[index2] = appt1;
		})
		.catch(console.error.bind(console));
	};
	
	this.delete = function(index) {
		$http.delete('/api/appointments/' + this.appointments[index]._id)
		.then(function(response) {
			return response.data;
		})
		.then(function(appointment) {
			this.appointments.splice(index,1);
			console.log("removed appointment " + appointment._id);
		})
		.catch(console.error.bind(console));
	};

	this.addProduct = function() {
		if(isNotAWholeNumber(this.appt.priority)) {
			this.displayFormError("Priority must be a whole number!");
			return;
		}
		$http.post('/api/appointments', this.appt)
		.then(function(response) {
			this.refreshAppointments();
		})
		.catch(this.displayFormError);
	};

	this.displayFormError = function(err) {
		this.displayError = true;
		this.errorMessage = "Processing error";
		$window.document.getElementById("newName").focus();
		console.log(err);
	};

	this.refreshSalesPeople();
	
});

