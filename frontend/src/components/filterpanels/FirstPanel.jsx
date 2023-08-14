import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import FilterBlock from '../filterblocks/FilterBlock';
import { SettingsContext } from '../../contexts/SettingsContext';

export default function FirstPanel(props){
    const settings = React.useContext(SettingsContext);

    const onFilterBlockClicked = (filter) => {

        props.setFilterKeysHistory((current) => {
            const currentCopy = [...current]
            currentCopy[current.length-1] = filter;
            return currentCopy
        });
    }

    return (
        <Grid item xs={6}>

            <Stack 
                sx={{
                    height: '300px',
                    overflowY: 'auto'
                }} 
                direction="column"
                alignItems="stretch"
            >
                {console.log(props.filterKeysHistory)}
                {
                    props.filterKeysHistory.length > 1 ?
                        settings.filters[props.filterKeysHistory[props.filterKeysHistory.length-2]].map((filter, index) => {
                            // console.log("PROP => ", filter.text, filter)
                            return <FilterBlock 
                                text={filter.text}
                                key={index}
                                hasNextIcon={filter.nextFilterKey !== undefined}
                                onClick={() => {
                                    filter.nextFilterKey !== undefined ?
                                    onFilterBlockClicked(filter.nextFilterKey):
                                    props.onNewFilter(filter, 1)
                                }}
                            />
                        })
                    :
                        settings.parentFilters.map((parentFilter, index) => {
                            return <FilterBlock
                                hasNextIcon={true}
                                key={index}
                                onClick={() => {onFilterBlockClicked(parentFilter)}}
                                text={settings.filterKeyIndices[parentFilter][0]}
                            />
                        })
                }
            </Stack>
        </Grid>
    );
}

