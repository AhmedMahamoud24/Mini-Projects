// client/src/PropsAndState.js
import React, { useState } from 'react';

function PropsAndState(props) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Props and State Example</h2>
      <p>Props received: {props.message}</p>
      <p>Current count: {count}</p>
      <button onClick={handleIncrement}>Increment Count</button>
    </div>
  );
}

export default PropsAndState;
