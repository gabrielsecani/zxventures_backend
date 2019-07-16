'use strict';
var express = require('express');
var router = express.Router();
var pdvController = require('../controller/pdv-controller')

router.use(async (req, res, n) => {
    console.log('API v1', req.ips, req.ip, req.originalUrl, JSON.stringify({q: req.query, p: req.param }));
    await n();
})
/* GET all pdv listing. */
router.get('/populate', pdvController.populate);

/* GET all pdv listing. */
router.get('/all', pdvController.getAll);

/* GET pdv byId */
router.get('/:id', pdvController.getById);

/* POST new pdv */
router.post('/create', pdvController.create);

/* GET search pdv by longitude latitude . */
router.get('/search/:lng/:lat', pdvController.search);

module.exports = router;
