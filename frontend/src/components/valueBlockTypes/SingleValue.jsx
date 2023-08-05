import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {SettingsContext} from '../../contexts/SettingsContext';


export default function SingleValue(props){
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
        </Stack>
    );
}