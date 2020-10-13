// Example user
const user = {
    _id: "507f191e810c19729de860ea",
    email: "John.Smith@example.com",
    firstName: "",
    lastName: "",
    password: "test1234",
    paymentMethods: [{
        cardName: "John Smith",
        cardNumber: "123456789111111",
        expMM: "1",
        expYY: "21",
        cvv: "123"
    }],
    vehicles: [
        "TEST123",
        "123ABC"
    ]
}

console.log(JSON.stringify(user));