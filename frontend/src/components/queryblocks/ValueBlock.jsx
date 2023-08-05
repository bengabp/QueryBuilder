import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { SettingsContext } from '../../contexts/SettingsContext';
import AutoCompleteSearchField from './AutocompleteField';

const DynamicValuesBlock = (props) => {
  const settings = React.useContext(SettingsContext);
  const queryProperties = JSON.parse(props.queryPropsString)
  const query = props.query
  return (
    <AutoCompleteSearchField
                queryProperties={queryProperties}
                setRequestQueries={props.setRequestQueries}
            />
  );
};


export default DynamicValuesBlock;
