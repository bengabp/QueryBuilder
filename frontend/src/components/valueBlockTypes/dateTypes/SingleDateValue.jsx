import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SettingsContext } from "../../../contexts/SettingsContext";
import TextField from '@mui/material/TextField';


export default function SingleDateValue(props){
    return (
        <Stack
            direction="row"
            className="elevatedValueBlock datePickerContainer"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="datePicker"
                    onChange={(val) => {console.log("Date => ", val)}}                />
            </LocalizationProvider>
        </Stack>
    );
}
