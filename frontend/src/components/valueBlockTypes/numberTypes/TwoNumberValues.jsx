import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import NumberValue from "./NumberValue";

export default function TwoNumberValues(props){
    return (
        <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            className="elevatedValueBlock datePickerContainer"
        >
            <NumberValue isFirst={true} values={props.values} setValues={props.setValues} strKey={props.strKey}/>
            <Typography>and</Typography>
            <NumberValue isFirst={false} values={props.values} setValues={props.setValues} strKey={props.strKey}/>
        </Stack>
    );
}