require('dotenv').config()
const express = require('express')
const cors = require('cors');
const { connectCallback } = require('./database');
//const upload = multer({ dest: 'uploads/' })
//const auth = require('./middlewares/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
//const { database } = require('./database');
const { createUser, signIn } = require('./services/user.service');
const { getAllGraphs, deleteGraph } = require('./services/graph.service');
const path = require('path');
const { startPythonScript1 } = require('./services/python1.service');
const { startPythonScript2 } = require('./services/python2.service');
const { startPythonScript3 } = require('./services/python3.service');
const { startPythonScript4 } = require('./services/python4.service');

const app = express()
app.use(bodyParser.json());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.send('Health check')
})

app.get('/graphs', async function(req, res) {

    const graphData = await getAllGraphs()

    res.send(graphData)
})

// ---------------------------------------------
// ---------------------------------------------

app.post('/register', async function(req, res) {

    const user = req.body
    if (!user.username || !user.password) {
        res.status(400)
        res.send('Missing username or password')

        return
    }

    const result = await createUser(user);

    res.status(result.status);
    res.send(result.body);
})

app.post('/login', async function(req, res) {

    const user = req.body

    if (!user.username || !user.password) {
        res.status(400)
        res.send('Missing username or password')

        return
    }

    const result = await signIn(user)

    res.send(result.body)
})

app.delete('/delete', async function (req, res){

    const number = req.body.number
    await deleteGraph(number)

    if (!number) {
        res.status(400)
        res.send('Graph not found')

        return
    }

    res.send('Deleted')
})

app.post('/python1', async function(req, res) {

    const city = req.body.city

    const result = await startPythonScript1(city)

    res.send(result)
})

app.post('/python2', async function(req, res) {

    const method = req.body.method

    const result = await startPythonScript2(method)

    res.send(result)
})

app.post('/python3', async function(req, res) {

    const city = req.body.city

    const result = await startPythonScript3(city)

    res.send(result)
})

app.post('/python4', async function(req, res) {

    const usage = req.body.usage

    const result = await startPythonScript4(usage)

    res.send(result)
})



const PORT = 8080;
connectCallback(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})