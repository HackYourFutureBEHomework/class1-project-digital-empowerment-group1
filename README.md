# HackYourFutureBE Class 1 Project - Digital Empowerment

Hobo is a day center for homeless people in Brussels. We've developed a real-world application as a learning tool that teaches basic computer skills and tasks for the people coming to the center.

### Goals for the project
  - **Teach people without prior experience to use a computer for basic tasks**: this teaching will both be accompanied and unaccompanied. It’s important to have the least amount of text as possible present on the site, everything should be visual and interactive.
  - **Allow Hobo to manage the application without developer interference**: Application administrators at hobo should be able to manage the application’s contents and users easily and without having to consult a developer. 

## Contributing a new use case

Do you have a use case that is not covered in this app? Please open an issue (even if you don't have the answer for that use case). You can also create a Pull Request. However we recommend opening an issue first.

## Getting started

### Running the application

You will have to install packages for both `client` and `server`.
So in the both folders, run either
```
npm install
```
or
```
yarn
```

It's easiest to have 3 terminal sessions/windows open. One for running the client, one for the server and one for `Git`/`MongoDB` testing. You can start both the client and server by running
```
npm start
```
in their folders. They will run on port 3000 and 4000, respectively.

### Structure

This project uses technologies that includes `React`, `Node` and `MongoDB`.

The application has the following structure:

`client`  
Folder for everything front-end related. Houses the React application.

`client/src/App.jsx`  
Application entrypoint with `react-router` definitions.

`client/src/api`  
One file per resource (e.g. module, path, user) that has `XHR`/`fetch` functions for retreiving and manipulating data from the API.

`client/src/assets/css`  
All of your styles, the methodology/flavouring/preprocessor you use, is all up to you.

`client/src/assets/images`  

`client/src/components`  
All of your components, I'd group these up per page as well.



`server`  
Folder for everything back-end related. Houses a decoupled, Node API.  
**Note that this folder should have a `.env` file that includes a `MONGODB_URL` variable.** It should point to your local instance of MongoDB.
```
MONGODB_URL=mongodb://localhost:27017/digital-empowerment
```

`server/src/controller`  
`server/src/model`  
`server/src/route`  
Each of these folders have one file per resource, [example here](https://github.com/HackYourFutureBelgium/class1-project-digital-empowerment/tree/master/server/src).
