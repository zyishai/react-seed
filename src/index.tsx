import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { App } from './components/app';
import * as serviceWorker from './serviceWorker';

import './styles/index.scss';

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