
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const xbee = require('xbee');
const app = express();
const port = 7114;
/*
const { SerialPort } = require('serialport');
const comPort = new SerialPort({
path: 'COM3',
baudRate: 9600,
});
*/
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var firstLogin = false;

var leftSpeed = 0;
var dirLeft = 0;

var rightSpeed = 0;
var dirRight = 0;
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

app.get('/send', (req, res) => {
    comPort.write(req.query.send);
    console.log(req.query.send);
    res.send("rec");
});

app.get('/dir', (req, res)=> {
    var dir = req.query.dir;

    if(dir == "np") {
        leftSpeed = leftSpeed + 5;
        rightSpeed = rightSpeed + 5;
    }
    if(dir == "nm") {
        leftSpeed = leftSpeed - 5;
        rightSpeed = rightSpeed - 5;
    }
    
    if(dir == "rp") {
        
        rightSpeed = rightSpeed + 5;
    }
    if(dir == "rm") {
        
        rightSpeed = rightSpeed - 5;
    }

    if(dir == "lp") {
        leftSpeed = leftSpeed + 5;
        
    }
    if(dir == "lm") {
        leftSpeed = leftSpeed - 5;
        
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
    
    var tLeft = leftSpeed;
    var tRight = rightSpeed;

    if(leftSpeed < 0) {
        dirLeft = 1;
        tLeft = tLeft * (-1);
    } else {
        dirLeft = 0;
    }

    if(rightSpeed < 0) {
        dirRight = 1;
        tRight = tRight * (-1);
    } else {
        dirRight = 0;
    }

    var dirwater = Number("" + water + dirLeft + dirRight);
    console.log(dirwater);
    var tString = String.fromCharCode(dirwater, tLeft, tRight);
    
    console.log(tString);
    
    res.send({spdleft: leftSpeed, spdright: rightSpeed, water: water});
    
//    comPort.write(tString);
    
});

function ascii(num) {
    return String.fromCharCode(num);
}

/*
comPort.on('readable', function () {
    var data = comPort.read().toString();

    console.log(data);
  })
*/
app.listen(port, console.log('listening on port ' + port));

//Hallo