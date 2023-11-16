const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

const Fruits = [
  { id: 1, name: 'Mangos' },
  { id: 2, name: 'Apples' },
  { id: 3, name: 'Banana' },
];

app.get('/', (req, res) => {
  res.send(`<button ><a href="/api/Fruits"> Fruits </a> </button> <button ><a href="/api/Fruits/add"> add Fruits </a> </button> `);
});

app.get('/api/Fruits', (req, res) => {
  res.render('Fruits.ejs', { Fruits });
});

app.get('/api/Fruits/add', (req, res) => {
  res.render('Fruitsform.ejs');
});

app.get('/api/Fruits/add/:id', (req, res) => {
  res.render('updatedFruits.ejs');
});

app.post('/api/Fruits', (req, res) => {
  console.log(req.body.name);

  const newFruits = {
    id: Fruits.length + 1,
    name: req.body.name,
  };

  Fruits.push(newFruits);
  res.redirect('/api/Fruits');
});

// Define a PUT route handler for updating a workout.
app.put('/api/Fruits/update/:id', (req, res) => {
  console.log('fired put');
  const Fruits = parseInt(req.params.id);
  const updatedName = req.body.name;

  const workout = Fruits.find((w) => w.id === Fruits);

  if (workout) {
    workout.name = updatedName;
    res.status(200).send(`Workout with ID $ {Fruits} updated.`);
  } else {
    res.status(404).send(`Workout with ID $ {Fruits} not found.`);
  }
});

// Define a DELETE route handler for deleting a workout.
app.delete('/api/Fruits/delete/:id', (req, res) => {
  const FruitsId = parseInt(req.params.id);

  const index = Fruits.findIndex((w) => w.id === FruitsId);

  if (index !== -1) {
    Fruits.splice(index, 1);
    res.redirect('/api/Fruits'); // Redirect to Fruits page after deletion
  } else {
    res.status(404).send(`Fruits with ID $ {FruitsId} not found.`);
  }
});

// Define a POST route handler for /api/Fruitsform
app.post('/api/Fruitsform', (req, res) => {
  // Handle the POST request for /api/Fruitsform here

  // Access the form data from req.body
  const newItemName = req.body.name;

  // Assuming you want to add a new item based on the form data
  const newItem = {
    id: Fruits.length + 1,
    name: newItemName,
  };

  // Add the new item to the Fruits array
  Fruits.push(newItem);

  // Redirect to the Fruits page
  res.redirect('/api/Fruits');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
