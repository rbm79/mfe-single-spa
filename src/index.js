import { registerApplication, start } from 'single-spa';
import React from 'react';
import { createRoot } from 'react-dom/client';

// Root application
const Root = () => (
  <div>
    <h1>Root App</h1>
    <nav>
      <a href="/">Home</a>
      <br />
      <a href="/app1">App 1</a>
      <br />
      <a href="/app2">App 2</a>
      <br />
    </nav>
    <div id="single-spa-application:app1"></div>
    <div id="single-spa-application:app2"></div>
  </div>
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

registerApplication({
  name: 'app1',
  app: () => import('./app1/app1.js'),
  activeWhen: ['/app1'],
});

registerApplication({
  name: 'app2',
  app: () => import('./app2/app2.js'),
  activeWhen: ['/app2'],
});

start();
