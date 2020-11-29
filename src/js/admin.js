let parkingSpaces = [];
$(document).ready(function() {

   const getAuthenticatedUser = function () {
      return new Promise(function (resolve, reject) {
         $.ajax({
            method: "GET",
            crossDomain: true,
            dataType: "json",
            contentType: "application/json",
            url: "/users/loggedIn",
            async: false,
            success: function (data) {
               resolve(data);
            },
            error: function (result, status, error) {
               reject(result + " " + status + " " + error);
            },
         });
      });
   };

   getAuthenticatedUser()
       .then(function (foundUser) {
          //Nothing needs to happen here. Redirect occurs if not authenticated.
       })
       .catch(function (err) {
          window.location.href = "./dashboard.html";
       });

   /**
    * Populate modal values
    */
   populate_users();
   get_parking_spaces();
   get_payment_rate();

   /**
    * Load required modals
    */
   $("#selectUserModal").load("modals/admin/modal_select_user.html");
   $("#selectSpaceModal").load("modals/admin/modal_select_space.html");
   $("#adjustPaymentRateModal").load("modals/admin/modal_adjust_payment_rate.html");

   /**
    * Set jQuery listeners for modal triggers
    */

   $("#selectUserProfileIcon").on("click", function() {
      $("#select_user_modal").modal();
   });

   $("#selectParkingSpaceIcon").on("click", function() {
      $("#select_space_modal").modal();
   });

   $("#adjustPaymentRateIcon").on("click", function() {
      $("#adjust_payment_rate").modal();
   });

   /**
    * Add event listener for dynamically generated elements
    */

   $("body").on("click", "button.userButton", function() {
      window.location ="./dashboard.html?uval=" + $('#selectUserModalDropdown').val();
   });

   $("body").on("click", "button.spaceButton", function() {
      $(".statusButton").show();
      $("#selectSpaceStatus").show();
   });

   $("body").on("click", "button.statusButton", function() {
      let space = $("#selectSpaceFromDropdown").val();
      let status = $("#selectSpaceStatus").val();
      let verified = false;

      if ( space && status && typeof status != "undefined" ) {
         $.each(parkingSpaces.parkingSpots, function(key, value) {
            $.each(value, function(key2, value2) {
               if ( value2[0] == space ) {
                  if ( value2[1] != status ) {
                     parkingSpaces.parkingSpots[key][key2][1] = status;
                     verified = true;
                  }
               }
            });
         });

         if ( !verified ) alert("Status did not change");
         else {
            update_parking_spaces();
         }
      }
      else alert("Error retrieving parking space information. Please try refreshing the screen.");

   });

   $("body").on("click", "button.adjustButton", function() {
      adjust_payment_rate();
   });

   /**
    *
    * @param id
    */

   function verify_user(id) {
      var ajax_call = $.ajax({
         method: 'GET',
         crossDomain: true,
         dataType: 'json',
         contentType: 'application/json',
         url: '/users/' + id,
         async: true,
         success: function(data) {
            alert(111);
         },
         error: function(result, status, error) {
            alert(result + " " + status + " " + error);
         }
      });
   }

   /**
    * Retrieves all users
    */

   function populate_users() {
      var ajax_call = $.ajax({
         method: 'GET',
         crossDomain: true,
         dataType: 'json',
         contentType: 'application/json',
         url: '/users',
         async: true,
         success: function(data) {
            $.each(data, function(key, value) {
               $("#selectUserModalDropdown")
                   .append("<option value='" + value._id + "'>" + value.firstName + " " + value.lastName + "</option>")
            });
         },
         error: function(result, status, error) {
            alert(result + " " + status + " " + error);
         }
      });
   }

   /**
    * Retrieves the parking space object and appends individual spaces to the drop down list.
    * Also assigns the parkingSpace global to the original parking space object.
    */
   function get_parking_spaces() {
      var ajax_call = $.ajax({
         method: 'GET',
         crossDomain: true,
         dataType: 'json',
         contentType: 'application/json',
         url: '/parkingLot',
         async: true,
         success: function(data) {
            parkingSpaces = data;
            $.each(data.parkingSpots, function(key,value) {
               $.each(value, function(key2, value2) {
                  if ( value2[1] != "store" ) {
                     $("#selectSpaceFromDropdown")
                         .append("<option value='" + value2[0] + "'>" +
                         "Space: " + value2[0] + " - Status: " + value2[1] +
                         "</option>");
                  }
               });
            });
         },
         error: function(result, status, error) {
            alert("Unable to retrieve payment rate. Please try again.");
         }
      });
   }

   /**
    * Updates the parking lot object as a whole
    */
   function update_parking_spaces() {

      var ajax_call = $.ajax({
         method: 'PATCH',
         datatype: "json",
         url: '/parkingLot',
         data: JSON.stringify(parkingSpaces),
         contentType: 'application/json',
         crossDomain: true,
         async: true,
         success: function(data) {
            alert("Successfully updated!");
            $("#selectSpaceFromDropdown").html("<option selected>Select a Parking Space</option>");
            get_parking_spaces();
            $("#selectSpaceStatus").val("");
            $(".statusButton").hide();
            $("#selectSpaceStatus").hide();
         },
         error: function(result, status, error) {
            alert("Unable to update parking space. Please contact a system administrator.");
         }
      });
   }

   /**
    * Retrieves the current payment rate
    */
   function get_payment_rate() {
      var ajax_call = $.ajax({
         method: 'GET',
         crossDomain: true,
         dataType: 'json',
         contentType: 'application/json',
         url: '/payrate',
         async: true,
         success: function(data) {
            $("#paymentRate").val(data.payment_rate_per_hour);
            $("#paymentRate").data("id", data._id);
         },
         error: function(result, status, error) {
            alert("Unable to retrieve payment rate. Please try again.");
         }
      });
   }

   /**
    * Updates the payment rate
    */
   function adjust_payment_rate() {
      let amount = $("#paymentRate").val();
      let id = $("#paymentRate").data("id");

      if (!amount || !id) {
         alert("Unable to retrieve payment rate id or amount");
         return;
      }

      var data = { "payment_rate_per_hour": amount };

      var ajax_call = $.ajax({
         method: 'PATCH',
         datatype: "json",
         url: '/payrate/' + id,
         data: JSON.stringify(data),
         contentType: 'application/json',
         crossDomain: true,
         async: false,
         success: function(data) {
            alert("Successfully updated!");
            get_payment_rate();
         },
         error: function(result, status, error) {
            alert("Unable to retrieve payment rate. Please try again.");
         }
      });
   }

});
