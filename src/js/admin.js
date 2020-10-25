$(document).ready(function () {
   /*
    * Load required modal
    */
   $("#selectUserModal").load("modals/admin/modal_select_user.html");
   $("#selectSpaceModal").load("modals/admin/modal_select_space.html");

   /*
    * Set jQuery listeners for modal triggers
    */

   $("#selectUserProfile").on("click", function() {
      $("#select_user_modal").modal();
   });

   $("#selectParkingSpace").on("click", function() {
      $("#select_space_modal").modal();
   });

});