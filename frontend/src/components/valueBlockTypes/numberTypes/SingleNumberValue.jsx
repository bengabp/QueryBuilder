import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SettingsContext } from "../../../contexts/SettingsContext";


export default function SingleNumberValue(props){
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
        </Stack>
    );
}