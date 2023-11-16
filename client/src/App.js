// client/src/App.js
import React, { useState } from "react";

function App() {
  const [fruits, setFruits] = useState([]);
  const [newFruit, setNewFruit] = useState("");
  const [showEditInput, setShowEditInput] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedFruit, setEditedFruit] = useState("");

  const handleAddFruit = () => {
    if (newFruit.trim() !== "") {
      setFruits([...fruits, newFruit]);
      setNewFruit("");
    }
  };

  const handleEditFruit = (index) => {
    setShowEditInput(true);
    setEditedIndex(index);
    setEditedFruit(fruits[index]);
  };

  const handleEditFruitChange = (value) => {
    setEditedFruit(value);
  };

  const handleSaveEdit = () => {
    const updatedFruits = [...fruits];
    updatedFruits[editedIndex] = editedFruit;
    setFruits(updatedFruits);
    setShowEditInput(false);
    setEditedIndex(null);
    setEditedFruit("");
  };

  const handleDeleteFruit = (index) => {
    const updatedFruits = [...fruits];
    updatedFruits.splice(index, 1);
    setFruits(updatedFruits);
  };

  return (
    <div className="App">
      <h1>Fruit List</h1>
      <input
        type="text"
        placeholder="Add fruit"
        value={newFruit}
        onChange={(e) => setNewFruit(e.target.value)}
      />
      <button onClick={handleAddFruit}>Add</button>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>
            {showEditInput && editedIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedFruit}
                  onChange={(e) => handleEditFruitChange(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {fruit}
                <button onClick={() => handleEditFruit(index)}>Edit</button>
                <button onClick={() => handleDeleteFruit(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
