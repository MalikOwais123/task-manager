# Full-Stack Application

This is a full-stack application with a `frontend` and `backend` directory. The backend is built with a Node.js server and connects to a MongoDB database, while the frontend is built with a modern JavaScript framework (e.g., React, Vue, etc.).

## Prerequisites

Before getting started, ensure that you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (or a MongoDB Atlas account for a cloud database)

You will also need the following environment variables for the backend.

## Environment Variables

For the backend, create a `.env` file inside the `backend` folder with the following content:

```ini
MONGO_URI=<your-mongodb-connection-uri>
JWT_SECRET=<your-jwt-secret-key>
```

## Setup and Running the Application

1. Backend Setup
- Navigate to the backend directory:
```ini
cd backend
```

- Install dependencies:
```ini
npm install
```

- Set up the environment variables:
Create a .env file in the backend folder and add the required variables (MONGO_URI and JWT_SECRET).

- Start the backend server:
```ini
npm start
```

The backend application should now be running on a local development server (typically at http://localhost:3000).



2. Frontend Setup
- Navigate to the frontend directory:
```ini
cd ../frontend
```

- Install dependencies:
```ini
npm install
```

- Start the frontend application:
```ini
npm start
```

The frontend application should now be running on a local development server (typically at http://localhost:5173).
