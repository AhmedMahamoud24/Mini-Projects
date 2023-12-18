import express from 'express';
import { MongoClient } from 'mongodb';
import methodOverride from 'method-override';
import cors from 'cors';

const app = express();
const port = 3001;
const url = 'mongodb://localhost:27017';
const dbName = 'FruitTracker';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

let db;
let fruitsCollection;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
  db = client.db(dbName);
  fruitsCollection = db.collection('fruits');
});


app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.post('/api/fruits', async (req, res) => {
  try {
    await fruitsCollection.insertOne({ name: req.body.name });
    res.redirect('/api/fruits');
  } catch (err) {
    res.status(500).send('Error saving to database');
  }
});

app.get('/api/fruits', async (req, res) => {
  try {
    const fruits = await fruitsCollection.find().toArray();
    res.json({ fruits });
  } catch (err) {
    res.status(500).send('Error fetching from database');
  }
});

app.put('/api/fruits/:id', async (req, res) => {
  try {
    const result = await fruitsCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { name: req.body.name } },
      { returnDocument: 'after' }
    );
    if (!result.value) {
      return res.status(404).send('Fruit not found');
    }
    res.send(result.value);
  } catch (err) {
    res.status(500).send('Error updating fruit');
  }
});

app.delete('/api/fruits/:id', async (req, res) => {
  try {
    const result = await fruitsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).send('Fruit not found');
    }
    res.send('Fruit deleted');
  } catch (err) {
    res.status(500).send('Error deleting fruit');
  }
});

app.get('/', (req, res) => {
  res.send('<button><a href="/api/fruits">View Fruits</a></button> <button><a href="/api/fruits/add">Add Fruit</a></button>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
