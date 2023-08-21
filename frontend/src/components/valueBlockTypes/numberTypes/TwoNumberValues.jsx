import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { SettingsContext } from "../../../contexts/SettingsContext";

export default function TwoNumberValues(props){
    return (
        <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            className="elevatedValueBlock datePickerContainer"
        >
            <TextField
                required
                type="number"
                placeholder="Number (eg. 80)"
                className="styledNumberField"
                size="small"
                value={props.values[0]}
                onChange={(event) => {
                    let val = parseInt(event.target.value)
                    if (isNaN(val)){
                        val = 0
                    }
                    props.setValues((current) => {
                        const prev = [...current]
                        prev[0] = val
                        return prev
                    });
                }}
            />
            <Typography>and</Typography>
            <TextField
                required
                type="number"
                placeholder="Number (eg. 80)"
                className="styledNumberField"
                size="small"
                onChange={(event) => {
                    let val = parseInt(event.target.value)
                    if (isNaN(val)){
                        val = 0
                    }
                    const firstVals = []
                    if (props.values.length <= 1){
                        firstVals.push(2)
                    }
                    props.setValues((current) => {
                        const prev = [...firstVals,...current]
                        prev[1] = val
                        return prev
                    });
                }}
            />
        </Stack>
    );
}