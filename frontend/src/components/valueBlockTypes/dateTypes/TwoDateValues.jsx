import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { SettingsContext } from "../../../contexts/SettingsContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


export default function TwoDateValues(props){
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
        if(props.values[props.strKey] === undefined){props.setValues(prev => {
            const current = {...prev}
            current[props.strKey] = [null, null]
            return current
        })}
    }, [])

    return (
        <Stack
            direction="row"
            alignItems="center"
            className="elevatedValueBlock datePickerContainer"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="styledDateField"
                    value={(props.values[props.strKey] && dayjs(props.values[props.strKey][0])) || null}
                    onChange={(val) => {
                        props.setValues(prev => {
                            const current = {...prev}
                            current[props.strKey][0] = parseDate(val)
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
            <Typography>and</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="styledDateField"
                    value={(props.values && props.values[props.strKey] && dayjs(props.values[props.strKey][1])) || []}
                    onChange={(val) => {
                        // let vals = props.values;
                        // if (vals.length <= 0){
                        //     vals = ["1890-12-30"]
                        // }
                        // vals[1] = parseDate(val)
                        props.setValues(prev => {
                            const current = {...prev}
                            current[props.strKey][1] = parseDate(val)
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