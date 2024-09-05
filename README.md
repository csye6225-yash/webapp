# Assignment Management System 📝

This Node.js application is an Assignment Management System that allows users to create, update, and delete assignments. It also supports assignment submissions with validation checks, such as the maximum number of attempts and submission deadlines. The system includes user authentication using basic HTTP authentication with email and password.

## Technologies Used 🚀

- **Node.js**: The application is built using Node.js for server-side JavaScript programming.
- **Express**: Used as the web application framework for handling HTTP requests and responses.
- **Sequelize**: ORM (Object-Relational Mapping) for interacting with the database.
- **bcrypt**: Password hashing and verification for user authentication.
- **AWS SDK**: Interacts with Amazon Simple Notification Service (SNS) for publishing messages.
- **Winston**: Used for logging, providing both console and file-based logging.
- **CSV Parser**: Processes CSV files for creating or updating user accounts.
- **StatsD**: Collects custom application metrics.

## Database 🗃️

The application uses **Sequelize** as the ORM to interact with the underlying relational database. The database schema includes tables for:

- **Assignments**
- **Accounts**
- **Submissions**

## API Endpoints 🌐

### Health Check

- **GET** `/healthz`: Performs a health check, verifying the connection to the database.

### Assignment Endpoints

- **GET** `/v1/assignments`: Retrieve a list of all assignments.
- **GET** `/v1/assignments/:id`: Retrieve details of a specific assignment by ID.
- **POST** `/v1/assignments`: Create a new assignment with the following validations:
  - Name must be a non-empty string.
  - Points must be a number between 1 and 10.
  - Number of attempts must be a positive integer.
  - Deadline must be a valid date.
- **PUT** `/v1/assignments/:id`: Update an assignment (restricted to the owner) with similar validations as the creation.
- **DELETE** `/v1/assignments/:id`: Delete an assignment (restricted to the owner).

### Assignment Submission

- **POST** `/v1/assignments/:id/submission`: Submit an assignment with the following validations:
  - Submission URL must be a non-empty string.
  - Submission URL must be a valid URL ending with `.zip`.
  - Users cannot submit more times than the specified number of attempts.
  - Submissions after the deadline are not allowed.

## Authentication 🔐

User authentication is implemented using **basic HTTP authentication**. Users are required to include an Authorization header with their email and password encoded in Base64.

## Assignment Submission and SNS Integration 📤

When users submit assignments, a message is published to an AWS SNS topic. This can be used for notification purposes or integration with other services.

## Logging 📝

The application utilizes **Winston** for logging. Logs are output to both the console and a file (`app.log`).

## CSV Processing 📊

The application includes a function (`addCSVtoDB`) to read and process a CSV file, creating or updating user accounts based on the data.

