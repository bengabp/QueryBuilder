import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const api_uri = "http://127.0.0.1:8000";

const styles = makeStyles({
  paper: {
    maxWidth: "400px",
    maxHeight: "300px",
    overflow: "clip"
  },
});

export default function AutoCompleteSearchField(props) {
  const [suggestions, setSuggestions] = React.useState([]);

  const isSolo =
    props.optionsNoMultiSelect.includes(props.currentOption[props.strKey]) ||
    props.dType === "boolean";

  const getSuggestions = async (inputValue) => {
    if (props.optionsNoMultiSelect.includes(props.currentOption[props.strKey])) {
      setSuggestions(["true", "false"]);
    } else {
      try {
        // Replace 'your-api-endpoint' with the actual API endpoint
        const response = await fetch(
          `${api_uri}/completions?q=${inputValue}&field_path=${props.strKey}`
        );
        const data = await response.json();
        const suggestionsSet = new Set(data.completions);
        setSuggestions([...suggestionsSet]);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    }
  };

  const classes = styles();

  React.useEffect(() => {
    if(!isSolo && props.currentOption[props.strKey] === "is_blank"){props.setValues((prev) => {
      const current = { ...prev };
      current[props.strKey] = [];
      return current;
    });}
  }, [props.currentOption[props.strKey]]);

  return (
    <Stack
      spacing={3}
      id="valuesAutoCompleteContainer"
      direction="row"
      className={"elevatedValueBlock"}
      sx={{
        position: "relative",
      }}
    >
      <Autocomplete
        key={props.strKey}
        multiple={!isSolo}
        id="values-autocomplete"
        options={suggestions}
        autoComplete={true}
        freeSolo
        classes={{ paper: classes.paper }}
        // defaultValue={[]}
        disablePortal={true}
        componentsProps={{
          popper: {
            modifiers: [
              {
                name: "flip",
                enabled: false,
              },
              {
                name: "preventOverflow",
                enabled: false,
              },
            ],
          },
        }}
        value={
          (!isSolo
            ? props.values !== undefined && props.values[props.strKey]
            : props.values !== undefined && props.values[props.strKey]?.[0]) ||
          []
        }
        getOptionDisabled={(option) =>
          props.values !== undefined &&
          props.values[props.strKey]?.includes(option)
        }
        getOptionLabel={(option) => {
          return typeof option === "string" && option.length > 0 ? option : "";
        }}
        isOptionEqualToValue={(option, value) =>
          typeof option === "string" && typeof value === "string"
            ? option.toLowerCase() === value.toLowerCase()
            : false
        }
        onFocus={() => {
          getSuggestions("");
        }}
        fullWidth={false}
        onChange={(event, selectedSugs, reason) => {
          // Update values and queryPropsString
          if (selectedSugs == null) {
            selectedSugs = [];
          } else if (typeof selectedSugs === "string") {
            selectedSugs = [selectedSugs];
          } else if (typeof selectedSugs === "object") {
            selectedSugs = [...selectedSugs];
          }

          props.setValues((prev) => {
            const current = { ...prev };
            current[props.strKey] = selectedSugs;
            return current;
          });
        }}
        renderInput={(params) => (
          <Box id="autoCompleteTextFieldContainer">
            <TextField key={params.toString()} {...params} variant="standard" placeholder="Type.." />
          </Box>
        )}
        renderTags={(value, getTagProps) => (
          <Box id="autoCompleteChipsContainer" key={value.toString()}>
            {value.map((option, index) => (
              <Chip
                variant="filled"
                key={`${index}-${option}`}
                label={option}
                {...getTagProps(index)}
                sx={{
                  padding: "0 8px",
                  "& .MuiChip-label": {
                    overflow: "visible",
                  },
                }}
              />
            ))}
          </Box>
        )}
        sx={{
          height: "10px",
          width: "max-content",
          minWidth: "300px",
          borderBottomColor: "#808080a1",
          paddingLeft: "10px",
        }}
      />
    </Stack>
  );
}
