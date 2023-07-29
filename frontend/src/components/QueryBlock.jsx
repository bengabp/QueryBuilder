import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import { filters, parentFilters, filterKeyIndices } from '../constants/filters';

import TitleBlock from './queryblocks/TitleBlock';
import OptionBlock from './queryblocks/OptionBlock';
import SubQueryBlock from './queryblocks/SubQueryBlock.';
import LastBlock from './queryblocks/LastBlock';


const QueryBlock  = (props) => {

    return(
        <Stack direction="column" spacing={1}
            sx={{
                marginBottom:'3px',
                backgroundColor:"whitesmoke",
                margin:'0',
                justifyItems:"center",
            }}
        >
            {
                Object.keys(props.queryObjects).map((query, index) => {
                    if (typeof props.queryObjects[query] === "object" && props.queryObjects[query] !== null){
                        return <Stack 
                                direction="row"
                                sx={{
                                    alignItems:"flex-start",
                                    gap:"30px"
                                }}
                            >
                                {
                                    props.parent != undefined ? 
                                    <TitleBlock text={query} addLeftLine={true} position={index} />
                                    : <TitleBlock text={query} />
                                }
                                <QueryBlock
                                    queryObjects={props.queryObjects[query]}
                                    key={index}
                                ></QueryBlock>
                        </Stack>
                    } else {
                        return <Stack 
                        direction="row"
                        divider={<HorizontalRuleIcon
                            htmlColor='grey'
                        />}
                        >
                            <LastBlock text={query} />
                        </Stack>
                    }

                })
            }
        </Stack>
    );   
}

export default QueryBlock