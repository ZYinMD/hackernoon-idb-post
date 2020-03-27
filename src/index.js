import React from 'react';
import ReactDOM from 'react-dom';
import { playground } from './playground';

ReactDOM.render(
  <React.StrictMode>
    {Object.entries(playground).map(entry => {
      const [key, value] = entry;
      return (
        <div key={key}>
          <button onClick={value}>{key}</button>
        </div>
      );
    })}
  </React.StrictMode>,
  document.getElementById('root'),
);
