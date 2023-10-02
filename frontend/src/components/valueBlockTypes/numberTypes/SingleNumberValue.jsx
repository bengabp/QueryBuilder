import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NumberValue from './NumberValue';


export default function SingleNumberValue(props){
    return (
        <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            className="elevatedValueBlock datePickerContainer"
        >
            <NumberValue isFirst={true} values={props.values} setValues={props.setValues} strKey={props.strKey}/>
        </Stack>
    );
}