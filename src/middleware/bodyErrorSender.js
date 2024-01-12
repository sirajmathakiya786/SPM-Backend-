const { validationResult } = require('express-validator');

const formatValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorDetails = errors.array().map(error => ({
            field: error.param,
            message: error.msg
        }));

        const errorMessage = {
            status: false,
            message: 'Validation error',
            errors: errorDetails,
        };

        return res.status(422).json(errorMessage);
    }

    next();
};

module.exports = formatValidationErrors;
