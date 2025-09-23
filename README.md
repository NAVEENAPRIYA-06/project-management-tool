# Project Management Tool

This is a full-stack project management tool designed to help individuals and teams organize and track their tasks in a clean and interactive Kanban-style interface.

The application allows users to create, view, update, and delete tasks. Tasks are categorized into "To Do," "In Progress," and "Done" columns, with drag-and-drop functionality for easy status updates.

# Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Acknowledgments](#acknowledgments)

# Features

- **Full CRUD Functionality:** Create, read, update, and delete tasks.
- **Drag-and-Drop Interface:** Easily move tasks between "To Do," "In Progress," and "Done" columns.
- **Responsive Design:** The layout is optimized for both desktop and mobile viewing.
- **Dark Mode:** A sleek dark theme to improve user experience.

# Technologies Used

# Back End
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing task data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.

# Front End
- **React:** JavaScript library for building user interfaces.
- **Chakra UI:** A component library for creating a styled, responsive UI.
- **React Dnd:** A powerful library for adding drag-and-drop functionality.
- **Axios:** A promise-based HTTP client for making API requests.

# Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js (LTS version recommended)
-   MongoDB Atlas account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/project-management-tool.git](https://github.com/your-username/project-management-tool.git)
    cd project-management-tool
    ```

2.  **Set up the Back End:**
    -   Navigate to the server directory:
        ```bash
        cd server
        ```
    -   Install dependencies:
        ```bash
        npm install
        ```
    -   Create a `.env` file and add your MongoDB connection string:
        ```env
        MONGO_URI=your_mongodb_connection_string
        ```
    -   Start the server:
        ```bash
        npm run dev
        ```

3.  **Set up the Front End:**
    -   Open a new terminal and navigate to the client directory:
        ```bash
        cd client
        ```
    -   Install dependencies:
        ```bash
        npm install --legacy-peer-deps
        ```
    -   Start the client:
        ```bash
        npm start
        ```

The application will be running at `http://localhost:3000`.

## Deployment

The project can be deployed on a single platform like Vercel or Netlify.

-   **Back End:** The Node.js server can be deployed on Vercel as a serverless function. You will need to configure the `MONGO_URI` as an environment variable in your Vercel project settings.
-   **Front End:** The React app can be deployed on Vercel as a static site, with its API calls updated to point to the live back-end URL.
