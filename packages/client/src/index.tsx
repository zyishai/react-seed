import React from 'react';
import { render as renderReact } from 'react-dom';

// material-ui imports
import CssBaseline from '@material-ui/core/CssBaseline';

// external libraries
import { injectServices } from '@react-seed/di';

// local imports
import * as serviceWorker from './serviceWorker';

// external component imports
import { App } from './components/app';

// external styles
import './styles/index.scss';

// TODO: add supports for plugins.
// TODO: add general logger (default: console).

async function bootstrap(component: any, element: HTMLElement | null) {
    injectServices([]);
    renderReact(component, element);

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
}

(async () => {
    await bootstrap(
        <>
            <CssBaseline />
            <App />
        </>, 
        document.getElementById('root'));
})()