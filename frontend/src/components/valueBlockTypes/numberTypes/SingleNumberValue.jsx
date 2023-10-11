import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


export default function SingleNumberValue(props){
    useEffect(() => {
        props.setValues(prev => {
            const current = {...prev}
            if(isNaN(props.values[props.strKey]?.[0])){
                current[props.strKey] = []
            } else {
                current[props.strKey] = [props.values[props.strKey]?.[0]]
            }
            return current
        })
    }, [props.values[props.strKey]?.[0]])
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
                placeholder="Number (eg. 8)"
                className="styledNumberField"
                size="small"
                value={(props.value && props.value[props.strKey] && props.value[props.strKey][0])}
                onChange={e => {
                    const value = parseInt(e.target.value)
                    props.setValues(prev => {
                        const current = {...prev}
                        current[props.strKey][0] = value
                        return current
                    })
                }}
            />
        </Stack>
    );
}