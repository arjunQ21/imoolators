const { exec, spawn } = require("child_process")
const readline = require("readline")

const emulators = {
    all: [],

    detect: function() {
        let ref = this;
        return new Promise(function(resolve, reject) {
            exec("emulator -list-avds", function(error, stdout, stderr) {

                if (error || stderr) {
                    reject(`Error loading Emulators.\n${error ? error : stderr} \n\n\n\tPossible Fix:
                    \n\tPlease make sure your PATH environment varibale conatins the path(usually: C:\\Users\\%USERNAME%\\AppData\\Local\\Android\\Sdk\\emulator) to emulator, comes installed with Android SDK, which helps this program load emulators from Android Studio.
                    `);
                }

                ref.all = stdout
                    .split(/[\n]/)
                    .map((v) => {
                        return v.trim();
                    })
                    .filter((v) => {
                        return v.length > 0;
                    })

                if (ref.all.length == 0) {
                    reject("\nNo Emulators were detected. Please make sure you have installed atleast one emulator with Android Studio.")
                }

                resolve(ref.all.length)
            })
        })
    },

    choose: function() {
        // const stringInputs = {
        //     all: [{
        //             key: 'gencmd',
        //             description: 'Generate Execuatable .cmd file',
        //             handler: () => console.log("not supported now")
        //         },
        //         {
        //             key: 'x',
        //             description: 'Exit',
        //             handler: () => process.exit(0)
        //         }
        //     ],
        // };
        const ref = this;
        return new Promise(function(resolve, reject) {
            if (ref.all.length == 0) reject("Empty Emulators Array supplied.")
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            })

            console.log("\nPlease Choose an Emulator: \n\nPress:");

            let i = 0;
            ref.all.forEach(function(emulator) {
                console.log(`      ${i++}  for  ${emulator}`)
            })

            console.log(`\n      x  to  exit`)

            function readInput() {
                rl.question("\nYour Choice: ", function(choice) {
                    if (choice.trim().toLocaleLowerCase() == 'x') {
                        process.exit(0);
                    }
                    console.log("you entered: " + choice);
                    const choosenNumber = parseInt(choice);
                    if (choosenNumber < ref.all.length && choosenNumber >= 0) {
                        rl.close();
                        // resolve(ref.all[choice]);
                        resolve(choice)
                    } else {
                        console.log("Invalid choice. Choose Again!!");
                        readInput();
                    }
                })
            }
            readInput();
        })
    },

    run: function(index) {
        if (index >= this.all.length) {
            console.log("Cant run emulator with index '" + index + "', since it doesnot exist.");
            return;
        }
        console.log(`Running Emulator "${this.all[index]}".`);
        // ranOneEmulator = true;

        // rl.close();
        // console.log("Emulator " + this.all[index] + " ran.");

        const emul = spawn("emulator", ['-avd', this.all[index], '-no-snapshot']);
        // const emul = spawn("ping", ['google.com']);

        emul.stdout.on("data", (data) => console.log(data.toString()));

        emul.stderr.on("data", data => console.log("Emulator Error: " + data));

        emul.on("close", code => console.log("Bye Bye. \nEmulator closed with exit code " + code))


    },

    showWelcomeMesesage: function() {
        console.log(`
        

            █ █▀▄▀█ █▀█ █▀█ █   ▄▀█ ▀█▀ █▀█ █▀█ █▀
            █ █ ▀ █ █▄█ █▄█ █▄▄ █▀█  █  █▄█ █▀▄ ▄█


    Running Android Emulators without opening Android Studio

Documentation: https://github.com/arjunq21/imoolators/

By: arjunQ21

Starting...

        `);
    },

}

module.exports = emulators