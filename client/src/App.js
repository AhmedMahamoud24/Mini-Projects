import React, { useState } from 'react';

function FruitTracker() {
  const [fruits, setFruits] = useState([]);

  const addFruit = (fruit) => {
    setFruits([...fruits, fruit]);
  };

  return (
    <div>
      <h1>Fruit Tracker</h1>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
      <button onClick={() => addFruit('Apple')}>Add Apple</button>
      <button onClick={() => addFruit('Banana')}>Add Banana</button>
      <button onClick={() => addFruit('Orange')}>Add Orange</button>
    </div>
  );
}

export default FruitTracker;
