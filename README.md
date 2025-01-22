# machine-test-kba
## Task Management System
A simple React task management application with CRUD operations.

## Features

- **Add Task**
- **View Tasks**
- **Edit Tasks**
- **Delete Tasks**

## API Documentation
**Base URL** : http://localhost:5001
- Add task  
       URL :/tasks  
       Method :POST  
     Description :to add task  
 - View task  
        URL :/tasks  
        Method :GET  
        Description : to view all tasks
 - Delete task  
        URL :/tasks/id  
        Method :DELETE  
        Description :to delete task  
 - Update task  
        URL :/tasks/id  
        Method :PUT  
        Description :to update task  

## How to Run the Project  
clone the repository
```
  git clone https://github.com/sujinbabups/machine-test-kba.git
  cd machine-test-kba
```
## How to run the project
Initialize dependencies for frontend
  ```
    cd frontend
    npm install
  ```
- To start front end
    ```
    npm run dev
    ```  
run backend
Initialize dependencies backend
  ```
  npm i
  ```
Create a .env file and add your mongodb connection string  
then run backend
```
node index.js
```


## Technologies used
- **React**
- **Node JS**
- **Express**
- **MongoDB Atlas**
- **Tailwind CSS**
