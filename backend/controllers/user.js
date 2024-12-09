const models = require('../models/user')
const bcrypt = require('bcryptjs')
const userValidator = require('../validators/index').user
const CustomErrors = require('../errorHandlers/index')
const getAllUsers = async (req, res, next) => {
    try {
        const users = await models.getAllUsers();
        return res.status(200).json({
            status: 1,
            data: users
        });
    } catch (err) {
        next(new CustomErrors.DatabaseError.GeneralDatabaseError.QueryError(err.errno, {
            query: err.sql,
            sqlMessage: err.sqlMessage
        }))
    }
    // models.getAllUsers().then(result => {
    //     console.log(result);
    //     return res.status(200).json({
    //         status: 1,
    //         data: result
    //     });
    // }).catch(err => {
    //     return res.status(500).json({
    //         status: 0,
    //         message: "Unable to get the list of users"
    //     });
    // })
}

const getUser = async (req, res, next) => {

    try {
        const val = await userValidator.getOneSchema.validateAsync({ id: req.params.id }, { abortEarly: false })
        const data = await models.getUser(req.params.id);
        console.log(data);
        if (data.length === 0) {
            return res.status(404).json({
                status: 1,
                message: "There's no user with the given id"
            })
        }
        return res.status(200).json({
            status: 1,
            data: data[0]
        });
    } catch (err) {
        if (err.isJoi) {
            return next(new CustomErrors.ValidationError.ValidationBaseError("There's a problem in the provided id", {
                src: "controllers/user/getUser"
            }))
        }
        next(new CustomErrors.DatabaseError.GeneralDatabaseError.QueryError(err.errno, {
            query: err.sql,
            sqlMessage: err.sqlMessage
        }))
    }
    // .then(result => {
    //     console.log(result, result.length);
    //     if (!result.length) {
    //         return res.status(404).json({
    //             status: 0,
    //             message: "There no user with the given id!"
    //         });
    //     }
    //     return res.status(200).json({
    //         status: 1,
    //         data: result
    //     });
    // }).catch(err => {
    //     return res.status(500).json({
    //         status: 0,
    //         message: "Unable to get the wanted user"
    //     });
    // })
};

const createUser = async (req, res, next) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isPremium: req.body.isPremium,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        address: req.body.address,
        cardNumber: req.body.cardNumber,
        expiryDate: req.body.expiryDate,
        cvv: req.body.cvv
    }
    try {
        const val = await userValidator.createSchema.validateAsync(user, { abortEarly: false });
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
        const data = await models.createUser(user);
        return res.status(200).json({
            status: 1,
            data: data
        });
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return next(new CustomErrors.ValidationError.ValidationBaseError("Unable to create new user", {
                src: "controllers/user/createUser"
            }))
        }
        next(new CustomErrors.DatabaseError.GeneralDatabaseError.QueryError(err.errno, {
            query: err.sql,
            sqlMessage: err.sqlMessage
        }))
    }
    // const body = { username: req.body.username, email: req.body.email, password: hashedPassword };
    // models.createUser(body).then(result => {
    //     console.log(result);
    //     return res.status(200).json({
    //         status: 1,
    //         data: result
    //     });
    // }).catch(err => {
    //     console.log(err);
    //     return res.status(500).json({
    //         status: 0,
    //         message: "Unable to create a new user"
    //     });
    // })
};

const updateUser = async (req, res, next) => {

    const user = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isPremium: req.body.isPremium,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
        address: req.body.address,
        cardNumber: req.body.cardNumber,
        expiryDate: req.body.expiryDate,
        cvv: req.body.cvv
    }
    try {
        const val = await userValidator.updateOneSchema.validateAsync(user, { abortEarly: false });
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
        const data = await models.updateUser(user);
        if (!data.affectedRows) {
            return res.status(404).json({
                status: 1,
                message: "There's no user with the given id"
            })
        }
        return res.status(200).json({
            status: 1,
            data: data
        });
    } catch (err) {
        console.log(err);
        if (err.isJoi) {
            return next(new CustomErrors.ValidationError.ValidationBaseError("Unable to create new user", {
                src: "controllers/user/createUser"
            }))
        }
        next(new CustomErrors.DatabaseError.GeneralDatabaseError.QueryError(err.errno, {
            query: err.sql,
            sqlMessage: err.sqlMessage
        }))
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const val = await userValidator.deleteOneSchema.validateAsync({ id: req.params.id }, { abortEarly: false })
        const data = await models.deleteUser(req.params.id);
        if (!data.affectedRows) {
            return res.status(404).json({
                status: 1,
                message: "There's no user with the given id"
            })
        }
        return res.status(200).json({
            status: 1,
            message: "The user is deleted successfully"

        });
    } catch (err) {
        console.log(err)
        if (err.isJoi) {
            return next(new CustomErrors.ValidationError.ValidationBaseError("There's a problem in the provided id", {
                src: "controllers/user/deleteUser"
            }))
        }
        next(new CustomErrors.DatabaseError.GeneralDatabaseError.QueryError(err.errno, {
            query: err.sql,
            sqlMessage: err.sqlMessage
        }))
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}