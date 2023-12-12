import React, { useState, useEffect } from 'react';

function FruitTracker() {
  const [fruits, setFruits] = useState([]);
  const [newFruitName, setNewFruitName] = useState('');
  const [updatedFruitName, setUpdatedFruitName] = useState('');
  const [fruitToUpdate, setFruitToUpdate] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch fruits from the backend
  const fetchFruits = () => {
    fetch('http://localhost:3001/api/fruits')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFruits(data.fruits);
        setError(null);
      })
      .catch(error => {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      });
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchFruits();
  }, []);

  // Function to add a new fruit
  const addFruit = () => {
    fetch('http://localhost:3001/api/fruits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newFruitName })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchFruits(); // Refresh the list of fruits
    })
    .catch(error => {
      setError('Error adding fruit');
      console.error('Error adding fruit:', error);
    });
    setNewFruitName(''); // Reset input field
  };

  // Function to update a fruit
  const updateFruit = () => {
    if (fruitToUpdate) {
      fetch(`http://localhost:3001/api/fruits/${fruitToUpdate._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedFruitName })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        fetchFruits(); 
      })
      .catch(error => {
        setError('Error updating fruit');
        console.error('Error updating fruit:', error);
      });
      setUpdatedFruitName(''); 
      setFruitToUpdate(null); 
    }
  };

  // Function to delete a fruit
  const deleteFruit = (id) => {
    fetch(`http://localhost:3001/api/fruits/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        fetchFruits(); 
      })
      .catch(error => {
        setError('Error deleting fruit');
        console.error('Error deleting fruit:', error);
      });
  };

  return (
    <div>
      <h1>Fruit Tracker</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a new fruit"
          value={newFruitName}
          onChange={(e) => setNewFruitName(e.target.value)}
        />
        <button onClick={addFruit}>Add Fruit</button>
      </div>

      {fruitToUpdate && (
        <div>
          <input
            type="text"
            placeholder="Enter updated name"
            value={updatedFruitName}
            onChange={(e) => setUpdatedFruitName(e.target.value)}
          />
          <button onClick={updateFruit}>Update Fruit</button>
          <button onClick={() => setFruitToUpdate(null)}>Cancel</button>
        </div>
      )}

      <ul>
        {fruits.map((fruit) => (
          <li key={fruit._id}>
            {fruit.name}
            <button onClick={() => setFruitToUpdate(fruit)}>Update</button>
            <button onClick={() => deleteFruit(fruit._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {error && <p>{error}</p>}
    </div>
  );
}

export default FruitTracker;
