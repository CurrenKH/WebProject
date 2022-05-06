const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { database } = require('../database');
const collection = database.collection("graphs")

async function startPythonScript(city) {

    try {
        const { stdout, stderr } = await exec('python scripts/graph1.py ' + '"' + city + '"');
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
    } catch (err) {
        console.log('err: ', err);
    }

    const location = city;
    const time = new Date()
    
    await collection.insertOne({ location, time });

    return {
        status: 201,
        body: 'Created'
    }
}


module.exports = {
    startPythonScript
};