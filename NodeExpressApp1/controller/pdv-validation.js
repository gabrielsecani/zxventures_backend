const { param, check } = require('express-validator');

const createValitador = [
    check('tradingName').not().isEmpty().withMessage('Trading Name is required'),
    check('ownerName').not().isEmpty().withMessage('Owner Name is required'),
    check('document').not().isEmpty().withMessage('Document (CNPJ) is required'),
    check('coverageArea').not().isEmpty().withMessage('CoverageArea is required'),
    check('address').not().isEmpty().withMessage('Address is required'),
]

const searchValitador = [
    check('lng').isFloat().withMessage('Latitude must be a number'),
    check('lat').isFloat().withMessage('Longitude must be a number'),
]

const getByIdValitador = [
    param('id').exists().withMessage('Id must exists'),
    //param('id').isFloat().withMessage('Id must be a number'),
    //param('id').isFloat().withMessage('Id must be a number'),
    param('id').matches(/^[0-9a-fA-F]{24}$/).withMessage("Id format is invalid"),
]

module.exports = {
    createValitador,
    searchValitador,
    getByIdValitador,
}