import React from 'react';
import { playground } from './Playground';

function App() {
  return (
    <>
      {Object.entries(playground).map(entry => {
        const [key, value] = entry;
        return (
          <div key={key}>
            <button onClick={value}>{key}</button>
          </div>
        );
      })}
    </>
  );
}

export default App;
