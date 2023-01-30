console.log('HALLO');

var leftSpeed = 0;
var dirLeft = 0;

var rightSpeed = 0;
var dirRight = 0;
var water = 0;


function direction(dir) {
    

    if(dir == "np") {
        leftSpeed = leftSpeed + 2;
        rightSpeed = rightSpeed + 2;
    }
    if(dir == "nm") {
        leftSpeed = leftSpeed - 2;
        rightSpeed = rightSpeed - 2;
    }
    
    if(dir == "rp") {
        
        rightSpeed = rightSpeed + 2;
    }
    if(dir == "rm") {
        
        rightSpeed = rightSpeed - 2;
    }

    if(dir == "lp") {
        leftSpeed = leftSpeed + 2;
        
    }
    if(dir == "lm") {
        leftSpeed = leftSpeed - 2;
        
    }

    if(dir == "w") {
        if(water == 1) {
            water = 0;
            console.log("water set");
        } else {
            water = 1;
            console.log("water reset");
        }

        
    }
    
    if(leftSpeed < 0) {
        dirLeft = 1;
    } else {
        dirLeft = 0;
    }

    if(rightSpeed < 0) {
        dirRight = 1;
    } else {
        dirRight = 0;
    }
    

    

    
    document.getElementById('speedleft').innerHTML = leftSpeed;
    document.getElementById('speedright').innerHTML = rightSpeed;
    document.getElementById('speedleft').style.backgroundColor = "#8B8000";
    document.getElementById('speedright').style.backgroundColor = "#8B8000";
    
    if(water == 1) {
        document.getElementById("water").style.backgroundColor = "#202828";
    } else {
        document.getElementById("water").style.backgroundColor = "lime";
    }
}

function ajax(msg) {
    $.ajax({
        type: "GET",
        cache:false,
        url:"dir",
        data: {
            dir:msg
        },
        success: function(rec) {
            
        }
    });

    
}

function request() {
    var workspeedLeft = String.fromCharCode(Math.abs(leftSpeed) + 97);
    var workspeedRight = String.fromCharCode(Math.abs(rightSpeed) + 97)
    
    var bitint1 = 97;
    if(water == 1) {
        bitint1 = bitint1 + 4;
    }
    if(dirLeft == 1) {
        bitint1 = bitint1 + 2;
    }
    if(dirRight == 1) {
        bitint1 = bitint1 + 1;
    }
    
    var bit1 = String.fromCharCode(bitint1);
    resetStyle();
    ajax(bit1 + workspeedLeft + workspeedRight);


}

function stop() {
    ajax("aaa");
    leftSpeed = 0;
    rightSpeed = 0;
    document.getElementById('speedleft').innerHTML = leftSpeed;
    document.getElementById('speedright').innerHTML = rightSpeed;
}

function norm(type) {
    var workspeedLeft;
    var workspeedRight;
    var bit1;

    resetStyle();
    switch(type) {
        case "s":
            bit1 = 'a';
            workspeedLeft = 'w';
            workspeedRight = 'w';
            document.getElementById('s').style.background = "#8B8000";
            break;
        case "b":
            bit1 = 'd';
            workspeedLeft = 'w';
            workspeedRight = 'w';
            document.getElementById('b').style.background = "#8B8000";
            break;
        case "lr":
            bit1 = 'b';
            workspeedLeft = 'w';
            workspeedRight = 'w';
            document.getElementById('lr').style.background = "#8B8000";
            break;
        case 'hr':
            bit1 = 'b';
            workspeedLeft = 'z';
            workspeedRight = 'z';
            document.getElementById('hr').style.background = "#8B8000";
            break;
        case "ll":
            bit1 = 'c';
            workspeedLeft = 'w';
            workspeedRight = 'w';
            document.getElementById('ll').style.background = "#8B8000";
            break;
        case 'hl':
            bit1 = 'c';
            workspeedLeft = 'z';
            workspeedRight = 'z';
            document.getElementById('hl').style.background = "#8B8000";
            break;
        
    }
    console.log(bit1 + workspeedLeft + workspeedRight);

    
    ajax(bit1 + workspeedLeft + workspeedRight);
}

function resetStyle() {
    document.getElementById('speedleft').style.backgroundColor = "#202828";
    document.getElementById('speedright').style.backgroundColor = "#202828";
    
    document.getElementById('hl').style.background = "#202828";
    
    document.getElementById('ll').style.background = "#202828";
    document.getElementById('s').style.background = "#202828";
    document.getElementById('lr').style.background = "#202828";
    document.getElementById('hr').style.background = "#202828";
    document.getElementById('b').style.background = "#202828";
    
}