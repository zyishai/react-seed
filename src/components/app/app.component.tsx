import React from 'react';
import { Observer } from 'mobx-react';
import { createMuiTheme, AppBar, Toolbar, Typography, withWidth } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { AppbarActions } from './appbar-actions';

import './app.component.scss';

const theme = createMuiTheme();

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
