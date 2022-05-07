const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { database } = require('../database');
const collection = database.collection("graphs")

async function startPythonScript2(method) {

    try {
        const { stdout, stderr } = await exec('python scripts/graph2.py ' + '"' + method + '"');
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
    } catch (err) {
        console.log('err: ', err);
    }

    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var time = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).replace(/T/, ' ').replace(/\..+/, '');

    const type = "Line";

    const estimate = await collection.estimatedDocumentCount();

    var number = 0;

    for (var i = -1; i < estimate; i++) {
        number++;
    }

    await collection.insertOne({ number, type, time });

    return {
        status: 201,
        body: 'Created'
    }
}


module.exports = {
    startPythonScript2
};