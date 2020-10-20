/**
 * @desc MyProfile component
 *
 * @class MyProfile
 * @param {Object} user - The authenticated user
 */
class MyProfile {
    constructor(user) {
        this.user = user;
    }

    updateProfile() {

    }

    renderUpdateButton() {
        if (this.user) {
            //     $(parent).append(`<button type="button" class="btn btn-outline-primary btn-sm btn_update">Update</button>`)
            //     $(parent).append(`<div class="valid-feedback"><p class="mb-0 update_feedback>Updated!</p></div>`)
            //     // Update button event
            //     $(".btn_update").click(function (event) {
            //         event.preventDefault();

            //         const form = $(this).parents("form")[0];

            //         // Removes required attribute from input tags
            //         $(form).find("input").each(function () {
            //             this.required = false;
            //         })

            //         // Valid form --> update
            //         if (form.reportValidity()) {
            //             updateUserSettings();
            //         }
            //     })}
        }
    }

    render() {
        const { email, firstName, lastName, password, phone } = this.user.profile || {};
        return `
            <div class="card mb-2 registrationSection" id="accountRegistration">
                <div class="card-body">
                    <!-- Email -->
                    <div class="form-group">
                        <label for="input_email">Email *</label>
                        <input type="email" autocomplete="on" class="form-control input_email" name="email" id="input_email"
                            placeholder="John.Smith@example.com" required
                            ${email ? `value=${email}` : ''}>
                    </div>

                    <!-- Password -->
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="input_password">Password *</label>
                            <input type="password" autocomplete="off" class="form-control input_password" name="password"
                                id="input_password" placeholder="Password" minlength="8" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="input_confirmPassword">Confirm Password *</label>
                            <input type="password" autocomplete="off" class="form-control input_confirmPassword"
                                name="confirmPassword" id="input_confirmPassword"
                                placeholder="Confirm Password" minlength="8" required>
                        </div>
                    </div>

                    <!-- Name -->
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="input_firstName">First Name</label>
                            <input type="text" class="form-control input_firstName" name="firstName"
                                id="input_firstName" placeholder="John"
                                ${firstName ? `value=${firstName}` : ''}>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="input_lastName">Last Name</label>
                            <input type="text" class="form-control input_lastName" name="lastName"
                                id="input_lastName" placeholder="Smith"
                                ${lastName ? `value=${lastName}` : ''}>
                        </div>
                    </div>

                    <!-- Contact -->
                    <div class="form-group">
                        <label for="input_phone">Phone Number</label>
                        <input type="tel" class="form-control input_phone" id="input_phone" name="phone"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890"
                            ${phone ? `value=${phone}` : ''}>
                    </div>
                </div>
            </div>
	    `
    }
}