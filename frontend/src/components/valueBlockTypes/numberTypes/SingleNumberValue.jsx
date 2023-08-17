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
                placeholder="Number (eg. 80)"
                className="styledNumberField"
                size="small"
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
        </Stack>
    );
}