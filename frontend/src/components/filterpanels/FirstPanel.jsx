import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {v4} from 'uuid';
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
                {
                    props.filterKeysHistory.length > 1 ?
                        settings.filterKeyIndices[props.filterKeysHistory[props.filterKeysHistory.length-2]].map((filter, index) => {
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

