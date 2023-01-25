console.log('HALLO');

function direction(dir) {
    ajax(dir);
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
            document.getElementById('speedleft').innerHTML = rec.spdleft;
            document.getElementById('speedright').innerHTML = rec.spdright;
        }
    });
}