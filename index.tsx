import React from 'react';
// Only run DOM mounting on the client — guard when imported by server tooling
if (typeof document !== 'undefined') {
  // Dynamically require ReactDOM to avoid server import side-effects
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ReactDOM = require('react-dom/client');
  const App = require('./App').default;

  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}
