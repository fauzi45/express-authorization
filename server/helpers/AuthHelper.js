const Boom = require('boom');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const db = require('../../models');

const jwtSecretToken = 'super_strong_key';
const jwtExpiresIn = '24h';
const salt = bcrypt.genSaltSync(10);

const __hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const __comparePassword = (payloadPass, dbPass) => {
    return jwt.sign(data, jwtSecretToken, {expiresIn: jwtExpiresIn});
}

const registerEmployee = async (dataObject) => {
    const { name, email, password, position, departmentId} = dataObject;

    try {
        const employee = await db.employees.findOne({
            where: {email}
        });
        if (!_.isEmpty(employee)) {
            return Promise.reject(Boom.badRequest('EMAIL HAS BEEN USED, PLEASE TRY ANOTHER EMAIL'));
        }

        const hashedPass = __hashPassword(password);
        await db.employees.create({
            name, email, password: hashedPass, position, departmentId
        });

        return Promise.resolve(true);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports= {
    registerEmployee
}