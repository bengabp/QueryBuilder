import React from 'react';
import * as Material from '@mui/material';

import FiltersDialog from './FiltersDialog';
import AddFilterButton from './AddFilterButton';
import { filters } from '../constants/filters';


export default function QueryBuilder(props) {

  const [filtersDialogIsOpen, setFiltersDialogIsOpen] = React.useState(false);
  let [currentFilterKey, setCurrentFilterKey] = React.useState("Basic Info");
  let [currentFirstPanelFilters, setFirstPanelFilters] = React.useState(filters);
  let [currentSecondPanelFilters, setSecondPanelFilters] = React.useState(currentFirstPanelFilters[currentFilterKey]);
  
  const [filterBreadCrumbs, setFilterBreadCrumbs] = React.useState([currentFilterKey]);
  let [queries, setQueries] = React.useState([]);

  /// Implement breadcrumb tracking and moving back to previous page.

  const onFilterSelect = (selected) => {
    // Fires when the user selects a filter.
    setFiltersDialogIsOpen(false); // Close dialog
    console.log(currentFilterKey);
    console.log(selected)
    queries.push(`${currentFilterKey}-${selected}`)
    console.log(queries);
    setQueries(queries);

  }

  return (
    <Material.Stack>
      <Material.Container>
        <AddFilterButton
          filteresDialogIsOpen={filtersDialogIsOpen}
          setFiltersDialogIsOpen={setFiltersDialogIsOpen}
        />
      </Material.Container>
      {queries.map((query, index) => {
        return <Material.Button key={index}>{query}</Material.Button>
      })}
      <FiltersDialog
        filters={filters}
        setFiltersDialogIsOpen={setFiltersDialogIsOpen}
        filtersDialogIsOpen={filtersDialogIsOpen}

        currentFilterKey={currentFilterKey}
        currentFirstPanelFilters={currentFirstPanelFilters}
        currentSecondPanelFilters={currentSecondPanelFilters}

        setCurrentFilterKey={setCurrentFilterKey}
        setFirstPanelFilters={setFirstPanelFilters}
        setSecondPanelFilters={setSecondPanelFilters}

        filterBreadCrumbs={filterBreadCrumbs}
        setFilterBreadCrumbs={setFilterBreadCrumbs}

        onFilterSelect={onFilterSelect}
      ></FiltersDialog>
    </Material.Stack>
  );
}
