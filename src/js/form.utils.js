
function showMyProfile(parent, user = {}) {
    $(parent).html(`
                        <div class="card border-0 mb-2 registrationSection" id="accountRegistration">
                            <div class="card-body p-0">
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
                                        <input type="password" autocomplete="on" class="form-control input_password" name="password"
                                            id="input_password" placeholder="Password" minlength="8" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="input_confirmPassword">Confirm Password *</label>
                                        <input type="password" autocomplete="on" class="form-control input_confirmPassword"
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
                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="123-456-7890" 
                                        ${user.phone ? `value=${user.phone}` : ''}>
                                </div>
                            </div>
                        </div>
`)
}

// TODO: add event listeners for my profile update button
// TODO: display list of vehicles in showMyVehicles function
// TODO: display currently saved payment method in showMyPaymentMethod function
// TODO: add event handlers/listeners for vehicles and payment method section


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
                  <a href="javascript:void" class="btn btn-outline-primary btn-block btn-sm btn_addVehicle"
                    role="button">Add
                    Vehicle</a>
                </div>
              </div>

              <!-- License Plates List -->
              <div class="col-sm my-2">
                <ul class="list-group list_vehicles"></ul>
              </div>
            </div>
          </div>
        </div>
    `);
}

function showMyPaymentMethod(parent, paymentMethod = {}) {
    $(parent).html(`
         <!-- Payment Registration -->
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