const models = require('../models/order')
const payment = require('../payment')
const sendEmail = require('../sendEmail');
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
    // Assert the req.body is ok
    const billingAddress = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        country: req.body.country,
        address: req.body.address,
        zipCode: req.body.zipCode,
        phone: req.body.phone,
        email: req.body.email,
        // Add the price
    }
    payment('4111111111111111', req.body.expiryDate, req.body.CVV, 100.00, apiLoginId, transactionKey, billingAddress);
    sendEmail("Order", billingAddress)
    models.createOrder(req.body).then(result => {
        console.log(result);
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: "Unable to create a new order"
        });
    })
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