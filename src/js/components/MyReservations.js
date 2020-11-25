function getReservation(email) {
  const dateTime = $("#reservationTime");
  const spotNumber = $("#spotNumber");
  const pinNumber = $("#pin");

  $.get(
    "http://localhost:3000/reservations",
    { email: email },
    function (reservation, status) {
      if (reservation != null) {
        dateTime.text(
          "Reservation Time And Date: " + reservation.reservationDateAndTime
        );
        spotNumber.text("Parking Spot Number: " + reservation.spotID);
        pinNumber.text("Pin: " + reservation.pin);
      }
    }
  );
}

function addDeleteButtonListener() {
  $("#reservationContainer").append(
    '<button id="deleteReservationButton" class="btn btn-lg btn-outline-danger btn-block">Delete Reservation</button>'
  );
  $("#deleteReservationButton").click(function (e) {
    e.preventDefault();
    $.get("http://localhost:3000/users/loggedIn", function (user) {
      $.ajax({
        url: "http://localhost:3000/reservations?email=" + user.email,
        type: "DELETE",
      });
    });
    location.href = "./dashboard";
  });
}
