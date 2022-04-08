import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinkNewTab from './LinkNewTab';

export default function ApplicationFooter() {

    return (
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Made for fun!
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {"Copyright © "}
                <LinkNewTab underline="always" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    F1Timer
                </LinkNewTab>
                {` ${new Date().getFullYear()}.`}
            </Typography>
        </Box>
    );
}