import React from 'react';
import * as Material from '@mui/material';

import FiltersDialog from './FiltersDialog';
import AddFilterButton from './AddFilterButton';


export default function QueryBuilder(props) {

  const [filtersDialogState, toggleFiltersDialog] = React.useState(false);
  const [filterKeysHistory, setFilterKeysHistory] = React.useState(["basic_info"]);
  
  const onNewFilter = (filter, panelN) => {
    let filtersArray = [...filterKeysHistory]
    if (panelN === 1){
      filtersArray.pop();
    }
    console.log(`New Filter => ${filtersArray}/${filter.text}`)
  }

  const onNavBlockClicked = () => {
    setFilterKeysHistory((current) => {
      if (current.length > 1){
        const currentCopy = [...current];
        currentCopy.pop();
        return currentCopy;
      } else {
        return current
      }
      
    })
  }

  // React.useEffect(() => {
  //   console.log("New value => ",filterKeysHistory);
  // }, [filterKeysHistory])
  return (
    <Material.Stack>
      <Material.Container>
        <AddFilterButton // Open Dialog to add new companies filter
          toggleFiltersDialog={toggleFiltersDialog}
        />
      </Material.Container>
      <FiltersDialog
        toggleFiltersDialog={toggleFiltersDialog}
        filtersDialogState={filtersDialogState}

        filterKeysHistory={filterKeysHistory}
        setFilterKeysHistory={setFilterKeysHistory}
        onNewFilter={onNewFilter}
        onNavBlockClicked={onNavBlockClicked}
      ></FiltersDialog>
    </Material.Stack>
  );
}
