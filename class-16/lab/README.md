# LAB: Event Driven Applications

Create an event driven application that "distributes" the responsibility for logging to a separate module, using only events to trigger logging based on activity.

## Before you begin

Refer to *Getting Started*  in the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for complete setup, configuration, deployment, and submission instructions.

## Getting Started

## Requirements

Create an application that can modify a file, using events for status notifications

The application must:

- Accept a file name as a command line parameter
- Find the file specified in the file system
- Use the Node.js `fs` module to read the contents of the file
- Convert the contents of the file to Uppercase
- Save the contents back to the file
- Report success or failure to the console

### Implementation Details and Requirements

- `fs` uses an error first callback on both read and write operations
  - It can also act as a promise if you use `util.promisify()`
- As you read/write files, you can capture any errors that arise
  - Rather than simply `console.log()` to display the error, emit an `error` event containing the error text
- If there are no errors, emit a `success` event with a message
- In a separate module, implement event listeners for both event types
- These listeners should execute the `console.log()`
- You will need to
  - Create an `index.js` file that accepts the command line input
  - Create a `file` module that reads and writes the file
  - Create an `event` module that has a single event emitter instance
  - Create a `logger` module that listens for and responds to events

### Testing

- Write tests around all of your units
  - File Read, File Save, Uppercase
  - Mock the fs module methods so that your tests don't use actual files
- Test event handlers (not events themselves)
- Use spies to help testing your logger methods (assert that console.log was called right)

## Assignment Submission Instructions

Refer to the the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for the complete lab submission process and expectations
