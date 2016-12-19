const exec = require('child_process').exec;
var fs = require('fs');

function doWait() {
    setTimeout(doCheckin, 5000);
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
        console.log(error);
    });
}

doWait();