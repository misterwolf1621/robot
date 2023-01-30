
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const xbee = require('xbee');
const app = express();
const port = 7113;

const { SerialPort } = require('serialport');
const { receiveMessageOnPort } = require('worker_threads');
const comPort = new SerialPort({
path: 'COM3',
baudRate: 9600,
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

var firstLogin = false;



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
    var data = req.query.dir;
    
    comPort.write(data);
    console.log(data);

    
});

app.get('/dir', (req, res)=> {
    
    
    
    console.log(req.query.dir);
    comPort.write(req.query.dir);
    res.send("hallo");
});

function ascii(num) {
    return String.fromCharCode(num);
}


comPort.on('readable', function () {
    var data = comPort.read().toString();

    console.log("return: " + data);
  })

app.listen(port, console.log('listening on port ' + port));

//Hallo