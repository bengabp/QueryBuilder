import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import FilterBlock from '../filterblocks/FilterBlock';
import { parentFilters, filterKeyIndices, filters } from '../../constants/filters';

export default function FirstPanel(props){

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
                {
                    props.filterKeysHistory.length > 1 ?
                        filters[props.filterKeysHistory[props.filterKeysHistory.length-2]].map((filter, index) => {
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
                        parentFilters.map((parentFilter, index) => {
                            return <FilterBlock
                                hasNextIcon={true}
                                key={index}
                                onClick={() => {onFilterBlockClicked(parentFilter)}}
                                text={filterKeyIndices[parentFilter][0]}
                            />
                        })
                }
            </Stack>
        </Grid>
    );
}

