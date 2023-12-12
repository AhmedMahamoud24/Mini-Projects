import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors()); // Use CORS middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// MongoDB and Mongoose setup
mongoose.connect('mongodb://localhost:27017/FruitTracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Mongoose Schema and Model for Fruit
const fruitSchema = new mongoose.Schema({
  name: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// POST - Add a new fruit
app.post('/api/fruits', async (req, res) => {
  try {
    const newFruit = new Fruit({ name: req.body.name });
    await newFruit.save();
    res.redirect('/api/fruits');
  } catch (err) {
    res.status(500).send('Error saving to database');
  }
});

// GET - Retrieve all fruits
app.get('/api/fruits', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.json({ fruits });
  } catch (err) {
    res.status(500).send('Error fetching from database');
  }
});
/*

*/
// PUT - Update an existing fruit
app.put('/api/fruits/:id', async (req, res) => {
  try {
    const fruit = await Fruit.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!fruit) {
      return res.status(404).send('Fruit not found');
    }
    res.send(fruit);
  } catch (err) {
    res.status(500).send('Error updating fruit');
  }
});

// DELETE - Delete a fruit
app.delete('/api/fruits/:id', async (req, res) => {
  try {
    const fruit = await Fruit.findByIdAndDelete(req.params.id);
    if (!fruit) {
      return res.status(404).send('Fruit not found');
    }
    res.send('Fruit deleted');
  } catch (err) {
    res.status(500).send('Error deleting fruit');
  }
});

// Home route
app.get('/', (req, res) => {
  res.send(`<button ><a href="/api/fruits"> View Fruits </a> </button> <button ><a href="/api/fruits/add"> Add Fruit </a> </button> `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
