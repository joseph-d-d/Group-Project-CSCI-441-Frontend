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

/**
 * @desc Renders the html for the My Profile form
 *
 * @param {HTMLElement} parent - The parent element for the My Profile rendered html
 * @param {Object} [user={}] - The user information
 */
function showMyProfile(parent, user = {}) {
	$(parent).html(`
                        <div class="card mb-2 registrationSection" id="accountRegistration">
                            <div class="card-body">
                                <!-- Email -->
                                <div class="form-group">
                                    <label for="input_email">Email *</label>
                                    <input type="email" autocomplete="on" class="form-control input_email" name="email" id="input_email"
                                        placeholder="John.Smith@example.com" required
                                        ${user.email ? `value=${user.email}` : ''}>
                                </div>

                                <!-- Password -->
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="input_password">Password *</label>
                                        <input type="password" autocomplete="off" class="form-control input_password" name="password"
                                            id="input_password" placeholder="Password" minlength="8" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="input_confirmPassword">Confirm Password *</label>
                                        <input type="password" autocomplete="off" class="form-control input_confirmPassword"
                                            name="confirmPassword" id="input_confirmPassword"
                                            placeholder="Confirm Password" minlength="8" required>
                                    </div>
                                </div>

                                <!-- Name -->
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="input_firstName">First Name</label>
                                        <input type="text" class="form-control input_firstName" name="firstName"
                                            id="input_firstName" placeholder="John"
                                            ${user.firstName ? `value=${user.firstName}` : ''}>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="input_lastName">Last Name</label>
                                        <input type="text" class="form-control input_lastName" name="lastName"
                                            id="input_lastName" placeholder="Smith"
                                            ${user.lastName ? `value=${user.lastName}` : ''}>
                                    </div>
                                </div>

                                <!-- Contact -->
                                <div class="form-group">
                                    <label for="input_phone">Phone Number</label>
                                    <input type="tel" class="form-control input_phone" id="input_phone" name="phone"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" 
                                        ${user.phone ? `value=${user.phone}` : ''}>
                                </div>
                            </div>
                        </div>
	`)
	myProfileValidation();
}

// TODO: display currently saved payment method in showMyPaymentMethod function
// TODO: add event handlers/listeners for vehicles and payment method section


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

function createVehicleElement(vehicle) {
	// Create the list item (li)
	const list_vehicles_item = document.createElement("li");
	list_vehicles_item.classList.add("list-group-item", "d-flex", "flex-row", "justify-content-between", "align-items-center", "list_vehicles_item");

	// Create the span text to display license plate number
	const item_span = document.createElement("span");
	item_span.textContent = vehicle;

	// Create the a tag for the delete button
	const btn_deleteVehicle = document.createElement('a');
	btn_deleteVehicle.href = "#";
	btn_deleteVehicle.setAttribute("role", "button");
	btn_deleteVehicle.classList.add("btn", "btn-outline-danger", "btn-sm", "btn_deleteVehicle");
	btn_deleteVehicle.textContent = "Delete";

	// Append span and a tag to li
	list_vehicles_item.append(item_span, btn_deleteVehicle);

	return list_vehicles_item;
}


function populateVehiclesList(vehicles = []) {
	// Populates the list of vehicles if exists
	$(".list_vehicles").html('');
	vehicles.forEach(function (vehicle) {
		$(".list_vehicles").append(createVehicleElement(vehicle));
	})
}

$().live()

function showMyVehicles(parent, vehicles = []) {
	$(parent).html(`
        <!-- Vehicle Registration -->
        <div class="card mb-2 registrationSection" id="vehicleRegistration">
          <div>
            <div class="card-body row">

              <!-- License Plate # Input -->
              <div class="col-sm my-2">
                <div class="form-group">
                  <input type="text" class="form-control input_licensePlate" name="licensePlate"
                    id="input_licensePlate" pattern="[a-zA-Z0-9]{1,7}" placeholder="Enter License Plate">
                  <div class="invalid-feedback invalidLicensePlate">
                    License Plate already exists.
                  </div>
                </div>

                <div>
                  <a href="" class="btn btn-outline-primary btn-block btn-sm btn_addVehicle"
                    role="button">Add
                    Vehicle</a>
                </div>
              </div>

              <!-- License Plates List -->
              <div class="col-sm my-2">
				<ul class="list-group list_vehicles">
				</ul >
              </div >
            </div >
          </div >
        </div >
	`);

	populateVehiclesList(vehicles);

	// Set custom validation for license plate # input
	myVehiclesValidation();

	// Handles when "Add Vehicle" button is clicked
	$(".btn_addVehicle").click(function (event) {
		event.preventDefault();
		let isValid = validateLicensePlate();
		if (isValid) {
			vehicles = addVehicle($(".input_licensePlate").val(), vehicles);
			populateVehiclesList(vehicles);
		}
	})
}

function showMyPaymentMethod(parent, paymentMethod = {}) {
	$(parent).html(`
	< !--Payment Registration-- >
		<div class="card mb-2 registrationSection" id="paymentRegistration">
			<div>
				<div class="card-body">

					<!-- Payment Information Input -->
              <div class="my-2">
						<!-- Card Holder's Name -->
                <div class="form-group">
							<label for="input_cardName">
								<h6>Card Holder's Name</h6>
							</label>
							<input type="text" id="input_cardName" name="cardName" placeholder="John Smith" class="form-control input_cardName"
								data>
                </div>

							<!-- Card Number -->
                <div class="form-group">
								<label for="input_cardNumber">
									<h6>Card Number</h6>
								</label>
								<input type="text" id="input_cardNumber" name="cardNumber" placeholder="Valid card number"
									pattern="(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}" class="form-control input_cardNumber">
                </div>

								<!-- Exp and CVV -->
                <div class="row">
									<div class="col-sm-8">
										<div class="form-group">
											<label>
												<h6>Expiration Date</h6>
											</label>
											<div class="input-group">
												<label for="input_expMM"></label>
												<input type="number" id="input_expMM" placeholder="MM" name="expMM" class="form-control input_expMM" min="1"
													max="12" step="1">
													<label for="input_expYY"></label>
													<input type="number" id="input_expYY" placeholder="YY" name="expYY" class="form-control input_expYY"
														max="99" step="1">
                      </div>
                    </div>
											</div>
											<div class="col-sm-4">
												<div class="form-group mb-4">
													<label for="input_cvv">
														<h6>CVV</h6>
													</label>
													<input type="text" id="input_cvv" placeholder="123" name="cvv" class="form-control input_cvv"
														pattern="^\d{3,4}$">
                    </div>
												</div>
											</div>
											<div class="row justify-content-around">
												<a href="javascript:void" class="btn btn-outline-primary btn-sm my-1 btn_savePayment"
													role="button">Save Payment</a>

												<a href="javascript:void" class="btn btn-outline-danger btn-sm my-1 btn_deletePayment"
													role="button">Delete Payment</a>
											</div>
										</div>
										<div class="valid-feedback paymentInfoFeedback">
											<p class="mb-0">Saved!</p>
										</div>
									</div>
								</div>
							</div>
    `)
}