const { exec } = require("child_process")

function detectEmulators(emulatorsPath = 'emulator') {
    return new Promise(function(resolve, reject) {
        exec(emulatorsPath + " -list-avds", function(error, stdout, stderr) {
            if (error) {
                reject(error)
            }
            if (stderr) reject(stderr);

            resolve(
                stdout
                .split(/[\n]/)
                .map((v) => {
                    return v.trim();
                })
                .filter((v) => {
                    return v.length > 0;
                })
            )
        })
    })
}

function chooseEmulator(emulators = []) {
    return new Promise(function(resolve, reject) {
        if (emulators.length == 0) reject("Empty Emulators Array supplied.")
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        console.log("\nPlease Choose an Emulator: \n\nPress:");

        let i = 0;
        emulators.forEach(function(emulator) {
            console.log(`      ${i++}  for  ${emulator}`)
        })

        function readInput() {
            rl.question("Your Choice: ", function(choice) {
                console.log("you entered: " + choice);
                const choosenNumber = parseInt(choice);
                if (choosenNumber < emulators.length && choosenNumber >= 0) {
                    rl.close();
                    resolve(emulators[choice]);

                } else {
                    console.log("Invalid choice. Choose Again!!");
                    readInput();
                }
            })
        }
        readInput();
    })
}

async function getCurrentUserName() {
    return new Promise(function(resolve, reject) {
        exec("echo %USERNAME%", (error, stdout, stderr) => {
            if (error || stderr) reject("Error Occurred getting username.");
            resolve(stdout.toString())
        })
    })
}