const express = require('express');
const app = express();
const pdfMaker = require('./pdfMaker');
const pdfMerger = require('./pdfMerger');

app.get('', (req, res, next) => {
    pdfMaker.pdf();
    res.send('Completed');
});

app.get('/merge', (req, res, next) => {
    pdfMerger.pdf();
    res.send('Completed');
});

app.listen(8080);
console.log("Server Started at port 8080!");
