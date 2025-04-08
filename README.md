# Job Application Tracker
<img width="1394" alt="job-tracker-application" src="https://github.com/user-attachments/assets/2d894a0e-2d05-4f26-92cf-69f865200933" />

This is a simple job application tracker that allows you to manage and monitor your job search. You can add, edit, delete, and filter job applications by their status, such as "Applied," "Interview," "Offer," "Rejected," or "Wishlist."

View the Application live here: https://kaniahdunn.github.io/kdd-huntr-replica/ 

## Features

- **Add new job applications**: Submit a new job application with details like company, position, status, application date, and contact info.
- **Edit existing job applications**: Update the status of a job application (e.g., from "Applied" to "Interview").
- **Delete job applications**: Remove a job application from the list.
- **Filter by status**: Display job applications based on their status (e.g., "Applied," "Interview," etc.).
- **Responsive**: Works on desktop and mobile devices.

## Tech Stack

- **Frontend**: React
- **Backend**: JSON Server (for simulating a REST API)
- **State Management**: React `useState`, `useEffect`
- **HTTP Requests**: Axios

## Installation

1.  Clone the repository:

        `git clone https://github.com/KaniahDunn/kdd-huntr-replica.git

    cd kdd-huntr-replica
    `

2.  Install the required dependencies:

    `npm install`

3.  Run the development server:

    `npm start`

    This will open the app in your default browser.

## Usage

- **View all applications**: The job applications list will show all jobs stored in the JSON server.
- **Add a new job application**: Click the "Add New Job" button to open a form and add a new job application.
- **Edit an application**: Click the "Update" button next to a job application to edit its status.
- **Delete an application**: Click the trash icon next to a job application to delete it.
- **Filter applications**: Use the dropdown to filter job applications by their status (e.g., "Applied," "Interview").

## API

This project uses a JSON server to simulate a backend. The following endpoints are available:

- **GET** `/jobApplications`: Fetch all job applications.
- **POST** `/jobApplications`: Add a new job application.
- **PUT** `/jobApplications/:id`: Update an existing job application.
- **DELETE** `/jobApplications/:id`: Delete a job application.
