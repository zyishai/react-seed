import React from 'react';
import { Observer } from 'mobx-react';
import { createMuiTheme, AppBar, Toolbar, Typography, withWidth } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { AppbarActions } from './appbar-actions';

import './app.component.scss';

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
    <Observer>
      { () =>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className="title">
                Tasks Demo
              </Typography>
              <AppbarActions width={width} />
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      }
    </Observer>
  );
};

export default withWidth()(App);
