const { exec } = require("child_process");
const readline = require("readline");
const { clearInterval } = require("timers");

exec("emulator -list-avds", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    var lines = stdout.split(/[\n]/);
    lines = lines.map((v) => {
        return v.trim();

    }).filter((v) => {
        return v.length > 0;
    })

    // const waitUserInputTill = 10000;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // var timeLimitExceeded = false;
    // var timeout = setTimeout(function() {
    //     timeLimitExceeded = true;
    //     runEmulator(0);
    //     rl.close();
    //     clearTimeout(timeout);

    // }, waitUserInputTill)


    // var timerInterval = 1000;
    // var elapsedTime = timerInterval;
    // var timer = setInterval(() => {
    // elapsedTime += timerInterval;
    // process.stdout.write('\033c');
    // console.log(`\n"${lines[0]}" will run by default in ${waitUserInputTill - elapsedTime} ms. Press: \n`);
    console.log(`\n\n\t${lines.length} emulators found. \n\nPress:\n`);
    lines.forEach((v, i) => {
        console.log(`${i} for ${v}\n`);
    })
    readInput();
    // console.log("Your choice: ");
    // }, timerInterval);

    function readInput() {
        rl.question("Your Choice: ", function(choice) {
            console.log("you entered: " + choice);
            var choosenNumber = parseInt(choice);
            if (choosenNumber < lines.length && choosenNumber >= 0) {
                runEmulator(choice);
                rl.close();
            } else {
                // if (!timeLimitExceeded) {
                console.log("Invalid choice. Choose Again!!");
                readInput();
                // } else {
                //     rl.close();
                // }
            }
        })

    }
    var ranOneEmulator = false;

    function runEmulator(index) {
        if (ranOneEmulator) {
            console.log("One emulator already ran. Cancelling request to run emulator " + lines[index]);
            return;
        }
        if (index >= lines.length) {
            console.log("Cant run emulator with index '" + index + "', since it doesnot exist.");
            return;
        }
        console.log(`Running Emulator "${lines[index]}".`);
        ranOneEmulator = true;
        // clearInterval(timer);
        // clearTimeout(timeout);
        rl.close();
        // console.log("Emulator " + lines[index] + " ran.");
        exec("emulator -avd " + lines[index] + " -no-snapshot", function(error, stdout, stderr) {
            if (error) {
                console.log("Error occurred: " + error);
            }
            if (stderr) {
                console.log("STDError: " + stderr);
            }
            ranOneEmulator = true;

            console.log(stdout);
        })

    }

    rl.on("close", function() {
        console.log("\nBYE BYE !!!");
    });

});