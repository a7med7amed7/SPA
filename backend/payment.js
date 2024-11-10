const { APIContracts, APIControllers } = require('authorizenet');

function payment(cardNumber, expirationDate, cvv, amount, apiLoginId, transactionKey, billingAddress) {
    return new Promise((resolve, reject) => {
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

        controller.execute(() => {
            const response = controller.getResponse();
            const result = new APIContracts.CreateTransactionResponse(response);

            if (result.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
                console.log('Transaction ID:', result.getTransactionResponse().getTransId());
                resolve(true); // Resolve with success
            } else {
                console.error('Payment Error:', result.getMessages().getMessage());
                resolve(false); // Resolve with failure
            }
        });
    });
}

module.exports = payment;
