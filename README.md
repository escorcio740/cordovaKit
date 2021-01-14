# cordovaKit

A kit with some javascript files to help to create a android project using cordova.
This package is under devolepment and its only (currently) working on Windows.
The build is limited to Android platforms.

To start have sure you have npm and cordova installed

## Steps to Install
- 1 - To install npm [download](https://www.npmjs.com/get-npm) it from official website and follow their instruction to install it.
- 2 - Install [Gradle](https://gradle.org/install/) 
- 3 - Install [Composer](https://getcomposer.org) 
- 4 - Install [SASS](https://sass-lang.com) (I recommend ruby version even if is depecreated)
- 4 - Run `npm install -g cordova@9.0.0`
- 5 - Install [Java Development Kit](https://www.oracle.com/pt/java/technologies/javase-downloads.html) (I recommend jdk 1.8.0_251 version)
- 6 - Install [Wampp](https://sourceforge.net/projects/wampserver/files/) (Or the .bat file won't work to build the project, you can of course edit the .bat file and use another localhost providers)
- 7 - Clone this repo to a folder called "EscorcioKit" inside your `C:/wamp64/www` folder
- 8 - Setup the enviroment variables.
   * 8.1 - Go to your Control Panel -> System and Security -> System -> Advanced System Settings.
   * 8.2 - Click on Enviroment Variables
   * 8.3 - Localize Path on first table (just to be sure add on second one too) and add this new entries :
      * 8.3.1) `C:\Gradle\bin`
      * 8.3.2) `C:\Users\YOUR_USER_NAME\AppData\Roaming\Composer\vendor\bin`
      * 8.3.3) `C:\Program Files (x86)\Google\Chrome\Application (optional)`
      * 8.3.4) `C:\Program Files\Java\DISTRIBUTION_YOU_DOWNLOADED_ON_STEP_5\bin`
      * 8.3.5) `C:\Users\YOUR_USER_NAME\AppData\Local\Android\Sdk\platform-tools`
      * 8.3.6) `C:\Program Files\Git\cmd`
  - 9 - Build the project using cmd ! Open the .bat file and follow the instructions !

  
