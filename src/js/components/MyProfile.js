"use strict";

/**
 * @desc - set the custom validation for My Profile section
 */
function initMyProfile() {
    $("#input_confirmPassword").on("input", function () {
        this.setCustomValidity('');
        if (this.value !== $("#input_password").val()) {
            this.setCustomValidity("Does not match!");
            this.reportValidity();
        }
    })
}

/**
 * @desc - Populate the My Profile section with existing information
 *
 * @param {Object} user - user object
 */
function showMyProfile(user) {
    const { email, password, firstName, lastName, phone } = user || {};
    $("#input_email").val(email);
    $("#input_password").val(password);
    $("#input_confirmPassword").val(password);
    $("#input_firstName").val(firstName);
    $("#input_lastName").val(lastName);
    $("#input_phone").val(phone);
}

/**
 * @desc - Updates the user object with the input on the My Profile section
 *
 * @param {Object} user
 * @returns {function} - returns callback function
 */
function updateMyProfile(user) {
    return function () {
        $("#profileSection input").each(function () {
            if ($(this).attr("name") !== "confirmPassword") {
                user[$(this).attr("name")] = $(this).val();
            }
        })

        user.modified_date = formatDate(new Date());
    }
};