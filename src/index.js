const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Sagar-functionup:radhaswami123@cluster0.7xlsi.mongodb.net/project?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

const { AppConfig } = require('aws-sdk');
app.use( multer().any())

app.use('/', route);

app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: `Not found ${req.url}`
        
    })
    next()
})
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
