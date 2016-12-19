const exec = require('child_process').exec;

function doWait() {
    setTimeout(doCheckin, 5000);
}

function doCheckin() {
    console.log(new Date().toString() + ': checking file in');
    exec('git commit -m "commit"; git push;', (error) => {
        console.log(error);
    });
    doWait();
}

doWait();