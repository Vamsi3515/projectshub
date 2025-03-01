import React from 'react';
import '../../App.css';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkred',
    },
  },
}));

const ButtonUsage = (props) => {
  const classes = useStyles();

  return (
    <Button variant="contained" onClick={props.onClick} className={classes.btn}>
      {props.name}
    </Button>
  );
};

export default ButtonUsage;