# More MongoDB
## Lifecycle Methods
A lifecycle method is a method that runs on a Mongoose object at a certain point in its lifecycle. In terms of CRUD, a "lifecycle event" is something that happens when Create, Read, Update, or Delete gets invoked on a particular resource or object.

Mongoose gives us two big important lifecycle methods: `pre` and `post`:
```javascript
const food = mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  type: { type: String, uppercase: true, enum: ['FRUIT', 'VEGETABLE', 'PROTEIN'] },
});

// This runs before we save
food.pre('save', () => {
  this.type = this.type.toUpperCase();
});

// Runs after any time we run findOne, this will run on the document that was found
food.post('findOne', (document) => {
  document.name = document.name.toUpperCase();
});
```
Important to note that this "post" is not HTTP `POST`, it just means "after". You can think of this in terms of events: "pre" will run before the specified event gets called, and "post" after.

## DRY out your code
DRY stands for "Don't Repeat Yourself". Why is this important?
- Less code means fewer points of potential failure
- Less code means fewer things to test
- It looks good, and it's clean. This means it will be more readable and maintainable, either by others in the future, or even by yourself.
- Reusability: DRY code is much easier to adapt for different purposes. ("DRY code is copypasta" ~Eugene)
It's important to make sure that you don't over-optimize or over-DRY prematurely. It's important to get something working, and then you can worry about optimizing it.

Related to this concept is **bikeshedding**: to "bikeshed" means to argue about which color you're going to paint the bike shed before you have nailed a single plank of wood to another plank.

Back to DRYing out code. What if we had a whole bunch of things to represent in our database that all kind of looked like each other but not exactly? What if we had a database of IKEA furniture? Would we want a separate model for couches, and another for beds, and another for bookstands? Probably. But these models would all have things in common, like part numbers, and box dimensions, and cost, and other stuff, so it would make sense to DRY out that part of your data models and have all your different models inherit from some "master" model. Object-oriented programming lends itself very well to this kind of thinking: you can achieve a lot of this kind of DRYness via object inheritance.
