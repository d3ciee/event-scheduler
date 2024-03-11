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

## Request validation
To validate request bodies, this projects uses Zod and express middleware to check whetether the shape of the body is correct

## User Interface(W/P)
Server side rendered web user interface using tailwind and ejs.
### Screenshots

`/`
![Alt text](https://raw.githubusercontent.com/d3ciee/event-scheduler/main/public/images/screenshots/calender-view.jpeg)
`/user/login`
![Alt text](https://raw.githubusercontent.com/d3ciee/event-scheduler/main/public/images/screenshots/login-screen.jpeg)
`/user/register`
![Alt text](https://raw.githubusercontent.com/d3ciee/event-scheduler/main/public/images/screenshots/register-screen.jpeg)

## Setup 
Prerequisites: node.js runtime and npm package manager
Clone this repository:
`git clone https://github.com/d3ciee/event-scheduler.git`

Install dependencies:
```
cd event-scheduler
npm install
```

Run migration script
```
npm run migrations:generate
npm run migrations:push
```

Run the application:
`npm run dev`

## API Endpoints
### Event Routes
#### `GET /api/events` 
Retrieve a list of all events.  Accepts searchParams query, limit and offset.  Responds
`
{
    status:"success"| "error";
    data?:{
        events:{
            id:string;
            title: string;
            description: string;
            date: yyyy-mm-dd;
            time: hh:mm;
            createdAt: timestamp;
            createdBy:{
                id:string;
                email:string;
            }
        }[]
    },
    errors:string[]
}
` 

#### `GET /api/events/:id`
Get details of a specific event.  Takes in id as a param and returns
`

{
    status:"success"| "error";
    data?:{
        event:{
            id:string;
            title: string;
            description: string;
            date: yyyy-mm-dd;
            time: hh:mm;
            createdAt: timestamp;
            createdBy:{
                id:string;
                email:string;
            }
        }
    },
    errors:string[]
}
`

#### `POST /api/events`
Create a new event.  Receives
`
{
  title:string;
  description:string;
  date:yyyy-mm-dd,
  time:hh:mm;
  duration:hh:mm
  
}
`
and returns

`
{
    status:"success"| "error";
    data?:{
        eventId:string;
    };
    errors?:string[]
}
`
#### `PUT /api/events/:id`
Update an existing event.
`
{
  title?:string;
  description?:string;
  date?:yyyy-mm-dd,
  time?:hh:mm;
  duration?:hh:mm
  
}
`
and returns

`
{
    status:"success"| "error";
    errors?:string[]
}
`
#### `DELETE /api/events/:id`
Delete an event.
returns
`
{
    status:"success"| "error";
    errors?:string[]
}
`

### User Routes
#### `POST /api/register`
Register a new user. Receives
`
{
    email:string;
    password:string
}
returns
{
    status:"success"| "error";
    errors?:string[];
    data?:{token:string;};
}
`

#### `POST /api/login`
Login a user. Receives
`
{
    email:string;
    password:string
}
returns
{
    status:"success"| "error";
    errors?:string[];
    data?:{token:string;};
}
`

#### `GET /api/logout`
Log out the current user.
`
{
    status:"success"| "error";
    errors?:string[];
}
`
