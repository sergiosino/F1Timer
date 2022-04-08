import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinkNewTab from './LinkNewTab';
import MomentLocal from './MomentLocal';

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

export default function RaceInfoCard(props) {
    const { race } = props;

    function pastRace() {
        return new Date(race.date) < new Date();
    }

    return (
        <Card style={{ borderLeft: pastRace() ? "3px solid lightgreen" : "none" }}>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={12} sm={6} lg={8}>
                            <LinkNewTab href={race.url} variant="h5">{race.raceName}</LinkNewTab>
                            <Typography variant="subtitle1" component="div">
                                Race date: <MomentLocal date={race.date} time={race.time} />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant="body2">
                                Country: {race.Circuit.Location.country}
                            </Typography>
                            <Typography variant="body2">
                                Locality: {race.Circuit.Location.locality}
                            </Typography>
                            <Typography variant="body2">
                                Circuit name: <LinkNewTab href={race.Circuit.url}>{race.Circuit.circuitName}</LinkNewTab>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={12} sm={6} md={3}>
                            <PreRaceInfoCard
                                title="First practice"
                                date={race.FirstPractice?.date}
                                time={race.FirstPractice?.time} />
                        </Grid>
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
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}