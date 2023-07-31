# Blog
It is RESTFUL API using node.js 


## Tools & packages
   - node.js
   - express.js
   - graphql
   - JWT
   - MongoDB
   - dotenv
   - bcrypt
   - express-validator


## Building
I used MVC pattern to build this API,
Using Clean code to avoid messy code and make it easy to read and edit, using validator for requists, make authentication and autorization.

## APIs
   1. Restful APIs
   2. GraphQL

## error handling
   - using "express-async-errors" package
   - extend Built-in error with custome error to add more information about the error
   - make wrapper function to deal with different type of errors and convert server errors into the custome error

## password
   - using "bcrypt" package to hashing the password to keep it safe

## permissions
   - make middleware to make sure that the user is auth
   - make sure that the object that will be edited or deleted is done by its creator

   



