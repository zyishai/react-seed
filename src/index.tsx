import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app';
import * as serviceWorker from './serviceWorker';

async function bootstrap(component: any, element: HTMLElement | null) {
    ReactDOM.render(component, element);

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
}

(async () => {
    await bootstrap(<App />, document.getElementById('root'));
})()