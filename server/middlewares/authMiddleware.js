const Boom = require('boom');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Moment = require('moment');

const jwtSecretToken = 'super_strong_key';

const validateToken = (req,res, next) => {
    const { authorization} = req.headers;

    try {
        if (_.isEmpty(authorization)) {
            throw Boom.unauthorized();
        }
        const token = authorization.split(' ')[1];
        const verifiedEmployee = jwt.verify(token, jwtSecretToken);
        if (_.isEmpty(verifiedEmployee || !_.has(verifiedEmployee, 'exp'))) {
            throw Boom.unauthorized();
        }

        const isTokenExpired = verifiedEmployee.exp < Moment().unix();
        if (isTokenExpired) {
            throw Boom.unauthorized();
        }
        req.body.employeeToken = verifiedEmployee;
        return next();
    } catch (error) {
        return res.send(error)
    }
}

module.exports = {
    validateToken
}