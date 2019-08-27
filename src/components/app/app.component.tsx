import React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
// import './app.component.scss';

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
      <Button variant="contained" color="primary">Hello World</Button>
      </header>
    </div>
  );
});

export default App;
