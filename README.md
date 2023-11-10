# iTunes & Apple Books Search App

It includes the following:

- Axios is used for React to fetch data from Express
- Bootstrap is used for modals and styling and included via the React Bootstrap UI library
- Concurrently so a simple "npm start" will install all modules and run the app at the same time
- Cors is added to prevent issues with both frontend and backend running locally
- DOMPurify is used to remove malicious code injections when dealing with forms
- Express to run as the backend server
- Formik for form validation feedback
- Jsonwebtoken to identify users and their access rights
- MongoDB to store users, jwt tokens and todos
- Mongoose to connect to Mongo DB
- Nodemon to save the dev from having to constantly restart the server after changes
- React is used for the frontend created via Vite
- React Router Dom for site navigation
- Sweetalert2 for better looking alert messages
- Yup for form validation checks


## App Purpose

A full-stack web application using React and Express that interfaces with the iTunes Search API.


## Requirements

Code was written in Node.JS version 21. Node should be at the very least version 18.


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

#### Second from within this directory start the React frontend
```
cd frontend
npm start
```

### Usage

1) Go to the Register page in the React App with a gmail address for a username and a password meeting the criteria below.

Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character.

A jwt token gets store in the MongoDB Database.

2) Use the same username and password to login in the Login page.