import React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import {v4} from 'uuid';
import FilterBlock from '../filterblocks/FilterBlock';
import { SettingsContext } from '../../contexts/SettingsContext';

export default function SecondPanel(props){
    const settings = React.useContext(SettingsContext);
    const onFilterBlockClicked = (filter) => {
        props.setFilterKeysHistory((current) => {
            const currentCopy = [...current];
            currentCopy.push(filter);
            return currentCopy;
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
                    settings.filters[props.filterKeysHistory[props.filterKeysHistory.length-1]].map((filter, index) => {
                        return <FilterBlock 
                            text={filter.text}
                            key={v4()}
                            hasNextIcon={filter.nextFilterKey !== undefined}
                            onClick={() => {
                                filter.nextFilterKey !== undefined ?
                                onFilterBlockClicked(filter.nextFilterKey):
                                props.onNewFilter(filter, 2)
                            }}
                        />
                    })
                }
            </Stack>
        </Grid>
    );
}