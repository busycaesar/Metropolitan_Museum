# Metropolitan Museum

## Description

This is a Full-stack webapp(a part of school project) of Metropolitan Museum. It displays all the artifacts displayed in the Museum.

## Tech Stack

Frontend: Next.js, Jotai, Bootstrap
Backend: Node.js, Express.js, JWT, Passport-JWT
Database: MongoDB

## Features

### Authentication and Authorization

New user can register the account using username and password.
Returning user can authenticate and log into the account using credentials used while registering the account.
Only authorized user can see the list of artifacts upon authention.

### Advanced Search

Authenticated users can perform the search using Title, Tags, Artist/Culture name, Location, and/or query to see the list of artifacts as per their requirements.

### Manage favourites and search history

Authenticated users can add/delete some particular artifact as favouties. The user later access the list of all the favourite artifacts.
Similarly, all the advanced search queries of the authenticated user is stored as search history. The user can scroll through this list and revisit or delete any previously search query. 

## How to run?

Upon cloning this project, there will be two folders in the repository. One is for frontend and the other is for backend. Copy this project in the code editor of choice and start the terminal. 

## Backend

First, using the command 'cd Backend', move to the Backend folder of the project.
Then type the following command to start the server.

```bash
npm run dev
```

This starts the backend server on port 8080, connects with MondoDB and displays all the logs for each logic which helps the developer in case of any error.

## Frontend

Upon start the backend server, open a new terminal and using command 'cd Frontend', change the current working directory to Frontend.
Subsequently use the following command to start the frontend in dev environment.

```bash
npm run dev
```
