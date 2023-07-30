import React from 'react';
import Stack from '@mui/material/Stack';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import { filters, parentFilters, filterKeyIndices } from '../constants/filters';

import TitleBlock from './queryblocks/TitleBlock';
import LastBlock from './queryblocks/LastBlock';


const QueryBlock  = (props) => {
    return(
        <Stack direction="column" spacing={1}
            sx={{
                borderLeft:"2px solid grey",
                margin:'0'
            }}
            className="nestedQueryBlock"
        >
            {
                Object.keys(props.queryObjects).map((query, index) => {
                    if (typeof props.queryObjects[query] === "object" && props.queryObjects[query] !== null){
                        return <Stack 
                                direction="row"
                                sx={{
                                    alignItems:"flex-start",
                                    justifyContent:"flex-start",
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