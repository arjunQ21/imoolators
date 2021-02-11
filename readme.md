# imoolators

## Running Android Emulators without opening Android Studio

Tired of opening Andorid Studio everytime you want to launch an emulator?

This program comes to your rescue.
This program helps you lauch emulators installed via Android Studio, without having to open Android Studio.

## Basic Requirements

Make sure you have installed

* [Android Studio](https://developer.android.com/studio)
* [Node.js](https://nodejs.org/en/download/)

## Installation

* Download this project as zip
* Extract downloaded file and rename extracted folder "imoolators-master" to "**imoolators**".
* You can place extracted folder anyhwere on the system. For now lets do it at *D:\CustomPrograms\\*

    If you have followed correctly, then you should see a file "imoolators.js" at *D:\CustomPrograms\imoolators\\*

* Make sure your environment variable **PATH** contains path to Node.js. You can confirm it by opening a new command window and running

        C:\Users\arjunQ21> node --version
    If you didnt see any errors then you are good to go.

* Add path to Android SDK's **emulator** to your PATH environment variable
  * The path to emulator is  "<Android_SDK_installation_path>\emulator"
  * If you are on Windows, the path to emulator is usually *C:\Users\\%USERNAME%\AppData\Local\Android\Sdk\emulator*
  * If you are on Mac, the path to emulator is usually
  */Users/%USERNAME%/Library/Android/sdk/emulator*
  * If you are on linux or other systems, remember, the path to emulator is  "<Android_SDK_installation_path>\emulator"

  Add the respective path to **emulator** to your PATH  variable. To confirm you have done it right, run this on a new command window.

        C:\Users\arjunQ21> emulator -list-avds
    If this gives no error, you are good to go.

## Running

To run **imoolators**

* Open up a command window at the directory where you have extracted imoolators and run "node imoolators.js".
If you have followed the same directory structure as recommended, your command should look like this:

        D:\CustomPrograms\imoolators> node imoolators.js

This is all. Things should work as expected for now.

Better option for more customization is discussed below.

## Pro Tip

You can launch imoolators from any directory in your system if you follow these steps:

The idea is to make a simple executable file that contains this single line:

        node D:\CustomPrograms\imoolators\imoolators.js
The path *D:\CustomPrograms\imoolators\imoolators.js* may be different in your case if you have not created directory structures as recommended.

Steps:

* Create a new file named "**imoolators.<custom_extenstion>**" in the directory where imoolators\imoolators.js exist. The extension of this file is dependent on your system.
  * For windows, set filename as 'imoolators.cmd'
  * For mac and linux, set filename as 'imoolators.sh'

* The above file contains a single line

  "node <absolute_path_to_imoolators_folder>/imoolaotors.js"

  If you have set directory structures as recommended, the content in file looks like

        node D:\CustomPrograms\imoolators\imoolators.js
* Save the file
* Add **<absolute_path_to_imoolators_folder>** to your **PATH** environment variable. i.e, add

        D:\CustomPrograms\imoolators
    to your PATH.
* This is all. To test you have done it right, open up a new command window at any directory and run

        C:\Any\Directory> imoolators

**NOTE**:
This program is dependent on Android Studio. To Add, Delete or Update your emulators, you should do it through Andorid Studio.
