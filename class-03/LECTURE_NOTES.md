# Data Modeling
## What is Data Modeling?
How do we represent real-world (or imaginary) objects in JavaScript, or some other programming language, or in some kind of abstract data?

We're going to use **MongoDB** as our data persistence layer. *Persistence* means that it'll hold onto the data long-term. Up until now we've basically been writing programs that throw away all their inputs and outputs when the programs terminate. Using a database such as MongoDB lets us achieve *persistence* with that data, so that we can access it multiple times from multiple different programs.

What's the difference between MongoDB and SQL? SQL is a **relational database**: data is organized into tables, which have columns, that can refer to other tables and other columns. It actually looks a lot like a spreadsheet; we call this *tabular* data. MongoDB is an example of **NoSQL**. This means that data in Mongo can have any "shape": it doesn't necessarily have to fit into a predetermined table. The trade-off here is you get lots of flexibility with MongoDB, but certain kinds of operations (table joins, for example) will be more computationally expensive.

Another advantage to MongoDB is that it looks a lot like JavaScript, and in fact things are stored internally in MongoDB as (something very close to) JSON. This means that we can reason about MongoDB using all of our JavaScript knowledge and tools.

## Object-Relational Mapping (ORM)
An ORM is a tool or a programming technique for converting data between systems using object-oriented programming. This means that in a lot of cases we don't have to write raw SQL or raw Mongo or whatever. We're going to use an ORM for MongoDB called **Mongoose**.

Mongoose lets us create **models** of our data. What's a model?
- Models describe shape (what properties and object has)
- Models describe rules (what things are required, what data types they are, etc.)
- Models adhere to CRUD behaviors
  - CRUD: Create, Read, Update, Delete
- Models can have business logic (rules related to how you can manipulate the data)
- Models generally represent **things** or **entities** (you might have a model for Animals, or Food, or IKEA Furniture, and then other models that inherit from those models: think object-oriented programming and inheritance)

In MongoDB (and in Mongoose), a group of models is generally called a **collection** (think "database" or "table" in SQL). An instance of a model is called a "document".

## Let's code some Models
Let's make a schema to represent different types of foods in MongoDB:

```javascript
// models/food-schema.js
const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    uppercase: true,
    enum: ['FRUIT', 'VEGETABLE', 'PROTEIN']
  },
  calories: { type: Number, required: true }
});

module.exports = mongoose.model('food', foodSchema);
```

How are we going to consume this model? (with relish)

The fact that Mongoose exports models as constructor functions means we can instantiate them by writing `new` and passing an object that has the same shape as the model's schema:
```javascript
// index.js
const mongoose = require('mongoose');
const Food = require('./models/food-schema.js');

const carrot = new Food({
  name: 'Carrot',
  calories: 25,
  type: 'VEGETABLE'
})
```
We're going to want to set up our JS app to talk to MongoDB. Right now, this code above doesn't do anything. Let's make MongoDB save the carrot:
```javascript
const MONGOOSE_URI = 'mongodb://localhost:27017/food';
mongoose.connect(MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

function doDataStuff() {
  carrot.save()
  console.log('Food Created:', carrot)
}

doDataStuff();
```

# A brief detour into async/await land
What is an asynchronous process?
- An asynchronous process is **non-blocking**: that is, it does not wait for other code to finish running.
- Execution of the asynchronous process happens "in the background" and is finished "whenever".
Examples of asynchronous processes:
- API calls
- Database queries
- Disk access
Basically, anything that you can't predict how long it's going to take is an asynchronous process.

In JS we write asynchronous code in three ways:
1. Callback functions (a function that runs when the asynchronous process completes). The significant drawback to callback functions is they can get nested and confusing and really ugly really quickly. This is often referred to as "callback hell" or "nesting hell" or the "pyramid of doom".
2. Promises (a literal "promise" that "you're going to get back a response from the API" or "you're going to receive confirmation that the database saved an object"). Promises are often chained together using `.then`
3. `async`/`await` (you define a function as `async` and inside of it you can `await` something that would normally return a Promise, and the code execution will wait for whatever's being promised).

It's important to note that `async` and `await` are keywords. You put `async` before the declaration of any function that has asynchronous code in it, and you get to use `await` inside that function to make execution of the code wait for some asynchronous process to finish.

## Let's write some asynchronous code
```javascript
const axios = require('axios'); // axios is a library to make API calls
const POKEAPI_URL = 'https://pokeapi.co/api/v2';

async function getPokemon(name) {
  const response = await axios.get(`${POKEAPI_URL}/pokemon/${name}`);
  return response;
}

async function getLotsOfPokemon() {
  const pokemon = [
    await getPokemon('ditto'),
    await getPokemon('pikachu'),
  ];
  pokemon.forEach(p => console.log(p.data.name));
}

getLotsOfPokemon();
```
It's important to note that an async function will always return a Promise:
```javascript
async function myFunction() {
  return 'abcdef';
}
> myFunction()
Promise { 'abcdef' }
```
In order to fulfill the Promise, you use the `await` keyword.

# Async and Mongoose
[Mongoose models](https://mongoosejs.com/docs/models.html) inherit lots of asynchronous methods for creating and reading data from the MongoDB database:
```javascript
const mongoose = require('mongoose');
const Food = require('./models/food-schema.js');

const MONGOOSE_URI = 'mongodb://localhost:27017/food';
mongoose.connect(MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function doDataStuff() {
  // Create a carrot. Creating a resource always returns the thing that got created
  const carrot = new Food({
    name: 'Carrot',
    calories: 25,
    type: 'VEGETABLE',
  });
  await carrot.save();
  console.log('Food Created:', carrot);

  // List all foods
  const allFoods = await Food.find({});
  console.log('All foods:', allFoods);

  // Create a food that isn't a carrot so that we can find different types of foods
  const pizza = new Food({
    name: 'Pizza',
    calories: 850,
    type: 'FRUIT',
  });
  await pizza.save();
  console.log('Food Created:', pizza);
  const allVegetables = await Food.find({ type: 'VEGETABLE' });
  console.log('There are', allVegetables.length, 'vegetables');
  const allPizzas = await Food.find({ name: 'Pizza' });
  console.log('There are', allPizzas.length, 'pizzas');

  // Find a specific food by its idea
  const onePizza = await Food.findById(pizza.id); // this will get the same pizza we created with `new` above
  console.log('one pizza:', onePizza);

  mongoose.disconnect();
}

doDataStuff();
```
The model's `find` method finds all documents of that model that match the specified criteria (use `{}` to find all). Since you don't know how many you're going to get (0, 1, or many), the result will be an `Array`.

The model's `findById` method finds one specific document by a specified ID. Since you always know you're only going to get 1 (or an error, if you made a boo-boo somewhere), you get a bare `Object` back instead of an array.
