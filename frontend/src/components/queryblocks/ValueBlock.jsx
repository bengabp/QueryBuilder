import React from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';


// export default function ValueBlock(props){
//     return (
//         <Box>
//             <TextField className="valueField">
//                 Some value
//             </TextField>
//         </Box>
//     );
// }

import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const MyAutocompleteTextField = ({ options }) => {
  const [value, setValue] = React.useState('');
  const [selectedChips, setSelectedChips] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelect = (event, newValue) => {
    setValue('');
    setSelectedChips((prevSelectedChips) => [...prevSelectedChips, newValue]);
  };

  const handleDelete = (chipToDelete) => () => {
    setSelectedChips((prevSelectedChips) =>
      prevSelectedChips.filter((chip) => chip !== chipToDelete)
    );
  };

  const isTextType = () => {
    // Replace this condition with your logic to determine the type
    // If the type is "text", return true; otherwise, return false.
    return true;
  };

  return (
    <div>
      <Autocomplete
        freeSolo
        options={options}
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        getOptionLabel={(option) => option}
        filterOptions={(x) => x}
        sx={{
            height:'40px',
            overflow:'hidden',
            borderBottom:'2px solid grey',
            width:'300px',
            outline:'none'
        }}
        renderInput={(params) => (
          <TextField
          style={{height:'40px', outline:'none'}}
            {...params}
            fullWidth
            label="Start typing ..."
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isTextType() && selectedChips.map((chip) => (
                    <Chip
                      key={chip}
                      label={chip}
                      onDelete={handleDelete(chip)}
                      style={{ marginRight: 4 }}
                    />
                  ))}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default MyAutocompleteTextField;
