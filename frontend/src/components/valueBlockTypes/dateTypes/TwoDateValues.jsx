import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SettingsContext } from "../../../contexts/SettingsContext";


export default function TwoDateValues(props){
    return (
        <Box className="elevatedValueBlock">
            <TextField
                required
                type="text"
                variant="filled"
                label="Enter a date (eg. 5/6/2023)"
            >

            </TextField>
        </Box>
    );
}