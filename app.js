
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const xbee = require('xbee');
const { SerialPort } = require('serialport');

const app = express();
const port = 7113;

const { SerialPort } = require('serialport');
const comPort1 = new SerialPort({
path: 'COM3',
baudRate: 9600,

dataBits: 8,
stopBits: 1,
parity: 'none', 
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var leftSpeed = 0.5;
var rightSpeed = 0.5;
var gndspeed = 0;

app.get("/", (req, res) => {
    res.render("../views/index.ejs");
});



app.get('/dir', (req, res)=> {
    var dir = req.query.dir;

    if(dir == "f") {
        gndspeed = gndspeed + 10;
    } else if(dir == "b") {
        gndspeed = gndspeed - 10;
    } else if(dir == "r") {
        leftSpeed = leftSpeed+ 0.1;
        rightSpeed = rightSpeed- 0.1;
    } else if(dir = "l") {
            rightSpeed = rightSpeed+ 0.1;
            leftSpeed = leftSpeed-0.1;
        
    }
    var tleftspd = gndspeed * leftSpeed;
    var trightspd = gndspeed * rightSpeed;

    console.log(trightspd);
    res.send({spdleft: tleftspd, spdright: trightspd});
    
    SerialPort.write(tleftspd);
    SerialPort.write(trightspd);
});


app.listen(port, console.log('listening on port ' + port));

//Hallo
