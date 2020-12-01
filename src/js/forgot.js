$(document).ready(function(){
    $(".form_forgot").submit(function(event){
        event.preventDefault();
        const user = {
            email: $("#input_email").val(),
        };

        // Send POST request to backend
        $.ajax({
            type: "POST",
            url: "/forgot",
            data: JSON.stringify(user),
            success: function(data){
                alert(
                    `Success! Password reset link has been sent to ${data}.`,
                );
                window.location.href = "/";
            },
            error: function(data){
                if (data.status === 404) {
                    alert(
                        `${data.responseText} does not exist. Please try again.`,
                    );
                    window.location.href = "/forgot";
                }
            },
            dataType: "json",
            contentType: "application/json",
        });
    });
});
