const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const Museum = require('./museum')

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



// All api and routes 
app.get('/api', (req, res) => {
    console.log("welcome")
    res.status(200).send({ message: "Welcome to Museum Visitors" })
})
app.get('/api/visitors', async (req, res) => {
    let reqQueryData = req.query;
    let response = await Museum.calculateVisitors(reqQueryData)
    res.status(200).send(response)
})



//Starting the node server
app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})