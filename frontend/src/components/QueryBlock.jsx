import React from 'react';
import { Stack, Container, Typography, TextField } from '@mui/material';
import TitleBlock from './queryblocks/TitleBlock';
import OptionBlock from './queryblocks/OptionBlock';


const QueryBlock  = (props) => {
    let [queries, setQueries] = React.useState([]);

    const options = [
        "equals",
        "does not include",
        "is blank",
        "includes all",
        "includes any",
        "does not include any",
        "starts from"
    ]

    return (
        <Stack direction="row" spacing={2}>
            <OptionBlock></OptionBlock>
            {queries.map((queryBlock, index) => {
                if (queryBlock.type === "firstBlock"){
                    return <TitleBlock title={queryBlock.title}></TitleBlock>
                } else if (queryBlock.type === "option"){
                    return <OptionBlock options={queryBlock.options}></OptionBlock>
                }
            })}
        </Stack>
    );
}

export default QueryBlock