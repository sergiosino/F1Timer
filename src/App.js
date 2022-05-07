import * as React from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import RaceInfoCard from './components/RaceInfoCard/RaceInfoCard';
import ApplicationBar from './components/ApplicationBar';
import ApplicationFooter from './components/ApplicationFooter';
import { raceStatusEnum } from "./constants/Enums";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/Theme';
import ToggleColorMode from './contexts/ToggleColorMode';

function App() {

  const [races, setRaces] = React.useState([]);
  const [nextRace, setNextRace] = React.useState(null);
  let nextRaceFound = false;
  const year = new Date().getFullYear();

  function GetRacesInfo() {
    axios.get(`https://ergast.com/api/f1/${year}.json`).then(response => {
      setRaces(response.data.MRData.RaceTable.Races);
    }).catch(ex => {
      console.log(ex);
    });
  }

  function GetNextRace() {
    for (let race in races) {
      if (new Date(races[race].date) > new Date().setHours(new Date().getHours() + 3)) {
        setNextRace(races[race]);
        document.getElementById(`${races[race].Circuit.circuitId}-raceInfoCard`).scrollIntoView();
        break;
      }
    }
  }

  function GetRaceStatus(race) {
    if (new Date(race.date) > new Date().setHours(new Date().getHours() + 3)) {
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
      <ToggleColorMode>
        <CssBaseline />
        <ApplicationBar nextRace={nextRace} />
        <Container fixed>
          <Grid container spacing={3}>
            {races.map((race) =>
              <Grid id={`${race.Circuit.circuitId}-raceInfoCard`} key={race.Circuit.circuitId} item xs={12} sx={{ scrollMargin: 100 }}>
                <RaceInfoCard race={race} raceStatus={GetRaceStatus(race)} year={year} />
              </Grid>
            )}
          </Grid>
        </Container>
        <ApplicationFooter />
      </ToggleColorMode>
    </>
  );
}

export default App;
