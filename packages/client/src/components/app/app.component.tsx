import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './app.component.scss';
import { Footer } from './footer';

type DirectionValue = 'rtl' | 'ltr' | undefined;
const direction = process.env.REACT_APP_UI_DIRECTION as DirectionValue;

const theme = responsiveFontSizes(createMuiTheme({
  direction,
  typography: {
    fontFamily: process.env.REACT_APP_APP_FONT || 'Roboto'
  }
}));

const App: React.ComponentType<any> = () => {
  return (
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="title">
              Shopping List Demo
            </Typography>
          </Toolbar>
        </AppBar>
        <Box display='flex' flexDirection='column' flexGrow={1} overflow='auto' />
        <Footer />
      </ThemeProvider>
  );
};

export default App;
