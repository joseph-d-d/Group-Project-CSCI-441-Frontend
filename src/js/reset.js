$(document).ready(function(){
    // Init reset form
    initMyProfile();

    $(".form_reset").attr("action", window.location.pathname);

    $(".form_reset").submit(function(event){
        // event.preventDefault();
        // Send POST request to backend
        // $.ajax({
        //     type: "POST",
        //     url: `${window.location.pathname}`,
        //     data: JSON.stringify(user),
        //     success: function(data){
        //         alert(
        //             `Success! Password for ${data} has been reset! Please check your email.`,
        //         );
        //         window.location.href = "/";
        //     },
        //     error: function(data){
        //         if (data.status === 404) {
        //             alert(
        //                 `${data.responseText} does not exist. Please try again.`,
        //             );
        //             window.location.href = "/forgot";
        //         }
        //     },
        //     dataType: "json",
        //     contentType: "application/json",
        // });
    });
});
