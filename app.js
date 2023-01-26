
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
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var firstLogin = false;
var leftSpeed = 0.5;
var rightSpeed = 0.5;
var gndspeed = 0;
var water = 0;

app.get("/", load, (req, res) => {
    
        res.render('../views/index.ejs');
    
});

function load(req, res, next) {
    if(!firstLogin) {
        res.render('../views/loading.ejs');
        firstLogin = true;
        

        console.log("first");
    } else {
        next();
    }
    
    
}


app.get('/dir', (req, res)=> {
    var dir = req.query.dir;

    if(dir == "f") {
        gndspeed = gndspeed + 20;
    }
    if(dir == "b") {
        gndspeed = gndspeed - 20;
    }
    if(dir == "r") {
        leftSpeed = leftSpeed+ 0.1;
        rightSpeed = rightSpeed- 0.1;
    }
    if(dir == "l") {
            rightSpeed = rightSpeed+ 0.1;
            leftSpeed = leftSpeed-0.1;
        
    }
    if(dir == "w") {
        if(water == 1) {
            water = 0;
            console.log("water set");
        } else {
            water = 1;
            console.log("water reset");
        }

        console.log("wartwe");
    }
    
    var tleftspd = parseInt(gndspeed * leftSpeed);
    var trightspd = parseInt(gndspeed * rightSpeed);
    var spd = "";

    if(tleftspd < 0) {
        spd = "1";
        tleftspd = tleftspd * (-1);
    } else {
        spd = "0";
    }
    if(trightspd < 0) {
        spd = spd + "1";
        trightspd = trightspd * (-1);
    } else {
        spd = spd + "0";
    }

    if(tleftspd < 10) {
        spd = spd + "00" + tleftspd;
    } else if(tleftspd < 100) {
        spd = spd + "0" + tleftspd;
    } else {
        spd = "" + spd + tleftspd;
    }

    if(trightspd < 10) {
        spd = spd + "00" + trightspd;
    } else if(trightspd < 100) {
        spd = spd + "0" + trightspd;
    } else {
        spd = "" +  spd + trightspd;
    }

    if(water == 1) {
        spd = spd + "1";
        console.log("water set");
    } else {
        spd = spd + "0";
    }
    console.log(spd);
    
    res.send({spdleft: tleftspd, spdright: trightspd, water: water});
    
    comPort.write(spd.toString());
    
});

comPort.on('readable', function () {
    var data = comPort.read.toString();

    console.log(data);
  })

app.listen(port, console.log('listening on port ' + port));

//Hallo
