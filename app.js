
const express = require('express');
const ejs = require('ejs');

const xbee = require('xbee');

const app = express();
const port = 7113;
/*
const { SerialPort } = require('serialport');
const comPort1 = new SerialPort({
path: 'COM3',
baudRate: 9600,
});
*/
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
var leftSpeed = 0;
var rightSpeed = 0;


app.get("/", (req, res) => {
    res.render("../views/index.ejs");
});



app.get('/dir', (req, res)=> {
    var dir = req.query('dir');

    

});


app.listen(port, console.log('listening on port ' + port));