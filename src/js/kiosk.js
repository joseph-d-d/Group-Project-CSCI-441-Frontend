const enter_button = document.querySelector("#enterButton");
const confirmation = $("#confirmation");
const pin = document.querySelector("#pinInput");
enter_button.addEventListener("click", function (e) {
  e.preventDefault();
  $.get("http://localhost:3000/users/loggedIn", function () {
    data = {
      pin: pin.value,
    };
    $.post("http://localhost:3000/kiosks", data, function (reservation) {
      confirmation.text("Proceed to spot number: " + reservation.spotID);
      pin.value = "";
    });
  });
});
