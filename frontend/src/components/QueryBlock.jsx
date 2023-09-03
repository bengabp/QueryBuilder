import React from 'react';
import Stack from '@mui/material/Stack';
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
                Object.keys(props.queries).map((query, index) => {
                    if (typeof props.queries[query] === "object" && props.queries[query] !== null){
                        return <Stack
                            direction="row"
                            key={index}
                            sx={{
                                alignItems:"flex-start",
                                justifyContent:"flex-start",
                                gap:"15px"
                            }}
                        >
                            <TitleBlock
                                text={query}
                                blockClassName={props.parent !== undefined ? classNames.titleBlockFirst : classNames.titleBlockNotFirst}
                                key={props.parent !== undefined ? index+classNames.titleBlockFirst : index+classNames.titleBlockNotFirst}
                                queryCurrentOptions={props.queryCurrentOptions}
                                queryValues={props.queryValues}
                                setQueryCurrentOptions={props.setQueryCurrentOptions}
                                setQueryValues={props.setQueryValues}
                            />

                            <QueryBlock
                                queries={props.queries[query]}
                                key={index+1}
                                queryCurrentOptions={props.queryCurrentOptions}
                                queryValues={props.queryValues}
                                setQueryCurrentOptions={props.setQueryCurrentOptions}
                                setQueryValues={props.setQueryValues}
                            ></QueryBlock>
                        </Stack>
                    } else {
                        return <Stack
                            direction="row"
                            key={index}
                        >
                            <LastBlock
                                text={query}
                                blockClassName={props.parent !== undefined ? classNames.lastBlockFirst:classNames.lastBlockNotFirst}
                                index={index}
                                properties={props.queries[query]}
                                key={index}
                                queryCurrentOptions={props.queryCurrentOptions}
                                queryValues={props.queryValues}
                                setQueryCurrentOptions={props.setQueryCurrentOptions}
                                setQueryValues={props.setQueryValues}
                            />
                        </Stack>
                    }

                })
            }
        </Stack>
    );
}

export default QueryBlock