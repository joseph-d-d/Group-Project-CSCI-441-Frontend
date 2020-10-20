class MyPaymentMethod {
    constructor(user) {
        this.user = user;
    }

    updatePaymentMethod() {

    }

    showCardNumber() {
        return this.user.paymentMethod.cardNumber;
    }

    render() {
        const { cardName, cardNumber, expMM, expYY, cvv } = this.user.paymentMethod || {};
        return `
        <div class="card mb-2 registrationSection" id="paymentRegistration">
          <div>
            <div class="card-body">

              <!-- Payment Information Input -->
              <div class="my-2">
                <!-- Card Holder's Name -->
                <div class="form-group">
                  <label for="input_cardName">
                    <h6>Card Holder's Name</h6>
                  </label>
                  <input type="text" id="input_cardName" name="cardName" placeholder="John Smith" class="form-control input_cardName" ${cardName ? `value="${cardName}"` : ''}>
                </div>

                <!-- Card Number -->
                <div class="form-group">
                  <label for="input_cardNumber">
                    <h6>Card Number</h6>
                  </label>
                  <input type="text" id="input_cardNumber" name="cardNumber" placeholder="Valid card number"
                    pattern="(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}" class="form-control input_cardNumber"
                    ${cardNumber ? `value="${cardNumber}"` : ''}
                    >
                </div>

                <!-- Exp and CVV -->
                <div class="row">
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label>
                        <h6>Expiration Date</h6>
                      </label>
                      <div class="input-group">
                        <label for="input_expMM"></label>
                        <input type="number" id="input_expMM" placeholder="MM" name="expMM" class="form-control input_expMM" min="1" max="12" step="1" ${expMM ? `value=${expMM}` : ''}>
                        <label for="input_expYY"></label>
                        <input type="number" id="input_expYY" placeholder="YY" name="expYY" class="form-control input_expYY" max="99" step="1" ${expYY ? `value=${expYY}` : ''}>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group mb-4">
                      <label for="input_cvv">
                        <h6>CVV</h6>
                      </label>
                      <input type="text" id="input_cvv" placeholder="123" name="cvv" class="form-control input_cvv"
                        pattern="^\d{3,4}$" ${cvv ? `value=${cvv}` : ''}>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-around">
                  <a href="javascript:void" class="btn btn-outline-primary btn-sm my-1 btn_savePayment"
                    role="button">Save Payment</a>

                  <a href="javascript:void" class="btn btn-outline-danger btn-sm my-1 btn_deletePayment"
                    role="button">Delete Payment</a>
                </div>
              </div>
              <div class="valid-feedback paymentInfoFeedback">
                <p class="mb-0">Saved!</p>
              </div>
            </div>
          </div>
        </div>
        `
    }
}