$(document).ready(function(){
    // Init reset form
    initMyProfile();

    $(".form_reset").attr("action", window.location.pathname);

    $(".form_reset").submit(function(event){
        event.preventDefault();
        const user = {
            password: $("#input_password").val(),
        };

        // Send POST request to backend
        $.ajax({
            type: "POST",
            url: `${window.location.pathname}`,
            data: JSON.stringify(user),
            success: function(data){
                alert(`Success! Password for ${data} has been reset!`);
                window.location.href = "/login";
            },
            error: function(data){
                if (data.status === 408 || data.status === 404) {
                    alert(`Password reset has expired. Please try again.`);
                    window.location.href = "/forgot";
                }
            },
            dataType: "json",
            contentType: "application/json",
        });
    });
});
