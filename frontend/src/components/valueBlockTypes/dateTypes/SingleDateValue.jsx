import React from "react";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function SingleDateValue(props){
    const parseDate = (date) => {
        let year = 1800;
        let month = 11;
        let day = 30;

        if (date !== null){
            if (!isNaN(date.$y)){
                year = date.$y;
            }
            if (!isNaN(date.$M)){
                month = date.$M;
            }
            if (!isNaN(date.$D)){
                day = date.$D
            }
        }

        return `${year}-${month+1}-${day}`;
    }

    return (
        <Stack
            direction="row"
            className="elevatedValueBlock datePickerContainer"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="styledDateField"
                    onChange={(val) => {
                        const parsedDate = parseDate(val);
                        props.setValues(prev => {
                            const current = {...prev}
                            current[props.strKey] = [parsedDate]
                            return current
                          })
                    }}
                />
            </LocalizationProvider>
        </Stack>
    );
}
