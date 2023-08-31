import React from 'react';
import TextField from '@mui/material/TextField';

export default function NumberValue(props){
    // props.isFirst is a property that specifies weather it's the first otherwise second
    const textValue = props.isFirst ? props.values[0] : props.values[1];

    return (
        <TextField
            required
            type="number"
            placeholder="Number (eg. 8)"
            className="styledNumberField"
            size="small"
            value={textValue == undefined ? "": textValue}
            onChange={(event) => {
                let val = parseInt(event.target.value)
                if (!isNaN(val)){
                    props.setValues((current) => {
                        const prev = [...current]
                        prev[props.isFirst ? 0 : 1] = val
                        return prev
                    })
                } else {
                    if (props.values[!props.isFirst ? 0 : 1] == undefined){
                        props.setValues([])
                    } else {
                        props.setValues((current) => {
                            const prev = [...current]
                            prev[props.isFirst ? 0 : 1] = null
                            return prev
                        })
                    }
                }

            }}
        />
    );
}