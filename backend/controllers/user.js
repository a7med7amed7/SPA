const models = require('../models/user')
const bcrypt = require('bcryptjs')
const getAllUsers = (req, res, next) => {
    models.getAllUsers().then(result => {
        console.log(result);
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the list of users"
        });
    })
}

const getUser = (req, res, next) => {
    models.getUser(req.params.id).then(result => {
        console.log(result, result.length);
        if (!result.length) {
            return res.status(404).json({
                status: 0,
                message: "There no user with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the wanted user"
        });
    })
};

const createUser = async (req, res, next) => {
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const body = { username: req.body.username, email: req.body.email, password: hashedPassword };
    models.createUser(body).then(result => {
        console.log(result);
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: "Unable to create a new user"
        });
    })
};

const updateUser = async (req, res, next) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const body = { username: req.body.username, email: req.body.email, password: hashedPassword };
    console.log(req.params.id, body);
    models.updateUser(req.params.id, body).then(result => {
        console.log(result.affectedRows);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no user with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to update the wanted user"
        });
    })
}

const deleteUser = (req, res, next) => {
    models.deleteUser(req.params.id).then(result => {
        console.log(result, result.affectedRows);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no user with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the wanted user"
        });
    })
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}