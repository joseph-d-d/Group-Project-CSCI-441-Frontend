// Example user

// Get user data
async function fetchUserData() {
    const response = await fetch("/user.json");
    const user = await response.json();
    return user;
}

function clearActive() {
    $(".active").removeClass("active");
}

function setActive(el) {
    el.classList.add("active");
}

function setForm() {
    const setting = $(".active").find(".sidebar_text").text().trim();
    $(".form_title").text(setting);
    $(".form_update").html(dashboard.displaySetting(setting));
}

class DashboardController {
    constructor(myProfile, myVehicles, myPaymentMethod) {
        this.myProfile = myProfile;
        this.myVehicles = myVehicles;
        this.myPaymentMethod = myPaymentMethod;
    }

    displaySetting(setting) {
        switch (setting) {
            case "My Profile":
                return this.myProfile.render();
                break;
            case "My Vehicles":
                return this.myVehicles.render();
                break;
            case "My Payment Method":
                return this.myPaymentMethod.render();
                break;
            case "My Reservations":
                return document.createElement('p').textContent = "Coming soon...";
                break;
            default:
                console.error(`Error: ${setting} is not an available setting.`);
        }
    }
};

let dashboard;

// Event Listeners

$(document).ready(async function () {
    const user = await fetchUserData();
    dashboard = new DashboardController(new MyProfile(user), new MyVehicles(user), new MyPaymentMethod(user));
    $(".emailAddress").text(user.profile.email);        // Show the user's email under My Account
    setForm();
});

$(".list-group-item").click(function (event) {
    event.preventDefault();
    clearActive();
    setActive(this);
    setForm();
})

$(".signOut").click(function (event) {
    // TODO: un-authenticate user
})
