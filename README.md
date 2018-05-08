# Location-based Quiz - Server Component
This repository, in conjunction with the ‘**[quiz](https://github.com/CoryWilliamsGIS/quiz)**’ and [‘**questions**](https://github.com/CoryWilliamsGIS/questions)’ repositories creates a location-based quiz system including both web and mobile applications, and a PostgreSQL database hosted on a local web server (three-tier architecture).


# Technical Guidance
The following sections will outline the technical documentation for each of the three components of the location-based quiz system.

## Web Application - Question Setting App

#### Target Audience
This component is designed to be used by an administrator and/or question setter of the quiz. This may or may not be the same person. 

#### Technical Requirements
The application was developed on Google Chrome. However, additional testing revealed compatibility with the following web browsers:

 - Mozilla Firefox
 - Microsoft Edge

Optimal performance will be achieved if using the latest version of each web browser. At the time of writing these are as follows:

 - Google Chrome - version 66.0.3359.139
 - Mozilla Firefox - version 59.0.3
 - Microsoft Edge - version 41.16299.15.0

Full compatibility of the web application cannot be guaranteed if the above web browser requirements are not met or exceeded.

#### Installation 

 1. Clone the **questions** repository:
 
`git clone https://github.com/CoryWilliamsGIS/questions`

 2. If you have not already done so, clone the **server** repository:
 
`git clone https://github.com/CoryWilliamsGIS/server`

 3. Navigate to the server repository:
 
`cd server`

 4. Run the server in the background:
 
`node httpServer.js &`

 5. Navigate to the `questions/ucesccw` folder and run the phonegap server:
 
`phonegap serve`

 6. Load the web page in any supported browser:
http://developer.cege.ucl.ac.uk:31289/ 

 7. To exit the phone gap server once finished:
 
`Ctrl + c`

8. Bring the http server into the foreground and exit it:

`fg 1`

`Ctrl + c`

#### Featureset
The three main components of the web application are the Leaflet map, the question form and the menu buttons.

The following menu buttons provide all the user with all the required app functionality:

Menu: <img src="https://user-images.githubusercontent.com/35572803/39753466-cc656124-52b6-11e8-9ca6-3acc69720e8f.png" width="90"> 

This menu feature enables the user to submit the values in the completed form to the database using the httpServer (server repository). The data will include location name, question, four possible answers, the geographic location of the question and the correct answer. 

Menu: <img src="https://user-images.githubusercontent.com/35572803/39753652-7c76e452-52b7-11e8-89a3-a4280c83033a.png" width="70"> 

Following question submission, the values are not automatically removed from the form. This feature allows the user to efficiently clear the form to allow another question to be generated.

Menu: <img src="https://user-images.githubusercontent.com/35572803/39753705-a6c4e722-52b7-11e8-893a-bef7e4757c24.png" width="90"> 

This feature uses the httpServer to retrieve all questions currently in the database and adds them to the Leaflet map. This is useful as the administrator / question setter can avoid placing questions in a location which is too close to an existing question if they wish.


## Mobile Application - Quiz App

#### Target Audience
This component is designed for the end user. Although the end user can technically be the administrator / question setter who used the web application to set the questions, this is not advised as it will defeat the purpose of the quiz. The only prerequisite is the person will be interested in playing the quiz.

#### Technical Requirements
The application was developed on a 3rd generation Motorola Moto G (2015 release). The full specification of the device can be found [here](https://www.techadvisor.co.uk/review/budget-smartphones/motorola-moto-g-2015-review-uk-reduced-3621097/), but the most relevant specifications are:

 - Android Lollipop 5.1.1
 - Qualcomm SnapdragonTM 410 (MSM8916) processor with 1.4 GHz quad-core CPU
 - Adreno 306 with 400 MHz GPU
 - 1GB RAM
 - 8GB storage
 - Wi-Fi 802.11 b/g/n (2.4 GHz)
 - Mobile network -   GSM/GPRS/EDGE, UMTS/HSPA+, 4G LTE
 - Supported location services - GPS, AGPS, GLONASS, BeiDou

The user is advised to install the application on an android device which meets (or exceeds) the above specification. Although it may be possible to successfully install and use the Quiz application as intended on a lower spec device, this cannot be guaranteed. 

#### Installation 
 1. In a browser or secondary device, navigate to the following URL:
https://build.phonegap.com/apps
 2. Paste the **quiz** repository URL into the field, leaving the optional field blank. 
 3. Click '*Pull from .git repository*'.
 4. Refresh the browser and click '*Ready to Build*' to build the quiz app.
 5. Use a QR scanning application installed on the android mobile device to scan the QR code
 6. Follow the on-screen instructions to download and install the application
 7. If you have not  done so already, clone the **server** repository:
 
`git clone https://github.com/CoryWilliamsGIS/server`

 8. Navigate to the server repository:
 
`cd server`

 9. Run the server in the background: 
 
`node httpServer.js &` 

 10. To exit the serve once finished:
 
`Ctrl + c`

#### Featureset
The three main components of the mobile application are the Leaflet map, the side menu buttons and the answer submission feature.

The side menu can be accessed by pressing the <img src="https://user-images.githubusercontent.com/35572803/39755315-4a139144-52bd-11e8-85b3-9df971ca4687.png" width="30">  button. The user will be presented with the following side menu features:

Side Menu: <img src="https://user-images.githubusercontent.com/35572803/39755170-b80392ea-52bc-11e8-9cd1-f910c1c5a3e0.png" width="150">

This menu feature enables the user to track their location, adding it to the Leaflet map as a pink marker which is updated as the user moves. 

Side Menu: <img src="https://user-images.githubusercontent.com/35572803/39755210-da7c5d84-52bc-11e8-8f06-36cfd1bc207e.png" width="150">

Using this feature will add all the current questions in the database to the Leaflet map as orange markers. The user can click the marker to display a popup of the location name information entered in the web application form.

Side Menu: <img src="https://user-images.githubusercontent.com/35572803/39755227-ed284bb4-52bc-11e8-9bc7-73cb8f910f5f.png" width="150">

This feature determines which questions are within 20m of the user, changing their colour to blue on the Leaflet map. The blue marker indicates the user can answer.

Once a blue marker is clicked, the display presents the user with the respective question and four possible answers. The user chooses their answer by pressing the appropriate check button and uploads it to the database by clicking <img src="https://user-images.githubusercontent.com/35572803/39755346-6c65357c-52bd-11e8-9b86-ec542c1de886.png" width="90"> 



## Server - HTTP

#### Target Audience
As the server component is required for the successful use of ***both*** the web and mobile applications, the target audience is their respective users. 

#### Technical Requirements
A HTTPS server is not be able to process the required requests in Microsoft Edge due to security issues etc. Therefore, to ensure compatibility across browsers, a HTTP Server has been implemented utilising Node.js and Representational state transfer (REST) architecture.

Although Node.js  is compatible with several data stores,  Postgres is used as it handles spatial data very efficiently.

#### Installation 
 2. If you have not already done so, clone the **server** repository:
 
`git clone https://github.com/CoryWilliamsGIS/server`

 3. Navigate to the server repository:
 
`cd server`

 4. Run the server in the background:
 
`node httpServer.js &`

5. Once finished, bring the http server into the foreground and exit it:

`fg 1`

`Ctrl + c`

#### Featureset

REST is a standard web architecture which allows client and server to communicate using HTTP protocol. This provides access to the database, which is hosted on a local server at UCL. The database resource contains two relevant tables: 

 - app_questions
 - app_answers

Several REST requests are made to the server using the HTTP verbs 'GET' and 'POST':

 - GET requests are implemented in both the web and mobile applications to display the questions currently in the database onto the Leaflet map.
 - POST requests are also implemented in both the web and mobile applications. The former uploads new questions to the database, whilst the latter uploads the users' answer to the respective question.

## Contributing
If you would like to contribute to this project, please adhere to the following workflow:

 - Fork the relevant repostories
 - Create a branch in the relevant repository for your contribution
 - Once your contribution is working and ready, submit a pull request.

## Reporting bugs & Requesting Features
Any feedback on the system can be submitted through the *Github Issues* section of the respective repository. This can be used to provide general feedback or alert the user of any uncaught bugs or requesting additional system features etc.
