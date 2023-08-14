import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { SettingsContext } from "../../../contexts/SettingsContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function TwoDateValues(props){
    return (
        <Stack
            direction="row"
            alignItems="center"
            className="elevatedValueBlock datePickerContainer"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="styledDateField"
                    onChange={(val) => {console.log("Date => ", val)}}                />
            </LocalizationProvider>
            <Typography>and</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="styledDateField"
                    onChange={(val) => {console.log("Date => ", val)}}                />
            </LocalizationProvider>
        </Stack>
    );
}