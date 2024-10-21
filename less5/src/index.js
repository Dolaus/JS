import App from './app';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp() {
    root.render(
        <App/>
    );
}

renderApp();

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) {
    module.hot.accept('./app', () => {
        const NextApp = require('./app').default;
        root.render(
            <NextApp/>
        );
    });
}
