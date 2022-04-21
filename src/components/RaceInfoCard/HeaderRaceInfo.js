import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import LinkNewTab from '../LinkNewTab';
import MomentLocal from '../MomentLocal';
import { raceStatusEnum } from "../../constants/Enums";

export default function HeaderRaceInfo(props) {
    const { race, raceStatus } = props;

    return (
        <Grid item container xs={12} spacing={1}>
            <Grid item xs={12} sm={6} lg={8}>
                <Grid item container xs={12} alignItems="center">
                    <LinkNewTab href={race.url} variant="h5">
                        {race.raceName}
                    </LinkNewTab>
                    {raceStatus === raceStatusEnum.past && <CheckCircleIcon sx={{ color: "darkgreen" }} fontSize="small" />}
                    {raceStatus === raceStatusEnum.next && <SportsScoreIcon />}
                </Grid>
                <Typography variant="subtitle1" component="div">
                    Race date: <MomentLocal date={race.date} time={race.time} />
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
                <Typography variant="body2">
                    Country: {race.Circuit?.Location?.country}
                </Typography>
                <Typography variant="body2">
                    Locality: {race.Circuit?.Location?.locality}
                </Typography>
                <Typography variant="body2">
                    Circuit name: <LinkNewTab href={race.Circuit?.url}>{race.Circuit.circuitName}</LinkNewTab>
                </Typography>
            </Grid>
        </Grid>
    );
}