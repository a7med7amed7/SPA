// payment.js
const { APIContracts, APIControllers, SDKConstants } = require('authorizenet');

function processPayment(cardNumber, expirationDate, cvv, amount, apiLoginId, transactionKey, billingAddress) {
    console.log("PAYMENT");
    console.log(cardNumber, expirationDate, cvv, amount, apiLoginId, transactionKey, billingAddress)
    const merchantAuthentication = new APIContracts.MerchantAuthenticationType();
    merchantAuthentication.setName(apiLoginId);
    merchantAuthentication.setTransactionKey(transactionKey);

    const billTo = new APIContracts.CustomerAddressType();
    billTo.setFirstName(billingAddress.firstName);
    billTo.setLastName(billingAddress.lastName);
    billTo.setAddress(billingAddress.address);
    billTo.setCity(billingAddress.city);
    billTo.setPhoneNumber(billingAddress.phone);
    billTo.setZip(billingAddress.zipCode);
    billTo.setCountry(billingAddress.country);
    billTo.setEmail(billingAddress.email);

    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(cardNumber);
    creditCard.setExpirationDate(expirationDate);
    creditCard.setCardCode(cvv);
    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const transactionRequest = new APIContracts.TransactionRequestType();
    transactionRequest.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequest.setPayment(paymentType);
    transactionRequest.setAmount(amount);
    transactionRequest.setBillTo(billTo);

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthentication);
    createRequest.setTransactionRequest(transactionRequest);

    const controller = new APIControllers.CreateTransactionController(createRequest.getJSON());

    //   if (environment === 'production') {
    //     controller.setEnvironment(SDKConstants.endpoint.production);
    //   }
    let data;
    controller.execute(() => {
        const response = controller.getResponse();
        const result = new APIContracts.CreateTransactionResponse(response);
        if (result.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
            data = {
                status: 1
            }
            console.log('Transaction ID:', result.getTransactionResponse().getTransId());
        } else {
            data = {
                status: 0
            }
            // console.error('Error:', result.getMessages().getMessage()[0].getText());
            console.error('Error:', result.getMessages().getMessage());
        }
    });
}
module.exports = processPayment;
// // Example usage
// processPayment('4111111111111111', '12/25', '123', 100.00);
