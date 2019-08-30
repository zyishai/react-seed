import React from 'react';
import { observer } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { AppbarActions } from './appbar-actions';

import './app.component.scss';
import { Demo } from '../demo';

type DirectionValue = 'rtl' | 'ltr' | undefined;
const direction = process.env.REACT_APP_UI_DIRECTION as DirectionValue;

const theme = createMuiTheme({
  direction,
  typography: {
    fontFamily: process.env.REACT_APP_APP_FONT || 'Roboto'
  }
});

const App: React.ComponentType<any> = ({ width }) => {
  return (
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="title">
              Shopping List Demo
            </Typography>
            <AppbarActions width={width} />
          </Toolbar>
        </AppBar>
        <Demo />
      </ThemeProvider>
  );
};

export default observer(withWidth()(App));
