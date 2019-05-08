import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 500,
    margin: 10,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 40
  }
};

const DiaryMed = ({ classes, med_name }) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>{med_name}</Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary'>
          Diary Entries
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(DiaryMed);
