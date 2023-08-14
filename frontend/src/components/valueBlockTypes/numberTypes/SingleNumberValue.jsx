import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SettingsContext } from "../../../contexts/SettingsContext";


export default function SingleNumberValue(props){
    return (
        <Box className="elevatedValueBlock">
            <TextField
                required
                type="number"
                variant="filled"
                label="Enter a number (eg. 80)"
            >

            </TextField>
        </Box>
    );
}