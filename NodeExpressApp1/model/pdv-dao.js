const db = require('./pdv-model');

class PdvDao {

    /**
     * Create New PDV on the database
     * @param {pdv} pdv 
     */
    save(pdv) {
        return new Promise((resolve, reject) => {

            db.Pdv.create(pdv, (error, pdv) => {

                if (error) { return reject(error) }

                return resolve(pdv);
            });
        });
    }

    /**
     * Return one PDV by provided ID
     * @param {id} id 
     */
    findById(id) {
        return new Promise((resolve, reject) => {
            db.Pdv.findOne({ id: id }, (error, pdv) => {
                if (error) {
                    console.error(error);
                    return reject(error)
                }

                return resolve(pdv);
            });
        });
    }

    /**
     * Return all pdvs
     */
    findAll() {
        return new Promise((resolve, reject) => {

            db.Pdv.find((error, pdv) => {

                if (error) { return reject(error) }

                return resolve(pdv);
            });
        });
    }


    /**
     * Search at database for the nearest PDV from location provided (lng, lat)
     * @param {longitude} lng 
     * @param {latitude} lat 
     */
    search(lng, lat) {
        return new Promise((resolve, reject) => {
            let userLocation = {
                type: 'Point',
                coordinates: [lng, lat]
            };

            /**
             * First aggregate looks for a maximum of 50 PDVs that also is a max of 50km of distance from the location provided
             * The second aggregate check if PDVs is in a coverage area from the location
             * At last, get the nearest and hide coverageArea.
             */
            db.Pdv.aggregate(
                [
                    {
                        '$geoNear': {
                            near: userLocation,
                            // 50 km
                            maxDistance: 50000,
                            distanceField: 'dist.calculated',
                            limit: 1,
                            spherical: true
                        }
                    },
                    {
                        '$sort': { 'dist.calculated': 1 }
                    }
                ]
            ).exec(function (error, pdvs) {
                if (error) {
                    return reject(error)
                }

                return resolve(pdvs);
            });

        });
    }


    /**
     * Populate PDVS
     */
    async populate(recreate) {
        console.info('Pdv Check Populating');
        if (recreate) {
            await db.Pdv.deleteMany();
        }
        db.Pdv.estimatedDocumentCount((err, count) => {
            if (err) {
                console.error('Populate count error!', err);
                return err;
            } else {
                console.info('Pdv Population: ', count);
                if (count <= 1) {
                    console.debug('Populating PDVs: reading base file');
                    const jsonFile = require('./pdvs.json');
                    const pdvs = jsonFile.pdvs;
                    /*.map(v => {
                        v.pdvId = v.id;
                        //delete v.id;
                        return v;
                    });*/
                    console.debug('Populating PDVs: inserting', pdvs);
                    return db.Pdv.insertMany(pdvs, (e, d) => { console.info('pdvDAO.populated', e, d); });
                }
            }
        });
    }
}

var pdvDao = new PdvDao();
Promise.all([pdvDao.populate()]);

module.exports = pdvDao;
