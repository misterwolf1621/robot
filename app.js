
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const xbee = require('xbee');

const app = express();
const port = 7114;

const { SerialPort } = require('serialport');
const comPort = new SerialPort({
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
    
    var tleftspd = parseInt(gndspeed * leftSpeed);
    var trightspd = parseInt(gndspeed * rightSpeed);
    var spd = "";

    if(tleftspd < 10) {
        spd = "00" + tleftspd;
    } else if(tleftspd < 100) {
        spd = "0" + tleftspd;
    } else {
        spd = tleftspd;
    }

    if(trightspd < 10) {
        spd = spd + "00" + trightspd;
    } else if(trightspd < 100) {
        spd = spd + "0" + trightspd;
    } else {
        spd = spd + trightspd;
    }

    console.log(spd);
    
    res.send({spdleft: tleftspd, spdright: trightspd});
    
    comPort.write(spd.toString());
    
});

comPort.on('readable', function () {
    console.log('Data:', comPort.read())
  })

app.listen(port, console.log('listening on port ' + port));

//Hallo
