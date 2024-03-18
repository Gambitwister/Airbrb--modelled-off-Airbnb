import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, Box, Grid, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import WhiteLink from '../components/BlueLink';

const GoLive = (props) => {
  const [startDates, setStartDates] = React.useState(['2022-11-18']);
  const [endDates, setEndDates] = React.useState(['2022-11-19']);

  const moreDates = () => {
    setStartDates([...startDates, '']);
    setEndDates([...endDates, '']);
  };

  const sendDates = async () => {
    const dates = [];
    for (let i = 0; i < startDates.length; i++) {
      dates.push(startDates[i]);
      dates.push(endDates[i]);
    }
    const response = await fetch(
      `http://localhost:5005/listings/publish/${localStorage.getItem(
        'liveId'
      )}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          availability: dates,
        }),
      }
    );
    const data = response.json();
    if (data.error) {
      alert(data.error);
    }
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Typography variant='h5' sx={{ m: 2 }} gutterBottom>
        Please select the availability:
      </Typography>

      <Box sx={{ width: '60%' }}>
        <Grid container spacing={1}>
          {startDates.map((date, index) => {
            return (
              <>
                <Grid item xs={12} md={6}>
                  <form className={classes.container} noValidate>
                    <TextField
                      id='date'
                      label='From'
                      type='date'
                      defaultValue='2022-11-18'
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => {
                        const oldList = [...startDates];
                        oldList[index] = event.target.value;
                        setStartDates(oldList);
                      }}
                    />
                  </form>
                </Grid>
                <Grid item xs={12} md={6}>
                  <form className={classes.container} noValidate>
                    <TextField
                      id='date'
                      label='To'
                      type='date'
                      defaultValue='2022-11-19'
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => {
                        const oldList = [...endDates];
                        oldList[index] = event.target.value;
                        setEndDates(oldList);
                      }}
                    />
                  </form>
                </Grid>
              </>
            );
          })}
        </Grid>
        <Button variant='contained' sx={{ m: 2 }} onClick={moreDates}>
          More dates
        </Button>
        <Button sx={{ m: 2 }} color='secondary' variant='outlined'>
          <WhiteLink to={'my-listings'}>Back</WhiteLink>
        </Button>
        <Button
          sx={{ width: '20px' }}
          color='secondary'
          variant='outlined'
          onClick={sendDates}
        >
          <WhiteLink to={'my-listings'}>Submit</WhiteLink>
        </Button>
      </Box>
    </>
  );
};

export default GoLive;

GoLive.propTypes = {
  token: PropTypes.string,
};
