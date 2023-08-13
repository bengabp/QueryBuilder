import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import {v4} from 'uuid';
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
                                key={index}
                                sx={{
                                    alignItems:"flex-start",
                                    justifyContent:"flex-start",
                                    gap:"15px"
                                }}
                            >
                                {
                                    props.parent != undefined ? 
                                    <TitleBlock 
                                        text={query} 
                                        blockClassName={classNames.titleBlockFirst} 
                                        key={index+classNames.titleBlockFirst}
                                        requestQueries={props.requestQueries}
                                    setRequestQueries={props.setRequestQueries}
                                    />
                                    : 
                                    <TitleBlock 
                                        text={query} 
                                        blockClassName={classNames.titleBlockNotFirst} 
                                        index={ index } 
                                        key={index+classNames.titleBlockNotFirst}
                                        requestQueries={props.requestQueries}
                                        setRequestQueries={props.setRequestQueries} 
                                    />
                                }
                                
                                <QueryBlock
                                    queryObjects={props.queryObjects[query]}
                                    key={index+1}
                                    requestQueries={props.requestQueries}
                                    setRequestQueries={props.setRequestQueries}
                                ></QueryBlock>
                        </Stack>
                    } else {
                        return <Stack 
                            direction="row"
                            key={index}
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