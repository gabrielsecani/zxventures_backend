const { validationResult } = require('express-validator');
const pdvDao = require('../model/pdv-dao');
const pdvValidation = require('./pdv-validation');

class PdvController {

    /**
     * Create PDV
     * post body :pdv model
     */
    async create(req, res) {

        if (!req.body) {
            return res.json({ errors: 'No body content' }).status(400).end();
        }

        const validations = pdvValidation.createValitador;
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() }).status(400).send().end();
        }

        //const pdvDao = new PdvDao();
        pdvDao.save(req.body)
            .then((pdvCreated) => {
                res.set('Location', req.route.path + '/' + pdvCreated.id);
                return res.status(201).json(pdvCreated).end();
            })
            .catch((error) => {
                if (error) {
                    if (error.code == "11000") {
                        return res.status(400).send("PDV is already in database.").end();
                    }
                    return res.status(500).end();
                }
            });
    }

    /**
     * * Search 
     * get params :lat :lng
     */
    async search(req, res) {

        const validations = pdvValidation.searchValitador;
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() }).status(400).send().end();
        }

        const lng = parseFloat(req.params.lng);
        const lat = parseFloat(req.params.lat);

        pdvDao.search(lng, lat)
            .then((pdv) => {
                return res.status(200).json(pdv).end();
            })
            .catch(error => {
                if (error.code == 2) {
                    return res.status(400).send(error.errmsg).end();
                }
                return res.status(500).end();
            });
    }



    /**
     * Get PDV byId
     * get params :id
     */
    async getAll(req, res) {

        pdvDao.findAll()
            .then((pdv) => {

                if (!pdv) {
                    return res.status(404).end();
                }

                return res.status(200).json(pdv).end();
            })
            .catch(erro => {
                return res.status(500).end();
            });
    }


    /**
     * Get PDV byId
     * get params :id
     */
    async getById(req, res) {

        const validations = pdvValidation.getByIdValitador;
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() }).status(400).send().end();
        }

        const id = req.params.id;

        //const pdvDao = new PdvDao();
        pdvDao.findById(id)
            .then((pdv) => {

                if (!pdv) {
                    return res.status(404).end();
                }

                return res.status(200).json(pdv).end();
            })
            .catch(erro => {
                return res.json(erro).status(400).end();
            });
    }

    /**
     * Route to populate PDVs from pdvs.json file (used for tests only)
     */
    populate(req, res) {
        const recreate = req.params.recreate;

        console.log('populate ', recreate);
        pdvDao.populate(recreate);
        console.log('populate done')

        return res.status(201).end();
    }

}

module.exports = new PdvController();