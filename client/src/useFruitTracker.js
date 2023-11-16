import { useState, useEffect } from 'react';

export const useFruitTracker = (initialFruits = []) => {
  const [fruits, setFruits] = useState(initialFruits);

  useEffect(() => {
    document.title = `Fruits: ${fruits.length}`;
  }, [fruits]);

  const addFruit = (fruit) => {
    setFruits([...fruits, fruit]);
  };

  return { fruits, addFruit };
};
