import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


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

    useEffect(() => {
        if(props.values[props.strKey] === undefined){
            props.setValues(prev => {
            let current = {...prev}
            current[props.strKey] = []
            return current
        })} else {
            props.setValues(prev => {
                let current = {...prev}
                current[props.strKey] = [props.values[props.strKey]?.[0]]
                return current
        })}}, [])

    return (
        <Stack
            direction="row"
            className="elevatedValueBlock datePickerContainer"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="styledDateField"
                    value={(props.values && props.values[props.strKey] && dayjs(props.values[props.strKey])) || []}
                    onChange={(val) => {
                        const parsedDate = parseDate(val);
                        props.setValues(prev => {
                            const current = {...prev}
                            current[props.strKey][0] = parsedDate
                            return current
                          })
                    }}
                    slotProps={{
                        textField: {
                            error: false
                        }
                    }}
                />
            </LocalizationProvider>
        </Stack>
    );
}
