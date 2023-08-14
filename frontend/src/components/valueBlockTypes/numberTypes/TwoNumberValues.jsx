import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { SettingsContext } from "../../../contexts/SettingsContext";

export default function TwoNumberValues(props){
    return (
        <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            className="elevatedValueBlock datePickerContainer"
        >
            <TextField
                required
                type="number"
                label="Enter a number (eg. 80)"
                className="styledNumberField"
            />
            <Typography>and</Typography>
            <TextField
                required
                type="number"
                label="Enter a number (eg. 80)"
                className="styledNumberField"
            />
        </Stack>
    );
}