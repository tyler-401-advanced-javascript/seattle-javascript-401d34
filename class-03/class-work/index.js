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
