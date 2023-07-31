import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import { filters, parentFilters, filterKeyIndices } from '../constants/filters';

import TitleBlock from './queryblocks/TitleBlock';
import LastBlock from './queryblocks/LastBlock';



const classNames = {
    titleBlockNotFirst:"titleBlockNotFirst",
    titleBlockFirst:"titleBlockFirst",
    lastBlockNotFirst:"lastBlockNotFirst",
    lastBlockFirst:"lastBlockFirst"
}


const QueryBlock  = (props) => {
    return(
        <Stack direction="column" spacing={1}
            sx={{
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
                                    <TitleBlock 
                                        text={query} 
                                        blockClassName={classNames.titleBlockFirst} 
                                        key={index}
                                        requestQueries={props.requestQueries}
                                    setRequestQueries={props.setRequestQueries}
                                    />
                                    : 
                                    <TitleBlock 
                                        text={query} 
                                        blockClassName={classNames.titleBlockNotFirst} 
                                        index={ index } 
                                        key={index}
                                        requestQueries={props.requestQueries}
                                        setRequestQueries={props.setRequestQueries} 
                                    />
                                }
                                
                                <QueryBlock
                                    queryObjects={props.queryObjects[query]}
                                    key={index}
                                    requestQueries={props.requestQueries}
                                    setRequestQueries={props.setRequestQueries}
                                ></QueryBlock>
                        </Stack>
                    } else {
                        return <Stack 
                            direction="row"
                        >
                            {
                                props.parent != undefined ?
                                <LastBlock 
                                    text={query} 
                                    blockClassName={classNames.lastBlockFirst} 
                                    index={index} 
                                    key={index} 
                                    requestQueries={props.requestQueries}
                                    setRequestQueries={props.setRequestQueries}
                                />
                                : 
                                <LastBlock 
                                    text={query} 
                                    blockClassName={classNames.lastBlockNotFirst} 
                                    index={index} 
                                    key={index} 
                                    requestQueries={props.requestQueries}
                                    setRequestQueries={props.setRequestQueries}
                                />
                            }
                        </Stack>
                    }

                })
            }
        </Stack>
    );   
}

export default QueryBlock