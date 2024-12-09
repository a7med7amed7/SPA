const models = require('../models/order')
const orderSchema = require('../validators/index').order
const payment = require('../payment')
const sendEmail = require('../sendEmail');
const { isEmpty, isValidCardNumber, isValidExpiryDate, isValidCVV } = require('../validators/payment');
const apiLoginId = process.env.PAYMENT_LOGIN_KEY;
const transactionKey = process.env.PAYMENT_TRANSACTION_KEY;

const getAllOrders = (req, res, next) => {
    models.getAllOrders().then(result => {
        console.log(result);
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: "Unable to get the list of orders"
        });
    })
};
const getOrder = (req, res, next) => {
    models.getOrder(req.params.id).then(result => {
        console.log(result, result.length);
        if (!result.length) {
            return res.status(404).json({
                status: 0,
                message: "There no order with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the wanted order"
        });
    })
};
const createOrder = async (req, res, next) => {
    const orderData = {
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        zipCode: req.body.zipCode,
        phone: req.body.phone,
        email: req.body.email,
        products: req.body.products
    }
    try {
        const val = await orderSchema.createOrderSchema.validateAsync(orderData, { abortEarly: false });
        const result = await models.createOrder(orderData);
        orderData.products = result.totalPriceInfo;
        orderData.country = result.country[0]['name']
        console.log(orderData)
        let price = 0;
        for (let i = 0; i < orderData.products.length; i++)price += orderData.products[i].cost;
        console.log(result.userPrivateInfo[0]['card_number'], result.userPrivateInfo[0]['expiry_date'], result.userPrivateInfo[0]['cvv'])
        let isSuccess = await payment(result.userPrivateInfo[0]['card_number'].toString(), result.userPrivateInfo[0]['expiry_date'], result.userPrivateInfo[0]['cvv'].toString(), price, apiLoginId, transactionKey, orderData);
        console.log(isSuccess);
        if (isSuccess)
            await sendEmail("Order", orderData, result.totalPriceInfo[0]['total_price'], req.body.products, req.body.email, req.body.firstName)

        return res.status(200).json({
            status: 0,
            data: result
        });
    } catch (err) {
        console.log(err)
        next(err);
    }
    // // Assert the req.body is ok
    // let price = 0;
    // for (let i = 0; i < req.body.products.length; i++)price += req.body.products[i].price * req.body.products[i].quantity;
    // const billingAddress = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     city: req.body.city,
    //     country: req.body.country,
    //     address: req.body.address,
    //     zipCode: req.body.zipCode,
    //     phone: req.body.phone,
    //     email: req.body.email,
    // }
    // if (
    //     isEmpty(req.body.firstName) ||
    //     isEmpty(req.body.lastName) ||
    //     isEmpty(req.body.city) ||
    //     isEmpty(req.body.country) ||
    //     isEmpty(req.body.address) ||
    //     isEmpty(req.body.zipCode) ||
    //     isEmpty(req.body.phone) ||
    //     isEmpty(req.body.email) ||
    //     isEmpty(req.body.cardNumber) ||
    //     isEmpty(req.body.expiryDate) ||
    //     isEmpty(req.body.CVV)
    // ) {
    //     return res.status(200).json({
    //         status: 0,
    //         message: "Some fields are empty."
    //     });
    // }
    // if (!isValidCardNumber(req.body.cardNumber)) {
    //     return res.status(200).json({
    //         status: 0,
    //         message: "Invalid Card Number"
    //     });
    // }
    // if (isValidExpiryDate(req.body.expiryDate) === 1) {
    //     return res.status(200).json({
    //         status: 0,
    //         message: "Invalid Expiry date format, should be MM/YY"
    //     });
    // }
    // if (isValidExpiryDate(req.body.expiryDate) === 2) {
    //     return res.status(200).json({
    //         status: 0,
    //         message: "Invalid Expiry date format, should be a future date"
    //     });
    // }
    // if (!isValidCVV(req.body.CVV)) {
    //     return res.status(200).json({
    //         status: 0,
    //         message: "Invalid CVV, should be a 3 or 4 digits number"
    //     });
    // }
    // console.log(price);
    // console.log(req.body)
    // let isSuccess = await payment(req.body.cardNumber, req.body.expiryDate, req.body.CVV, price, apiLoginId, transactionKey, billingAddress);
    // console.log(isSuccess);
    // if (!isSuccess) {
    //     return res.status(200).json({
    //         status: 0,
    //         message: "Something went wrong during the payment process!"
    //     });
    // }
    // await sendEmail("Order", billingAddress, price, req.body.products, req.body.email, req.body.firstName)
    // await models.createOrder(req.body).then(result => {
    //     console.log(result);
    //     return res.status(200).json({
    //         status: 1,
    //         data: result
    //     });
    // }).catch(err => {
    //     console.log(err);
    //     return res.status(500).json({
    //         status: 0,
    //         message: "Unable to create a new order"
    //     });
    // })
};
const updateOrder = (req, res, next) => {
    models.updateOrderBillingAddress(req.params.id, req.body).then(result => {
        console.log(result.affectedRows);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no order with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to update the wanted order"
        });
    })
};
const deleteOrder = (req, res, next) => {
    console.log("DELETE", req.params.id)
    models.deleteOrder(req.params.id).then(result => {
        console.log(result, result.affectedRows);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no order with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to delete the wanted order"
        });
    })
};

module.exports = {
    getAllOrders, getOrder, createOrder, deleteOrder, updateOrder
}