require('dotenv').config();
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { database } = require('../database');

const collection = database.collection("graphs")


    async function getAllGraphs() {

        const allGraphs = await collection.find().limit(500).toArray()
        return allGraphs;
    }


    module.exports = {
        getAllGraphs
    }