# iTunes & Apple Books Search App

It includes the following:

- Axios is used for Express to fetch data from the iTunes Search API and for React to fetch data from Express and the iTunes Search Api
- Bootstrap is used for modals and styling alongside the React Bootstrap UI library
- Bcrypt - for future implementation, I want to use it to hash my database passwords
- Concurrently so a simple "npm start" will install all modules and run the app at the same time
- Cors is added to prevent issues with both frontend and backend running locally
- Dotenv is used to store sensitive values to access the online database
- DOMPurify is used to remove malicious code injections when dealing with forms
- Express is there to run as the backend server & deal with middleware
- Formik for form validation feedback
- Helmet as middleware in Express to mitigate cross-site scripting attacks
- Jsonwebtoken to identify users and their access rights
- MongoDB to store users, jwt tokens and fav media items add by users to the fav media list
- Mongoose to connect to Mongo DB
- Nodemon to save the dev from having to constantly restart the server after changes
- React is used for the frontend created via Vite
- React Redux is used so the username can be seen sitewide in the navbar when a person logs in & future state management purposes
- React Router Dom for site navigation
- Sweetalert2 for better looking alert messages
- Yup for form validation checks


## App Purpose

A full-stack web application using React, MongoDB and Express that interfaces with the iTunes Search API.
https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html


## Requirements

Code was written in Node.JS version 21. Node should be at the very least version 18.

If I haven't provided you with the .env file that has access to my database & you wish to run it on your own instance of MongoDB then change this line to your own settings.
```
const uri = `mongodb+srv://graveofmine99:${password}@hyperiondevlearning.dpl6f6p.mongodb.net/?retryWrites=true&w=majority`;
``` 
in the backend/server.js file and make sure you have 2 collections called "users" and "favs".


## Check node version

```
node --version
```

### Install Dependencies & Run

Frontend and Backend code is kept apart to make it easier to understand

#### First from within this directory start the Express backend
```
cd backend
npm start
```
Unless you change the .env file in backend folder it will run off
http://localhost:8080/

#### Second from within this directory start the React frontend
```
cd frontend
npm start
```
This typically defaults to
http://localhost:5173/

#### Alternative install & run method
Front the root directory if you prefer to run bash scripts
```
./startFrontAndBack.sh
```


### Usage

1) Go to the Register page in the React App with a gmail address for a username and a password meeting the criteria below.

Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character.

A jwt token gets store in the MongoDB Database.

2) Use the same username and password to login in the Login page.

3) You can now add your favorite media to lists or delete them from those lists in the Media Search section.
The data is fetched from iTunes Search API as you search it.

It is possible to view the fav lists when logged out, only create and delete operations are secured with jwt tokens.

4) If you do not want to bother logging in you can search for albums and get more info on them in the Album Info section.

You just need to enter an album name and album artist then a request is sent to the Express server which makes the request to the 
iTunes API which then gets sent back from Express to the React App.
