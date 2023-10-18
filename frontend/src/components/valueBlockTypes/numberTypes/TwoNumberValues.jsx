import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function TwoNumberValues(props) {
  useEffect(() => {
    props.setValues((prev) => {
      const current = { ...prev };
      if(current[props.strKey]?.[0] === null && current[props.strKey]?.[1] === null){
        current[props.strKey] = []
      } else if((current[props.strKey] && current[props.strKey][0] !== null) || (current[props.strKey] && current[props.strKey][1] !== null)) {
        current[props.strKey] = [current[props.strKey][0], current[props.strKey][1]]
      } else {
        current[props.strKey] = new Array(2)
      }
      return current;
    });
  }, [props.values[props.strKey]?.[0], props.values[props.strKey]?.[1]]);

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
        placeholder="Number (eg. 8)"
        className="styledNumberField"
        size="small"
        value={
          (props.values &&
          props.values[props.strKey] &&
          props.values[props.strKey][0])
        }
        onChange={(e) => {
          let value;
          if (e.target.value) {
            value = parseInt(e.target.value);
          } else {
            value = null;
          }
          props.setValues((prev) => {
            const current = { ...prev };
            current[props.strKey][1] ? current[props.strKey][0] = value : current[props.strKey] = [value, null]            
            return current;
          });
        }}
      />
      <Typography>and</Typography>
      <TextField
        required
        type="number"
        placeholder="Number (eg. 8)"
        className="styledNumberField"
        size="small"
        value={
          props.values &&
          props.values[props.strKey] &&
          props.values[props.strKey][1]
        }
        onChange={(e) => {
          let value;
          if (e.target.value) {
            value = parseInt(e.target.value);
          } else {
            value = null;
          }
          props.setValues((prev) => {
            const current = { ...prev };
            current[props.strKey][0] ? current[props.strKey][1] = value : current[props.strKey] = [null, value]
            return current;
          });
        }}
      />
    </Stack>
  );
}
