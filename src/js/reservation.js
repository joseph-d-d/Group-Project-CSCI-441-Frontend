const reservation_button = document.querySelector("#reservationButton");
const chosen_store = document.querySelector("#storeSelector");
const date_and_time = document.querySelector("#reservationTime");
reservation_button.addEventListener("click", function (e) {
  e.preventDefault();
  $.get("http://localhost:3000/users/loggedIn", function (user) {
    data = {
      email: user.email,
      phoneNumber: user.phone,
      storeID: chosen_store.value,
      dateTime: date_and_time.value,
      amount: 0.00
    };
    $.post("http://localhost:3000/reservations", data);
    location.href = "./dashboard";
  });
});
