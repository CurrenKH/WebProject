const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function startPythonScript() {

    try {
        const { stdout, stderr } = await exec('python ../scripts/graph1.py London');
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
    } catch (err) {
        console.log('err: ', err);
    }
}


module.exports = {
    startPythonScript
};