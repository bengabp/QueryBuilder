import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {SettingsContext} from '../../contexts/SettingsContext';


export default function TwoValues(props){
    const settings = React.useContext(SettingsContext);
    
    return (
        <Stack spacing={3} 
        id="valuesAutoCompleteContainer"
        direction="row"
        >
            <TextField
                helperText="Enter a number"
            >

            </TextField>
            <Typography>and</Typography>
            <TextField
                helperText="Enter a number"
            >

            </TextField>
        </Stack>
    );
}