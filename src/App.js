import * as React from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import RaceInfoCard from './components/RaceInfoCard/RaceInfoCard';
import ApplicationBar from './components/ApplicationBar';
import ApplicationFooter from './components/ApplicationFooter';
import { raceStatusEnum } from "./constants/Enums";

function App() {

  const [races, setRaces] = React.useState([]);
  const [nextRace, setNextRace] = React.useState(null);
  let nextRaceFound = false;
  const year = new Date().getFullYear();

  function GetRacesInfo() {
    axios.get(`https://ergast.com/api/f1/${year}.json`).then(response => {
      setRaces(response.data.MRData.RaceTable.Races);
      console.log(response.data.MRData.RaceTable);
    }).catch(ex => {
      console.log(ex);
    });
  }

  function GetNextRace() {
    for (let race in races) {
      if (new Date(races[race].date) > new Date()) {
        setNextRace(races[race]);
        document.getElementById(`${races[race].Circuit.circuitId}-raceInfoCard`).scrollIntoView();
        console.log(document.getElementById(`${races[race].Circuit.circuitId}-raceInfoCard`).offsetTop)
        break;
      }
    }
  }

  function GetRaceStatus(race) {
    if (new Date(race.date) > new Date()) {
      if (!nextRaceFound) {
        nextRaceFound = true;
        return raceStatusEnum.next;
      }
      return raceStatusEnum.future;
    }
    return raceStatusEnum.past;
  }

  React.useEffect(() => {
    GetRacesInfo();
  }, []);

  React.useEffect(() => {
    GetNextRace();
  }, [races]);

  return (
    <>
      <CssBaseline />
      <ApplicationBar nextRace={nextRace} />
      <Container fixed>
        <Grid container spacing={3}>
          {races.map((race) =>
            <Grid id={`${race.Circuit.circuitId}-raceInfoCard`} key={race.Circuit.circuitId} item xs={12} style={{ scrollMargin: 100 }}>
              <RaceInfoCard race={race} raceStatus={GetRaceStatus(race)} year={year} />
            </Grid>
          )}
        </Grid>
      </Container>
      <ApplicationFooter />
    </>
  );
}

export default App;
