// My Profile

/**
 * @desc Set the custom form validation for the My Profile section
 */
function myProfileValidation() {
	$(".input_confirmPassword").on("input", function () {
		this.setCustomValidity('');
		if (this.value !== $(".input_password").val()) {
			this.setCustomValidity("Does not match!");
			this.reportValidity();
		}
	})
}

function myVehiclesValidation() {
	$(".input_licensePlate").on("invalid", function () {
		this.setCustomValidity("Please enter a valid license plate number.");
	})

	$(".input_licensePlate").on("input", function () {
		this.setCustomValidity('');
		$(".invalidLicensePlate").hide();
	})
}

function validateLicensePlate() {
	let isValid = true;
	const input_licensePlate = $(".input_licensePlate")[0];
	input_licensePlate.required = true;

	// Validate license plate input
	isValid = input_licensePlate.reportValidity();

	input_licensePlate.required = false;
	return isValid;
}

function deleteVehicle(vehicleToDelete, vehicles) {
	return vehicles.filter(function (vehicle) {
		return vehicleToDelete !== vehicle
	})
}

function addVehicle(vehicleToAdd, vehicles) {
	vehicles = new Set(vehicles);

	if (vehicles.has(vehicleToAdd.toUpperCase())) {
		$(".invalidLicensePlate").show();
		$(".input_licensePlate")[0].focus();
	} else {
		vehicles.add(vehicleToAdd.toUpperCase());
		$(".invalidLicensePlate").hide();
	}
	return [...vehicles];
}




	// Handles when "Add Vehicle" button is clicked
	$(".btn_addVehicle").click(function (event) {
		event.preventDefault();
		let isValid = validateLicensePlate();
		if (isValid) {
			vehicles = addVehicle($(".input_licensePlate").val(), vehicles);
			populateVehiclesList(vehicles);
		}
	})
