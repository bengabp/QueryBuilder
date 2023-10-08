import React from 'react';
import TextField from '@mui/material/TextField';

export default function NumberValue(props){
    // props.isFirst is a property that specifies weather it's the first otherwise second
    // const textValue = props.isFirst ? props.values[props.strKey][0] : props.values[props.strKey][1];
    return (
        <TextField
            required
            type="number"
            placeholder="Number (eg. 8)"
            className="styledNumberField"
            size="small"
            disabled={!props.isFirst && props.values.length <= 1}
            // value={textValue == undefined ? "": textValue}
            onChange={(event) => {
                let val = parseInt(event.target.value)
                if (!isNaN(val)){
                    // If its a number then determine if should go in first or second value -> [first, second]
                    console.log(val)
                    props.setValues(prev => {
                        let current = {...prev}
                        current[props.strKey][props.isFirst ? 0 : 1] = val
                        return current
                    })
                } else {
                    // if (props.values[props.strKey][!props.isFirst ? 0 : 1] == undefined){
                    //     props.setValues([])
                    // } else {
                    props.setValues((prev) => {
                        let current = {...prev}
                        current[props.strKey][props.isFirst ? 0 : 1] = null
                        return current
                    })
                    // }

                }

            }}
        />
    );
}