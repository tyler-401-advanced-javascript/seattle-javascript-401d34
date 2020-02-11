# Code Review from Class 01

## Anatomy of a Unix Command
### Arguments and flags
Think of a Unix command as a function that takes arguments:
```
cd /Users/emily
```
In this command, `cd` is the name of the program that actually changes your working directory, and `/Users/emily` is the argument to that command. Think of this like there's a `function cd(directory)` and you pass the name of the directory you want to change to into the function.

Here's a more complicated example:
```
mkdir -p /Users/emily/code_fellows/my_project
```
Here, `-p` is a *flag*. Everything after the command is a parameter, but here the `-p` flag specifies a particular behavior. In this case, it means "if there are any directories 'in between' the one that I want to create and the root directory, create those as well." So if you do this:
```
mkdir /Users/emily/code_fellows/my_project
mkdir: /Users/emily/code_fellows: No such file or directory
```

But if you do
```
mkdir -p /Users/emily/code_fellows/my_project
```
it will create `/Users/emily/code_fellows` *before* trying to create the `my_project` directory inside that directory.

### Flags with parameters
Imagine we had a Node server that runs by default on port 3000, but let's imagine that our server had a function where we could change that port number. Generally in Unix you accomplish that with something like this:
```
node server.js
```
to run the bare server with no customization, but:
```
node --port=3001 server.js
```
The `--port=3001` is telling `node` (remember, `node` is the program that we're executing, and `server.js` is an argument to the `node` program) to override the default port. This is called a *parameter*.

### Notesy
The goal of Notesy is to be able to store notes. The first task to make that happen is to be able to parse the arguments and parameters on the command line.

A Notesy command will look something like this:
```
notesy -a add -p "Hello world"
```
Here, `-a` and `-p` are flags which are followed by parameters. `-a` stands for "action" and `-p` stands for "payload". So the command line should interpret this command as:
```
notesy    # name of program to be executed
-a        # the following thing will be the name of the action
add       # the name of the action
-p        # the following thing will be the payload
"Hello"   # the payload
```

How do we use this with Minimist?

Minimist is a library for Node.js that simplifies all of the parsing for us. It means that we don't have to go deep into the mechanics of what the user typed and try to figure out what it was they actually did; Minimist gives that to us as a JavaScript Object.

So when a user types
```
notesy -a add -p "Hello world"
```
we should expect Minimist to give us back an argument object that looks like:
```javascript
{ a: 'add', p: 'Hello World' }
```
In other words, the *keys* of that object will be the flags, and the *values* for each key will be whatever followed that flag.

The above is one way we could write Notesy. Here's another way:
```
notesy -a "Hello world"
```
If the Notesy app worked this way, what is the function of `-a`? It doesn't mean "action" anymore; it's shorthand for "add". So when parsing this command with Minimist, what are we going to get?
```javascript
{ a: 'Hello world' }
```
We could also do it with a whole word flag (`--add`) as follows:
```
notesy --add "Hello world"
```
produces
```javascript
{ add: 'Hello world' }
```

If we wrote our app that way, we would need its logic to work something like this:
```javascript
function Input() {
  let args = minimist(process.argv.slice(2));
  // args will look like { a: 'Hello world' }
}
Input.prototype.parseInput = function(args) {
  let possibleArguments = {
    a: 'add',
    add: 'add',
    // ultimately we'll add "d: 'delete', etc."
  }
  let allArguments = Object.keys(args)
  // so if the user said "-a 'Hello'" allArguments will be ['_', 'a']
  let keyOfArgument = allArguments.filter(arg => possibleArguments[arg])[0]
  // iterate through ['_', 'a']
  // see if that string exists as a key on the possibleArguments
  // then take the first one that does
  return {
    action: possibleArguments[keyOfArgument],
    payload: args[keyOfArgument]
  }
  // so we'll return an object that looks like:
  // { action: 'add', payload: 'Hello world' }
}
```

## Creating Tests
A test in Jest is composed of an `it()` function, which expresses a block of expectations for whether that specific test should pass or not, and inside `it()` functions we have `expect()` functions, which express the specific expectations.

```javascript
describe('Addition functions', () => {
  it('2 + 2 should equal 4', () => {
    expect(2 + 2).toEqual(4);
  });
  if('2 + 2 should not equal 5', () => {
    expect(2 + 2).not.toEqual(5);
  })
});
```
[This webpage](https://jestjs.io/docs/en/expect) tells you everything you can use inside a Jest `expect` block.

**In general, you will want to have at least one test for every method on an object.**

## Publishing to NPM
