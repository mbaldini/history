const exec = require('child_process').exec;
var fs = require('fs');

function doWait() {
    var rnd = Math.random();
    // set a timeout for somewhere between 180 and 60 minutes
    var timeout = Math.round(((120 * rnd) + 60) * 60);
    var dt = new Date(new Date().getTime() + timeout * 1000);
    log('next update in ' + (Math.round((timeout / 60) * 100) / 100) + ' minutes at ' + dt.toTimeString());
    // log('waiting ' + timeout + ' seconds (' + (Math.round((timeout / 60) * 100) / 100) + ' minutes)');
    setTimeout(doCheckin, timeout * 1000);
}

function doCheckin() {
    log(new Date().toString() + ': checking file in');
    setTimeout(() => {
        exec('git add .; git commit -m "commit"; git push;', (error) => {
            if (error != null) {
                log(error);
            } else {
                log('success');
            }
        });
        doWait();
    }, 1000);
}

function log(message) {
    console.log(message);
    fs.appendFile("/Users/mbaldini/Git/Misc/history/history.txt", message + "\n", (error) => {
        if (error != null) {
            console.log(error);
        }
    });
}

doWait();