const mongoose = require('../config/database');

const Schema = mongoose.Schema;

const pdvSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    tradingName: {
        type: String
    },
    ownerName: {
        type: String
    },
    document: {
        type: String,
        unique: true
    },
    coverageArea: {
        type: {
            type: String,
            enum: ['MultiPolygon'],
            required: true
        },
        coordinates: {
            type: [[[[Number]]]],
            required: true
        }
    },
    address: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        },
    }
});

//pdvSchema.virtual('id').get(function (value, virtual, doc) {
//    return this.pdvId;
//}).set(function (value, virtual, doc) {
//    this.pdvId = value;
//});

const Pdv = mongoose.model('Pdv', pdvSchema);

module.exports = { Pdv };
