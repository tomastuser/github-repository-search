import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Backdrop,
  CircularProgress,
  Button,
  Typography,
  List,
  ListItemProps,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const RepoOrgsList = (props: any) => {
  const BASE_URL = 'https://api.github.com';

  const [backdropOpen, setBackdropOpen] = useState(false);

  const [repos, setRepos] = useState<any[]>([]);
  const [orgs, setOrgs] = useState<any[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    })
  );
  const classes = useStyles();

  function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component='a' {...props} />;
  }

  function GoBackButton() {
    let history = useHistory();

    function handleClick() {
      history.push('/form');
    }

    return (
      <Button
        variant='contained'
        color='primary'
        size='large'
        onClick={handleClick}
        style={{ backgroundColor: '#1976d2', marginBottom: '5vh' }}
      >
        Back
      </Button>
    );
  }

  useEffect(() => {
    setBackdropOpen(true);
    Promise.all([
      fetch(
        `${BASE_URL}/users/${props.match.params.username}/repos?per_page=250`
      ),
      fetch(`${BASE_URL}/users/${props.match.params.username}/orgs`),
    ])
      .then(async ([res1, res2]) => {
        const repos = await res1;
        const orgs = await res2;

        repos.json().then((data) => {
          setRepos(data);
        });
        orgs.json().then((data) => {
          setOrgs(data);
        });
        setIsLoaded(true);
        setBackdropOpen(false);
      })
      .catch((error) => {
        console.log('Error :', error);
      });
  }, []);
  return (
    <div
      className='container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div
        className='usernameHeading'
        style={{
          width: '80%',
          marginRight: 'auto',
          marginLeft: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography
          variant='h6'
          component='h6'
          style={{
            marginTop: '4vh',
            textTransform: 'uppercase',
          }}
        >
          username
        </Typography>
        <Typography
          variant='h2'
          component='h2'
          style={{
            marginBottom: '2vh',
          }}
        >
          {props.match.params.username}
        </Typography>
      </div>
      <div
        className='repoOrgList'
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '20px',
          justifyContent: 'center',
          marginBottom: '2vh',
        }}
      >
        <div
          className='column1'
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            textAlign: 'left',
          }}
        >
          <Typography
            variant='h6'
            component='h6'
            style={{ marginBottom: '2vh' }}
          >
            Repositories:
          </Typography>
          {isLoaded ? (
            repos.length > 0 ? (
              <List>
                {repos.map((repo) => (
                  <ListItemLink button href={repo.html_url}>
                    <ListItemText
                      primary={repo.name}
                      secondary={repo.html_url}
                    />
                  </ListItemLink>
                ))}
              </List>
            ) : (
              <List>
                <ListItem button>
                  <ListItemText primary='User has no repositories listed.' />
                </ListItem>
              </List>
            )
          ) : (
            <List>
              <ListItem button>
                <ListItemText primary='Loading...' />
              </ListItem>
            </List>
          )}
        </div>
        <div
          className='column2'
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            textAlign: 'left',
          }}
        >
          <Typography
            variant='h6'
            component='h6'
            style={{ marginBottom: '2vh' }}
          >
            Organizations:
          </Typography>
          {isLoaded ? (
            orgs.length > 0 ? (
              <List>
                {orgs.map((org) => (
                  <ListItemLink href={org.url}>
                    <ListItemText
                      primary={org.login}
                      secondary={org.description}
                    />
                  </ListItemLink>
                ))}
              </List>
            ) : (
              <List>
                <ListItem button>
                  <ListItemText primary='User has no organizations listed.' />
                </ListItem>
              </List>
            )
          ) : (
            <List>
              <ListItem button>
                <ListItemText primary='Loading...' />
              </ListItem>
            </List>
          )}
        </div>
      </div>
      <div>{GoBackButton()}</div>
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <div
        className='spacer'
        style={
          isLoaded ? { display: 'none' } : { display: 'block', height: '100vh' }
        }
      ></div>
    </div>
  );
};

export default RepoOrgsList;
