import React from 'react';
import ReactDOM from 'react-dom';
import { demos } from './demos';

ReactDOM.render(
  <React.StrictMode>
    <h1>idb demos for a blogpost. </h1>
    <h2>demos are supposed to be clicked sequentially, skipping and jumping may cause errors.</h2>
    {Object.entries(demos).map(entry => {
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
