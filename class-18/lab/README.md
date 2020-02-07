# LAB: Socket.io

Create an event driven application that simulates the basic functionality of grading an assignment using 2 client applications connected to a server hub via Socket.io, using only events to trigger actions

## Before you begin

Refer to *Getting Started*  in the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for complete setup, configuration, deployment, and submission instructions.

## Requirements

### Server Hub Application

- Build a server hub application using Socket.io
  - Listen on port 3000
  - Create a namespace specifically for a school
  - Allow clients that connect to the school namespace to join "rooms"
    - One for teachers
    - One for students
  - Listen for events indicating a student has turned in an assignment
    - Broadcast a subsequent event that instructors may subscribe to
  - Listen for events indicating an assignment has been graded
    - Broadcast a subsequent event that students may subscribe to

### Student Application

- Build a separate student application
- Connect it to your server, specifically your school namespace
- Join the "room" for students
- Simulate the turning in of assignments
  - Every second, emit an event to the server called `submission` with a unique assignment name
- Subscribe to an event called `graded` such that when an assignment is graded, you can log it to the console

### Instructor Application

- Build a separate instructor application
- Connect it to your server, specifically your school namespace
- Join the "room" for instructors
- Subscribe to an event such that when an assignment is submitted, you can assign it a random grade
- Following the "grading", emit an event named `graded` back to the server with the assignment and grade in an object

  ```javascript
  {
    assignment:'Lab 01',
    grade: 7
  }

### Stretch Goals

- Allow for multiple students to submit assignments
  - The instructor app should grade everything
  - Each student app, however, should see only the grade for the assignments that they submitted

## CODE QUALITY / ENGINEERING GOALS

Rather than simply putting all of the required logic in every file, create an event class library that you can include in each of the applications (api, clients) to uniformly communicate, subscribe, etc with the server hub.

The underlying architecture of your server hub, like many services, can change. If your applications have a layer of abstraction above that, they can remain stable as other implementations change.

```javascript
const Messenger = require('./lib/messaging.js');

messenger.subscribe('graded' showGrade);
messenger.trigger('submit', 'assignment 12');

function showGrade(payload) {
  console.log('Assignment Grade', payload.code);
}
```

### Testing - Basic HTTP

- Start all 3 servers
  - Server Hub
  - Instructor Application/Server
  - Student Application/Server
  - If successful ...
    - Your Student Application should notify the Server Hub every few seconds with an "assignment"
    - The Server Hub should broadcast a message that a new assignment has arrived
    - Your Instructor Application should hear that message and provide a grade, emitted back to the Hub
    - Your Student Applicaiton should log the assignment and the grade received

#### Web Server Visual Tests

- Open this [React Application](https://pcwsr.csb.app/)
- In the form at the top of the page, enter an assignment title
- Submit the form
- This will contact a Server Hub at <http://localhost:3000> and emit a `submission` event with the assignment name
- If your lab is working, this app will show a growing table of graded assignments as you enter them

### Assignment Submission Instructions

Refer to the the [Submitting Standard Node.js Lab Submission Instructions](../../../reference/submission-instructions/labs/node-apps.md) for the complete lab submission process and expectations

> **Your server need not be deployed to Heroku for this lab**
