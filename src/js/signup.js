"use strict";

$(document).ready(function () {
    let user = {
        profile: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: ''
        },
        vehicles: [],
        paymentMethod: {
            cardName: '',
            cardNumber: '',
            expMM: '',
            expYY: '',
            cvv: ''
        }
    };

    // Initialize with event listeners and custom validations
    initMyProfile();
    initMyVehicles();
    initMyPaymentMethod();

    // On form submission
    $(".btn_submitForm").click(function (event) {
        event.preventDefault();

        // Specific Case: Payment Method Form, must require all input fields if any has any input; 
        // otherwise, all input fields are not required if they are all empty
        if ($("#paymentMethodSection").length) {
            if (paymentMethodIsEmpty()) {
                paymentMethodNotRequired();
            } else {
                paymentMethodRequired();
            }
        }

        // Valid form --> create new user
        if ($("form")[0].reportValidity()) {
            updateMyProfile(user)();
            updateMyVehicles(user)();
            updateMyPaymentMethod(user)();

            // TODO: Connect to backend to create new user
        }

    })
})