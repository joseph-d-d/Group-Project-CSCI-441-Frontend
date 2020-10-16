// Example user
const user = {
    _id: "507f191e810c19729de860ea",
    email: "Tony@example.com",
    firstName: "Tony",
    lastName: "Banh",
    password: "test1234",
    phone: "408-123-4567",
    paymentMethods: [{
        cardName: "John Smith",
        cardNumber: "123456789111111",
        expMM: "1",
        expYY: "21",
        cvv: "123"
    }],
    vehicles: [
        "TEST123",
        "123ABC"
    ]
}

$(".emailAddress").text(user.email);

function clearActive() {
    $(".active").removeClass("active");
}

function setActive(el) {
    el.classList.add("active");
}

function updateForm(setting) {
    $(".form_title").text(setting);
    const parentElement = $(".sidebar_info");

    switch (setting) {
        case "My Profile":
            showMyProfile(parentElement, user);
            $(parentElement).append(`<button type="button" class="btn btn-outline-primary btn-lg btn_update">Update</button>`)

            break;
        case "My Vehicles":
            showMyVehicles(parentElement, user.vehicles);
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

window.addEventListener("DOMContentLoaded", function () {
    updateForm($(".active").find(".sidebar_text").text().trim());
});

$(".list-group-item").click(function (event) {
    event.preventDefault();
    clearActive();
    setActive(this);
    updateForm($(this).find(".sidebar_text").text().trim());
})

$(".signOut").click(function (event) {
    // TODO: un-authenticate user
})
