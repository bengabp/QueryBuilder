import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { SettingsContext } from '../../contexts/SettingsContext';
export const api_uri = "http://20.77.89.95:8080"

export default function AutoCompleteSearchField(props) {
  const optionsSingle = ["is_blank", "equals", "does_not_equal"];
  const [suggestions, setSuggestions] = React.useState([]);
  const settings = React.useContext(SettingsContext);
  const [isMulti, setIsMulti] = React.useState(!optionsSingle.includes(props.currentOption) || props.dType === "boolean");
  const getSuggestions = async (inputValue) => {
    if (optionsSingle.includes(props.currentOption)){
      setSuggestions(["true","false"])
      return
    }
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const query = [...props.queryProperties.parents, props.queryProperties.dataKey].join(".") ;

      const response = await fetch(`${api_uri}/completions?q=${inputValue}&field_path=${query}`);
      const data = await response.json();
      const suggestionsSet = new Set(data.completions);
      setSuggestions([...suggestionsSet]);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  React.useEffect(() => {
    setIsMulti(!optionsSingle.includes(props.currentOption))

  },[props.currentOption])

  console.log("Values for autocomplete :,",props.values)
  return (
    <Stack spacing={3} 
      id="valuesAutoCompleteContainer"
      direction="row"
      className={"elevatedValueBlock"}
    >
      <Autocomplete
        multiple={isMulti}
        id="values-autocomplete"
        options={suggestions}
        autoComplete={true}
        freeSolo={true}
        value={isMulti == true ? props.values : props.values[0]}
        getOptionDisabled={(option) => props.queryProperties.values.includes(option)}
        getOptionLabel={(option) => {return typeof option === "string" && option.length > 0 ? option : ""}}
        isOptionEqualToValue={(option, value) => typeof option === 'string' && typeof value === 'string' ? option.toLowerCase() === value.toLowerCase() : false}
        onFocus={() => {
          getSuggestions("")
        }}
        // value={props.values.length <= 0 ? []: isMulti ? props.values: props.values[0]}
        fullWidth={false}
        onInputChange={(event, newInputValue) => {
          getSuggestions(newInputValue);
        }}
        // value={suggestions}
        onChange={(event, selectedSugs, reason) => {
          // Update values and queryPropsString
          if (selectedSugs == null){
            selectedSugs = [];
          } else if (typeof selectedSugs === "string"){
            selectedSugs = [selectedSugs]
          } else if (typeof selectedSugs === "object"){
            selectedSugs = [...selectedSugs]
          }
          props.setValues(selectedSugs);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Value"
          />
        )}
        sx={{
            height:'10px',
            width:'max-content',
            minWidth:'300px',
            borderBottomColor:'#808080a1',
            paddingLeft:'10px'
        }}
      />
    </Stack>
  );
}
