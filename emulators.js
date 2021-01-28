const { exec, spawn } = require("child_process");
const readline = require("readline");
const configs = require("./configs.json");
const emulatorURI = '/emulator/emulator.exe';
let emulatorPath = "";

// console.log(configs.AndroidSdkPath)

if (configs.AndroidSdkPath.length > 0) {
    emulatorPath = configs.AndroidSdkPath + emulatorURI;
} else {

    emulatorPath = "C"
}







function runEmulator(index) {

    if (index >= emulators.length) {
        console.log("Cant run emulator with index '" + index + "', since it doesnot exist.");
        return;
    }
    console.log(`Running Emulator "${emulators[index]}".`);
    ranOneEmulator = true;

    rl.close();
    console.log("Emulator " + emulators[index] + " ran.");

    // const emul = spawn("emulator", ['-avd', emulators[index], '-no-snapshot']);
    const emul = spawn("ping", ['google.com']);

    emul.stdout.on("data", (data) => console.log(data.toString()));

    emul.stderr.on("data", data => console.log("Emulator Error: " + data));

    emul.on("close", code => console.log("Bye Bye. \nEmulator closed with exit code " + code))


}

// rl.on("close", function() {
//     console.log("\nBYE BYE !!!");
// });

// });