const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const formidable = require('formidable');
const path = require('path');
const http = require('http');
const simpleId = require('simple-id');
const B2 = require('easy-backblaze');

const app = express();
const port = Number(process.env.PORT || 3000);
const b2 = new B2('account_id', 'application_key', {bucket: 'bucket_name'});

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.render('index');
})

app.post('/upload', (req,res) => {

    b2.uploadFile(`./uploads/${req.body.fileUploaded}`,{
        name: simpleId() + req.body.fileUploaded
    },function(err, res) {
        console.log('Done!', err, res);
    });

})

app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});