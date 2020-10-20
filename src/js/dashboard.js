// Example user
let user = {};

// Functions and Event handlers
function updateMyProfile() {
    const accountInfo = {};
    $("form").find("input").each(function () {
        const nameAttr = this.getAttribute("name");
        if (nameAttr !== "confirmPassword") {
            accountInfo[nameAttr] = this.value || user[nameAttr];
        }
    })

    user = Object.assign(user, accountInfo);

    // TODO: POST request to save to database

    $(".emailAddress").text(user.email);        // Show the user's email under My Account
}

function updateMyVehicles() {
    const vehicles = [...user.vehicles];
}

function updateMyPaymentMethod() {

}

/**
 * @desc - Adds an update button to the parent element
 *
 * @param {HTMLElement} parent
 * @param {callback fn()} updateUserSettings
 */
function addUpdateButton(parent, updateUserSettings) {
    $(parent).append(`<button type="button" class="btn btn-outline-primary btn-sm btn_update">Update</button>`)
    $(parent).append(`<div class="valid-feedback"><p class="mb-0 update_feedback>Updated!</p></div>`);

    // Update button event
    $(".btn_update").click(function (event) {
        event.preventDefault();

        const form = $(this).parents("form")[0];

        // Removes required attribute from input tags
        $(form).find("input").each(function () {
            this.required = false;
        })

        // Valid form --> update
        if (form.reportValidity()) {
            updateUserSettings();
        }
    })
}

function clearActive() {
    $(".active").removeClass("active");
}

function setActive(el) {
    el.classList.add("active");
}

function showSetting(setting) {
    $(".form_title").text(setting);
    const parentElement = $(".sidebar_info");

    switch (setting) {
        case "My Profile":
            showMyProfile(parentElement, user);
            addUpdateButton(parentElement.find(".card-body"), updateMyProfile);
            break;
        case "My Vehicles":
            showMyVehicles(parentElement, user.vehicles);
            addUpdateButton(parentElement, updateMyVehicles);
            break;
        case "My Payment Methods":
            showMyPaymentMethod(parentElement, user.paymentMethods[0]);
            break;
        case "My Reservations":
            // showMyReservations(parentElement, reservations);
            $(parentElement).text("Coming soon...");
            break;
        default:
            console.error("Error");
    }
}

// Event Listeners

$(document).ready(async function () {
    const response = await fetch("/user.json");

    if (response.ok) {
        user = await response.json();
    } else {
        console.error(`Errpr: ${response.status}`)
    }

    showSetting($(".active").find(".sidebar_text").text().trim());  // shows My Profile on page load
    $(".emailAddress").text(user.email);        // Show the user's email under My Account
});

$(".list-group-item").click(function (event) {
    event.preventDefault();
    clearActive();
    setActive(this);
    showSetting($(this).find(".sidebar_text").text().trim());
})

$(".signOut").click(function (event) {
    // TODO: un-authenticate user
})
