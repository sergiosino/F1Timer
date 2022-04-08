import * as React from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import RaceInfoCard from './components/RaceInfoCard';
import ApplicationBar from './components/ApplicationBar';
import ApplicationFooter from './components/ApplicationFooter';
import { races2022 } from './constants/Races';

function App() {

  const [races, setRaces] = React.useState([]);

  function GetInfo() {
    if (window.location.href.includes("localhost")) {
      axios.get(`http://ergast.com/api/f1/${new Date().getFullYear()}.json`).then(response => {
        setRaces(response.data.MRData.RaceTable.Races);
        console.log(response.data.MRData.RaceTable);
      }).catch(ex => {
        console.log(ex);
      });
    } else {
      setRaces(races2022);
    }
  }

  React.useEffect(() => {
    GetInfo();
  }, []);

  return (
    <>
      <CssBaseline />
      <ApplicationBar />
      <Container fixed>
        <Grid container spacing={3}>
          {races.map((race, index) =>
            <Grid key={index} item xs={12}>
              <RaceInfoCard race={race} />
            </Grid>
          )}
        </Grid>
      </Container>
      <ApplicationFooter />
    </>
  );
}

export default App;
