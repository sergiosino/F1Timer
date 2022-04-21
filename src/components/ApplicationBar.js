import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Moment from 'react-moment';

export default function ApplicationBar(props) {
    const { nextRace } = props;

    const handleTimerChange = (newValue) => {
        if (newValue.charAt(0).toString() === "-") {
            document.getElementById(`nextRaceTimer`).innerText = newValue.substring(1);
        }
    }

    return (
        <>
            {console.log("nextRace", nextRace)}
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        F1 Timer
                    </Typography>
                    <Typography variant="h6" component="div">
                        {"Next race: "}
                        {nextRace &&
                            <Moment
                                id={`nextRaceTimer`}
                                onChange={handleTimerChange}
                                interval={1000}
                                date={`${nextRace.date}T${nextRace.time}`}
                                format="HH:mm:ss"
                                durationFromNow />}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ height: 85 }} />
        </>
    );
}