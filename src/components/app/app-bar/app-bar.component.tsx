import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AppbarActions } from '../appbar-actions';
import { makeStyles, createStyles } from '@material-ui/styles';

interface AppBarComponentProps {
    width: number;
}

const useStyles = makeStyles(() => 
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

const AppBarComponent: React.ComponentType<any> = (props: AppBarComponentProps) => {
  const styles = useStyles();
  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.root}>
            Shopping List Demo
          </Typography>
          <AppbarActions width={props.width} />
        </Toolbar>
      </AppBar>
  );
}

export default AppBarComponent;
