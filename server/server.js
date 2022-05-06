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
const path = require('path');
const { startPythonScript } = require('./services/python.service');

const app = express()
app.use(bodyParser.json());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.send('Health check')
})

app.get('/graphs', function(req, res) {

    const graphData = [{
        ID: 1,
        name: "Graph 1",
        graphType: "Bar",
        creationDate: new Date(),
        userId: 45,
        graphId: "asdasd"
    }]

    res.send(graphData)
})

// ---------------------------------------------
// ---------------------------------------------

app.post('/register', async function(req, res) {

    const user = req.body
        //console.log('username: ', username);
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

app.post('/python', async function(req, res) {

    const city = req.body.city

    const result = await startPythonScript(city)

    res.send(result)
})








/*app.listen(8080, () => {
    console.log('Server listening on port 8080')
})*/

const PORT = 8080;
connectCallback(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})