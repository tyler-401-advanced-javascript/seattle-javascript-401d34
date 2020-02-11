# Functional Programming
A **pure function** is a procedure that takes in some input and returns some output. That's it. It literally does nothing else.

If a function does something else, it's called "impure". The other things that it does are called "side-effects".

Pure function:
```javascript
function addTwoNumbers(x, y) {
  return x + y;
}
```

Impure function:
```javascript
function addTwoNumbers(x, y) {
  console.log('hippopotamus');
  return x + y;
}
```

Is this function pure or impure?
```javascript
function addTwoNumbers(x, y) {
  console.log(x + y);
}
```
This function returns `undefined`! `console.log` is a side-effect, so this function is **impure**.

Functions, in functional-programming language, bear a single responsibility: to return a value.

**Idempotent** is a computer science and mathematics term which basically means "guaranteed to be repeatable". In other words, a function that is idempotent always returns exactly the same thing.

This function is idempotent:
```javascript
function addTwoNumbers(x, y) {
  return x + y;
}
```
No matter how many times you run this, it'll always do the exact same thing. This is because it relies solely on the input and does not cause or depend on any side effects.

This function is not idempotent:
```javascript
function getRandomNumber() {
  return Math.random()
}
```
This function is **pure** but not **idempotent**.

# JavaScript Classes
We know what a constructor function is: invoking it with `new` creates an instance of that object.
```javascript
const Animal = function(name) {
  this.name = name;
};

Animal.prototype.walk = function() {
  console.log('Walking...');
};
```
We can make children of `Animal` by setting their `prototype` to `Animal`:
```javascript
const Dog = function(name) {
  Animal.call(this, name) // essentially call "super" on the parent class`
}
Dog.prototype = Object.create(Animal.prototype)
```

JavaScript gives us a really nice syntax (in ES6) for doing all this without mucking around with `prototype`s: we are going to use **classes**:
```javascript
class Animal {  // similar to writing function Animal()
  constructor(name) { // When we create a new Animal, the constructor function will run
    this.name = name;
  }
  walk() {  // all animals can walk in this imaginary world
    console.log('Walking...');
  }
}

class Dog extends Animal {
  speak() {  // only dogs can speak
    console.log('bark bark bark');
  }
}
```
The Dog doesn't need its own constructor—it inherits the constructor function from the Animal class—but if we wanted to, we could give our Dog some dog-specific behavior in its own constructor:
```javascript
class Dog extends Animal {
  constructor(name, color) {
    super(name) // do the normal thing with "name", i.e. whatever Dog inherited from Animal
    this.color = color; // do something dog-specific with "color": in this world, only dogs have colors
  }
}
```

Snakes can't walk:
```javascript
class Snake extends Animal {
  constructor(name, venomous = false) { // snakes are non-venomous by default
    super(name)
    this.venomous = venomous;
  }
  
  walk() {
    return undefined;
  }
}
```
