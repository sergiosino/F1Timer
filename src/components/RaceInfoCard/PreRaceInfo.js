import * as React from 'react';
import { Typography, Card, CardContent, Divider, Grid } from '../../utils/muiImports';
import { formatDatePretty } from '../../utils/formatDate';

export default function PreRaceInfo(props) {
    const { race } = props;

    const preRaceInfoCard = (title, date, time) => {
        return (
            <Card>
                <CardContent sx={{ paddingBottom: 16 }}>
                    <Typography align="center" variant="subtitle1">{title}</Typography>
                    <Divider variant="middle" />
                    <Typography align="center" variant="subtitle1" component="div">
                        {formatDatePretty(new Date(`${date}T${time}`))}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const firstPractice = () => {
        return preRaceInfoCard("First practice", race.FirstPractice?.date, race.FirstPractice?.time);
    }

    const secondPractice = () => {
        return preRaceInfoCard("Second practice", race.SecondPractice?.date, race.SecondPractice?.time);
    }

    const thirdPractice = () => {
        return preRaceInfoCard("Third practice", race.ThirdPractice?.date, race.ThirdPractice?.time);
    }

    const qualifying = () => {
        return preRaceInfoCard("Qualifying", race.Qualifying?.date, race.Qualifying?.time);
    }

    const sprint = () => {
        return preRaceInfoCard("Sprint", race.Sprint?.date, race.Sprint?.time);
    }

    const raceWithSprint = () => {
        return (
            <>
                <Grid item xs={12} sm={6} md={3}>
                    {qualifying()}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    {secondPractice()}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    {sprint()}
                </Grid>
            </>
        );
    }

    const raceWithoutSprint = () => {
        return (
            <>
                <Grid item xs={12} sm={6} md={3}>
                    {secondPractice()}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    {thirdPractice()}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    {qualifying()}
                </Grid>
            </>
        );
    }

    return (
        <Grid item container xs={12} spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
                {firstPractice()}
            </Grid>
            {race.Sprint ? raceWithSprint() : raceWithoutSprint()}
        </Grid>
    );
}