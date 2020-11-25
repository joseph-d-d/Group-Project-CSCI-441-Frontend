"use strict";

$(document).ready(async function () {
  let user = {}; // example user

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
   * @desc Returns a synchronous function that is used to get the currently logged in user information
   * @return {Promise}
   */
  const getAuthenticatedUser = function () {
    return new Promise(function (resolve, reject) {
      $.ajax({
        method: "GET",
        crossDomain: true,
        dataType: "json",
        contentType: "application/json",
        url: "/users/loggedIn",
        async: true,
        success: function (data) {
          resolve(data);
        },
        error: function (result, status, error) {
          reject(result + " " + status + " " + error);
        },
      });
    });
  };

  /**
   * @desc Sends a PUT request to /dashboard, which updates the user in the db
   * @param {Object} user - User data
   */
  function updateUser(user) {
    // Send Ajax PUT request to server
    $.ajax({
      type: "PUT",
      url: "/dashboard",
      crossDomain: true,
      data: JSON.stringify(user),
      dataType: "json",
      contentType: "application/json",
      success: function (updatedUser) {
        user = updatedUser;

        // Display user account on sidebar
        $(".emailAddress").text(user.email); // Show the user's email under My Account

        // Display feedback to user that records have been updated
        $(".update_feedback").show();
        setTimeout(function () {
          $(".update_feedback").hide();
        }, 5000);
      },
      error: function (result, status, error) {
        if (result.status === 403) {
          alert("Email already in use. Please try a different email");
        } else {
          alert(result + " " + status + " " + error);
        }
      },
    });
  }

  /**
   * @desc Adds a "Update" button to the form and a hidden div for feedback; also includes the update button event listener
   *
   * @param {function} updateUserSettings - callback function that is triggered when update button is clicked
   */
  function addUpdateButton(updateUserSettings) {
    $("form").append(
      `<button type="button" class="btn btn-outline-primary btn-sm btn_update">Update</button>`
    );
    $("form").append(
      `<div class="valid-feedback update_feedback"><p class="mb-0">Updated!</p></div>`
    );

    // Update button event
    $(".btn_update").click(function (event) {
      event.preventDefault();

      const form = $(this).parents("form")[0];

      // Specific Case: Profile Section
      //      if there's input in any of the password input field, make all password input fields required
      //      otherwise, if all password input fields are empty, it should not be required
      if ($("#profileSection").length) {
        if (passwordIsEmpty()) {
          passwordNotRequired();
        } else {
          passwordRequired();
        }
      }

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
        const updatedUser = updateUserSettings();
        updateUser(updatedUser);
      }
    });
  }

  /**
   * @desc Load to the DOM the specific setting that user selected from the sidebar, and initialize event listeners/handlers
   *
   * @param {Object} user - User object containing the user's profile, vehicles, and payment method
   */
  function displaySetting(user) {
    $(".emailAddress").text(user.email); // Show the user's email under My Account
    const setting = $(".active").attr("data-sidebar");

    $(".form_title").text(setting);
    switch (setting) {
      case "My Profile":
        $("#form_update").load("./modals/MyProfile.html", function () {
          initMyProfile();
          showMyProfile(user);
          addUpdateButton(updateMyProfile(user));
        });
        break;
      case "My Vehicles":
        $("#form_update").load("./modals/MyVehicles.html", function () {
          initMyVehicles();
          showMyVehicles(user.vehicles);
          addUpdateButton(updateMyVehicles(user));
        });
        break;
      case "My Payment Method":
        $("#form_update").load("./modals/MyPaymentMethod.html", function () {
          initMyPaymentMethod();
          showMyPaymentMethod(user.paymentMethod);
          addUpdateButton(updateMyPaymentMethod(user));
        });
        break;
      case "My Reservations":
        $("#form_update").load("./modals/MyReservations.html", function () {
          getReservation(user.email);
          addDeleteButtonListener();
        });
        break;
      default:
        console.error(`Error: ${setting} is not an available setting.`);
    }
  }

  getAuthenticatedUser()
    .then(function (foundUser) {
      user = foundUser;
      displaySetting(user);
    })
    .catch(function (err) {
      window.location.href = "/login";
    });

  $(".list-group-item").click(function (event) {
    event.preventDefault();
    clearActive();
    setActive(this);
    displaySetting(user);
  });
});
