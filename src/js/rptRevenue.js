var payment_rate = 0.00;
$(document).ready(function() {

    /**
     * Authenticate that the session is still alive
     * @returns {Promise<unknown>}
     */
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
     * Retrieve the payment rate and assign it to payment_rate
     */
    get_payment_rate();


    $("#rpt_revenue_search_button").on("click",function() {
       let from_date = $("#rpt_date_from").val();
       let to_date = $("#rpt_date_to").val();

       if ( from_date.length > 0 && to_date.length > 0 ) {
           var data = { "from_date": from_date, "to_date": to_date };

           var ajax_call = $.ajax({
               method: 'GET',
               crossDomain: true,
               dataType: 'json',
               data: data,
               contentType: 'application/json',
               url: '/reservations',
               async: true,
               success: function(data) {
                   let total_amount = 0.00;
                   $.each(data, function(key,value) {
                       let arrival = new Date(value.arrival);
                       let departure = new Date(value.departure);
                       let difference_in_hours =  ((((departure.getTime() - arrival.getTime()) / 1000) / 60) / 60);
                       let amount = value.amount;
                       total_amount += parseInt(amount);
                       $("#report_results").append(
                           "<tr>" +
                               "<td>" + value.email + "</td>" +
                               "<td>" + formatFullDateFromJSDateObject(arrival) + "</td>" +
                               "<td>" + formatFullDateFromJSDateObject(departure) + "</td>" +
                               "<td>" + difference_in_hours + " hours</td>" +
                               "<td>$" + amount + "</td>" +
                           "</tr>"
                       );
                   });
                   $("#report_results").append(
                       "<tr>" +
                       "<td colspan='4' align='right' class='font-weight-bold'>Total:</td>" +
                       "<td align='center'>$" + (+total_amount).toFixed(2) + "</td>" +
                       "</tr>"
                   );
               },
               error: function(result, status, error) {
                   alert("Unable to retrieve payment rate. Please try again.");
               }
           });
       }
       else {
           alert("Invalid date selection. Please correct and try again.");
       }
    });


    /**
     * Retrieves the current parking rate
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
                payment_rate = data.payment_rate_per_hour;
            },
            error: function(result, status, error) {
                alert("Unable to retrieve payment rate. Please try again.");
            }
        });
    }

    function formatFullDateFromJSDateObject(date) {
        return date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }
});
