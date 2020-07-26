import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core/';

const Intro = () => {
  return (
    <div
      className='containerIntro'
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100vh',
      }}
    >
      <Typography variant='h2' component='h2' style={{ marginBottom: '11vh' }}>
        Welcome to the Github Repository list app!
      </Typography>
      <Link to='/form'>
        <Button variant='contained' color='primary' size='large'>
          Enter
        </Button>
      </Link>
    </div>
  );
};

export default Intro;
