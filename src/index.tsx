import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { App } from './components/app';
import * as serviceWorker from './serviceWorker';

import './styles/index.scss';

// TODO: add support for RxJS
// TODO: add supports for plugins.
// TODO: add general logger (default: console).

async function bootstrap(component: any, element: HTMLElement | null) {
    ReactDOM.render(component, element);

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