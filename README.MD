# Event Scheduler
The Event Scheduler is a web application built using TypeScript, Express.js, Drizzle-ORM, SQLite, and EJS,Tailwind for the frontend.

## Features
## Event Creation and Management:
Users can create new events by providing details such as event name, date, time, and description.
Events can be edited or deleted as needed.
Event data is stored in an SQLite database using Drizzle-ORM.

## User Authentication:
Implement user authentication to secure access to event management features.
Users can sign up, log in, and log out.
Only authenticated users can create, edit, or delete events.
Uses bearer tokens and cookies with the actual token being used an id refering to a session stored in the db

## User Interface(W/P)
Server side rendered web user interface using tailwind and ejs.
### Screenshots
![Alt text](https://github.com/event-scheduler/public/images/screenshots/calender-view.jpeg)
![Alt text](https://github.com/event-scheduler/public/images/screenshots/login-screen.jpeg)
![Alt text](https://github.com/event-scheduler/public/images/screenshots/register-screen.jpeg)


Installation and Setup
Clone this repository:
git clone https://github.com/your-username/event-scheduler.git

Install dependencies:
cd event-scheduler
npm install

Set up your environment variables:
Create a .env file with the necessary configuration (e.g., database connection details, secret keys).
Run the application:
npm start

API Endpoints
Event Routes
GET /events: Retrieve a list of all events.
GET /events/:id: Get details of a specific event.
POST /events: Create a new event.
PUT /events/:id: Update an existing event.
DELETE /events/:id: Delete an event.
User Routes
POST /signup: Register a new user.
POST /login: Authenticate a user.
GET /logout: Log out the current user.