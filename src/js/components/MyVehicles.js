class MyVehicles {
    constructor(user) {
        this.user = user;
    }

    updateVehicles() {

    }

    populateVehiclesList() {
        return this.user.vehicles.map(function (vehicle) {
            // Create the list item (li)
            const list_vehicles_item = document.createElement("li");
            list_vehicles_item.classList.add("list-group-item", "d-flex", "flex-row", "justify-content-between", "align-items-center", "list_vehicles_item");

            // Create the span text to display license plate number
            const item_span = document.createElement("span");
            item_span.textContent = sanitizeHTML(vehicle);

            // Create the a tag for the delete button
            const btn_deleteVehicle = document.createElement('a');
            btn_deleteVehicle.href = "#";
            btn_deleteVehicle.setAttribute("role", "button");
            btn_deleteVehicle.classList.add("btn", "btn-outline-danger", "btn-sm", "btn_deleteVehicle");
            btn_deleteVehicle.textContent = "Delete";

            // Append span and a tag to li
            list_vehicles_item.append(item_span, btn_deleteVehicle);

            return list_vehicles_item.outerHTML;
        }).join('');
    }

    renderUpdateButton() {

    }

    render() {
        return `
        <div class="card mb-2 registrationSection" id="vehicleRegistration">
          <div>
            <div class="card-body row">

              <!-- License Plate # Input -->
              <div class="col-sm my-2">
                <div class="form-group">
                  <input type="text" class="form-control input_licensePlate" name="licensePlate"
                    id="input_licensePlate" pattern="[a-zA-Z0-9]{1,7}" placeholder="Enter License Plate">
                  <div class="invalid-feedback invalidLicensePlate">
                    License Plate already exists.
                  </div>
                </div>

                <div>
                  <a href="" class="btn btn-outline-primary btn-block btn-sm btn_addVehicle"
                    role="button">Add
                    Vehicle</a>
                </div>
              </div>

              <!-- License Plates List -->
              <div class="col-sm my-2">
                <ul class="list-group list_vehicles">
                ${this.user.vehicles.length > 0 ? this.populateVehiclesList() : ''}
				</ul >
              </div >
            </div >
          </div >
        </div >
        `
    }
}