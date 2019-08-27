import React from 'react';
import { observer } from 'mobx-react';
import './app.component.scss';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';

const App: React.FC = observer(() => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
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
