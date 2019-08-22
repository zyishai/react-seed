import React from 'react';
import { observer } from 'mobx-react';
import logo from '../../assets/images/logo.svg';
import { appService } from './app.service';
import './app.component.css';

const App: React.FC = observer(() => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
});

export default App;
