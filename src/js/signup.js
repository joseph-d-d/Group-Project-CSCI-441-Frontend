/*$(window).load(function () {
    $("#general_content").html("Generic message displayed on the general modal.");
    $("#general_modal").modal();
});*/

// Global Variables
const accountInfo = {};
const vehiclesInfo = new Set();
const paymentInfo = {};
let user = {};

// Misc


// DOM Elements
const formSignUp = document.querySelector(".form-signup");

const inputs_accountRegistration = document.querySelectorAll("#accountRegistration input");
const input_password = document.querySelector(".input_password");
const input_confirmPassword = document.querySelector(".input_confirmPassword");

const input_licensePlate = document.querySelector(".input_licensePlate");
const invalidLicensePlate = document.querySelector(".invalidLicensePlate");
const btn_addVehicle = document.querySelector(".btn_addVehicle");
const list_vehicles = document.querySelector(".list_vehicles");

const input_expYY = document.getElementById("input_expYY");

const inputs_paymentRegistration = document.querySelectorAll("#paymentRegistration input");
const input_cardNumber = document.getElementById("input_cardNumber");
const btn_savePayment = document.querySelector(".btn_savePayment");
const btn_deletePayment = document.querySelector(".btn_deletePayment");
const paymentInfoFeedback = document.querySelector(".paymentInfoFeedback");

const btn_submitForm = document.querySelector(".btn_submitForm");

// Event Handlers

/**
 * Validates the license plate input box
 *
 * @returns {boolean} - true if valid, otherwise false
 */
function validateLicensePlate() {
    let isValid = true;
    input_licensePlate.required = true;

    // Validate license plate input
    isValid = input_licensePlate.reportValidity();

    input_licensePlate.required = false;
    return isValid;
}

/**
 * Removes the vehicle from the vehicles data structure and deletes the vehicle li node
 */
function deleteVehicle() {
    // delete from set data structure
    vehiclesInfo.delete(this.parentNode.childNodes[0].textContent);

    // delete li node
    this.parentNode.parentNode.removeChild(this.parentNode);
}

/**
 * Adds a vehicle to the ul list and adds the license plate number to the vehicles data structure
 */
function addVehicle() {
    // Check if list already contains license plate entered
    if (vehiclesInfo.has(input_licensePlate.value.toUpperCase())) {
        // If license plate already exists, display invalid entry message
        invalidLicensePlate.style.display = "block"
        input_licensePlate.focus();
        return;
    } else {
        // Otherwise, add to vehicles set data structure
        vehiclesInfo.add(input_licensePlate.value.toUpperCase());
        invalidLicensePlate.style.display = "none";
    }

    // Create the list item (li)
    const list_vehicles_item = document.createElement("li");
    list_vehicles_item.classList.add("list-group-item", "d-flex", "flex-row", "justify-content-between", "align-items-center", "list_vehicles_item");

    // Create the span text to display license plate number
    const item_span = document.createElement("span");
    item_span.textContent = input_licensePlate.value.toUpperCase();

    // Create the a tag for the delete button
    const btn_deleteVehicle = document.createElement('a');
    btn_deleteVehicle.href = "javascript:void";
    btn_deleteVehicle.setAttribute("role", "button");
    btn_deleteVehicle.classList.add("btn", "btn-outline-danger", "btn-sm", "btn_deleteVehicle");
    btn_deleteVehicle.textContent = "Delete";
    btn_deleteVehicle.addEventListener("click", deleteVehicle);

    // Append span and a tag to li
    list_vehicles_item.appendChild(item_span);
    list_vehicles_item.appendChild(btn_deleteVehicle);

    // Append li to ul
    list_vehicles.appendChild(list_vehicles_item);

    // Remove contents of the input box for license plate
    input_licensePlate.value = '';
    input_licensePlate.focus();
}

/**
 * Validates the user input for payment information.
 *
 * @returns {boolean} - true if valid, otherwise false
 */
function validatePaymentInformation() {
    let isValid = false;

    for (let i = 0; i < inputs_paymentRegistration.length; i++) {
        // Upon clicking "Save Payment Method", make all input fields for Payment Information required
        inputs_paymentRegistration[i].required = true;
        isValid = inputs_paymentRegistration[i].reportValidity();
        if (!isValid) break;
    }

    return isValid;
}

// Event Listeners
window.addEventListener("DOMContentLoaded", function () {
    input_confirmPassword.addEventListener("input", function () {
        this.setCustomValidity('');
        if (this.value !== input_password.value) {
            this.setCustomValidity("Does not match!");
            this.reportValidity();
        }
    })


    // Custom input validation for input box for adding license plate number
    input_licensePlate.addEventListener("invalid", function () {
        this.setCustomValidity("Please enter a valid license plate number.");
    });
    input_licensePlate.addEventListener("input", function () {
        this.setCustomValidity('');
        invalidLicensePlate.style.display = "none";
    })

    // Custom input validation for input box for adding Card payment Information
    input_cardNumber.addEventListener("invalid", function () {
        this.setCustomValidity("Please enter a valid card number.");
    })
    input_cardNumber.addEventListener("input", function () {
        this.setCustomValidity('');		// Removes custom error, otherwise will result in invalid field
        this.checkValidity();		// manual validation
        this.setCustomValidity(validity.valid ? '' : "Please enter a valid card number."); // sets error if still invalid
    })

    // Set minimum expiration year YY on payment method
    const currentYear = (new Date()).getFullYear();
    input_expYY.setAttribute("min", (currentYear % 100).toString());
})

btn_addVehicle.addEventListener("click", function () {
    let isValid = validateLicensePlate();
    if (isValid) {
        addVehicle();
    }
});

btn_savePayment.addEventListener("click", function () {
    paymentInfoFeedback.style.display = "none";
    let isValid = validatePaymentInformation();
    if (isValid) {
        // Display "Updated!" if already have user's payment info
        if (Object.keys(paymentInfo).length > 0) {
            paymentInfoFeedback.textContent = "Updated!";
        } else {
            paymentInfoFeedback.textContent = "Saved!";
        }

        // Store payment information in object data structure
        inputs_paymentRegistration.forEach(function (input) {
            paymentInfo[input.getAttribute("name")] = input.value;
        })

        // Displays the success block
        paymentInfoFeedback.classList.remove("invalid-feedback");
        paymentInfoFeedback.classList.add("valid-feedback");
        paymentInfoFeedback.style.display = "block";

        // Focus on final step, which is submitting the form
        btn_submitForm.focus();
    }
});

btn_deletePayment.addEventListener("click", function () {
    paymentInfoFeedback.style.display = "none";

    // If we have a record of their payment information
    if (Object.keys(paymentInfo).length > 0) {
        for (let key in paymentInfo) {
            delete paymentInfo[key];        // remove record
        }

        // Change display of feedback to "Deleted!" in red text
        paymentInfoFeedback.classList.remove("valid-feedback");
        paymentInfoFeedback.classList.add("invalid-feedback");
        paymentInfoFeedback.textContent = "Deleted!";
        paymentInfoFeedback.style.display = "block";
    }

    // Remove values in input fields for payment info
    inputs_paymentRegistration.forEach(function (input) {
        input.value = '';
        input.required = false;
    })

    inputs_paymentRegistration[0].focus();
});

btn_submitForm.addEventListener("click", function (e) {
    e.preventDefault();

    // Save to accountsInfo object
    inputs_accountRegistration.forEach(function (input) {
        if (input.getAttribute("name") !== "confirmPassword") {
            accountInfo[input.getAttribute("name")] = input.value;
        };
    })

    // TODO: connect to backend to create new user
    let { email, password, firstName, lastName, phone } = accountInfo;
    user = {
        email,
        password,
        firstName,
        lastName,
        phone,
        vehicles: [...vehiclesInfo],
        paymentMethods: [paymentInfo]
    }
});