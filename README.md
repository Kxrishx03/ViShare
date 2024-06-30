# ViShare

A videso sharing  application built using the MERN stack (MongoDB, Express, React, Node) with JWT authentication.

## Features

- User Authentication (Signup/Login) using JWT
- Upload and manage videos
- View videos with like and comment functionality
- User profiles


## Tech Stack

- **Frontend:** React.js, Redux, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Prerequisites

- Node.js
- npm or yarn
- MongoDB

## Installation

1. Clone the repository

    ```bash
    git clone https://github.com/your-username/youtube-clone.git
    cd youtube-clone
    ```

2. Install dependencies for both server and client

    ```bash
    # For server
    cd server
    npm install

    # For client
    cd ../client
    npm install
    ```

3. Set up environment variables

    Create a `.env` file in the `server` directory with the following content:

    ```
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application

    ```bash
    # Start the server
    cd server
    npm start

    # Start the client
    cd ../client
    npm start
    ```



