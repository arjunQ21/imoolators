const { exec, spawn } = require("child_process");
const readline = require("readline");
const emulators = require("./functions")
const process = require("process")

emulators.showWelcomeMesesage();

emulators
    .detect()
    .then(function(detectCount) {
        console.log(`\t${detectCount} Emulators Detected.`);
        return emulators.choose()
    })
    .then(index => emulators.run(index))
    .catch(function(e) { console.log(e) })