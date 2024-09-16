import React from 'react';
import { createRoot } from 'react-dom/client';

const App1 = () => (
  <div>
    <h2>App 2</h2>
    <p>This is app 2</p>
  </div>
);

let root = null;

export function mount(props) {
  return new Promise((resolve) => {
    const domElement = document.getElementById(`single-spa-application:${props.name}`);
    if (domElement) {
      root = createRoot(domElement);
      root.render(
        <React.StrictMode>
          <App1 />
        </React.StrictMode>
      );
      resolve();
    } else {
      console.error(`Cannot find DOM element for ${props.name}`);
      resolve();
    }
  });
}

export function unmount(props) {
  return new Promise((resolve) => {
    if (root) {
      root.unmount();
      root = null;
    }
    resolve();
  });
}
