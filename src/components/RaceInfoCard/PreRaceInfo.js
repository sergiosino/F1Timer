import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MomentLocal from '../MomentLocal';

function PreRaceInfoCard(props) {
    const { title, date, time } = props;

    return (
        <Card>
            <CardContent style={{ paddingBottom: 16 }}>
                <Typography align="center" variant="subtitle1">{title}</Typography>
                <Divider variant="middle" />
                <Typography align="center" variant="subtitle1" component="div">
                    <MomentLocal date={date} time={time} />
                </Typography>
            </CardContent>
        </Card>
    );
}

export default function PreRaceInfo(props) {
    const { race } = props;

    function raceWithSprint() {
        return (
            <>
                <Grid item xs={12} sm={6} md={3}>
                    <PreRaceInfoCard
                        title="Qualifying"
                        date={race.Qualifying?.date}
                        time={race.Qualifying?.time} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <PreRaceInfoCard
                        title="Second practice"
                        date={race.SecondPractice?.date}
                        time={race.SecondPractice?.time} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <PreRaceInfoCard
                        title="Sprint"
                        date={race.Sprint?.date}
                        time={race.Sprint?.time} />
                </Grid>
            </>
        );
    }

    function raceWithoutSprint() {
        return (
            <>
                <Grid item xs={12} sm={6} md={3}>
                    <PreRaceInfoCard
                        title="Second practice"
                        date={race.SecondPractice?.date}
                        time={race.SecondPractice?.time} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <PreRaceInfoCard
                        title="Third practice"
                        date={race.ThirdPractice?.date}
                        time={race.ThirdPractice?.time} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <PreRaceInfoCard
                        title="Qualifying"
                        date={race.Qualifying?.date}
                        time={race.Qualifying?.time} />
                </Grid>
            </>
        );
    }

    return (
        <Grid item container xs={12} spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
                <PreRaceInfoCard
                    title="First practice"
                    date={race.FirstPractice?.date}
                    time={race.FirstPractice?.time} />
            </Grid>
            {race.Sprint ? raceWithSprint() : raceWithoutSprint()}
        </Grid>
    );
}