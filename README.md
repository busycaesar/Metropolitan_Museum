# Metropolitan Museum

## Description

This full-stack web application for the Metropolitan Museum offers a comprehensive platform for exploring the museum's collection of artifacts. The application provides robust user authentication and authorization through JWT tokens, ensuring secure access and interactions. Advanced search functionality allows users to filter artifacts based on various criteria, making it easy to find specific items of interest. Additionally, the application stores user search history, allowing users to review and access previous search results, providing a seamless and personalized browsing experience. Finally, a favorites feature enables users to save and revisit their preferred artifacts, enhancing the overall user experience.

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
