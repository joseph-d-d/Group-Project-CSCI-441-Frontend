"use strict";

/**
 * @desc Fetches the user data
 *
 * @returns {Object} - user object
 */
async function fetchUserData() {
    const response = await fetch("/user.json");
    const user = await response.json();
    return user;
}

let user = {};      // example user

/**
 * @desc Removes the "active" from class list
 */
function clearActive() {
    $(".active").removeClass("active");
}

/**
 * @desc Add the class "active" to the selected sidebar option
 *
 * @param {HTMLElement} el - the HTMLElement that will have "active" added to the class list
 */
function setActive(el) {
    el.classList.add("active");
}

/**
 * @desc Adds a "Update" button to the form and a hidden div for feedback; also includes the update button event listener
 *
 * @param {function} updateUserSettings - callback function that is triggered when update button is clicked
 */
function addUpdateButton(updateUserSettings) {
    $("form").append(`<button type="button" class="btn btn-outline-primary btn-sm btn_update">Update</button>`)
    $("form").append(`<div class="valid-feedback update_feedback"><p class="mb-0">Updated!</p></div>`)

    // Update button event
    $(".btn_update").click(function (event) {
        event.preventDefault();

        const form = $(this).parents("form")[0];

        // Specific Case: Payment Method Form, must require all input fields if any has any input; 
        // otherwise, all input fields are not required if they are all empty
        if ($("#paymentMethodSection").length) {
            if (paymentMethodIsEmpty()) {
                paymentMethodNotRequired();
            } else {
                paymentMethodRequired();
            }
        }

        // Valid form --> update
        if (form.reportValidity()) {
            updateUserSettings();

            // Display feedback to user that records have been updated
            $(".update_feedback").show();
            setTimeout(function () {
                $(".update_feedback").hide();
            }, 5000);
        }
        console.log(user);
    })
}

/**
 * @desc Load to the DOM the specific setting that user selected from the sidebar, and initialize event listeners/handlers
 *
 * @param {Object} user - User object containing the user's profile, vehicles, and payment method
 */
function displaySetting(user) {
    const setting = $(".active").attr("data-sidebar");

    $(".form_title").text(setting);
    switch (setting) {
        case "My Profile":
            $("#form_update").load("/modals/MyProfile.html", function () {
                initMyProfile();
                showMyProfile(user.profile);
                addUpdateButton(updateMyProfile(user));

                // TODO: send updated profile to database
            });
            break;
        case "My Vehicles":
            $("#form_update").load("/modals/MyVehicles.html", function () {
                initMyVehicles();
                showMyVehicles(user.vehicles);
                addUpdateButton(updateMyVehicles(user));

                // TODO: send updated vehicles to database
            });
            break;
        case "My Payment Method":
            $("#form_update").load("/modals/MyPaymentMethod.html", function () {
                initMyPaymentMethod();
                showMyPaymentMethod(user.paymentMethod);
                addUpdateButton(updateMyPaymentMethod(user));

                // TODO: send updated payment method to database
            });
            break;
        case "My Reservations":
            $("#form_update").load("/modals/MyReservations.html");
            break;
        default:
            console.error(`Error: ${setting} is not an available setting.`);
    }
}

// Event Listeners

$(document).ready(async function () {
    user = await fetchUserData();
    $(".emailAddress").text(user.profile.email);        // Show the user's email under My Account
    displaySetting(user);
});

$(".list-group-item").click(function (event) {
    event.preventDefault();
    clearActive();
    setActive(this);
    displaySetting(user);
})

$(".signOut").click(function (event) {
    // TODO: un-authenticate user
})
