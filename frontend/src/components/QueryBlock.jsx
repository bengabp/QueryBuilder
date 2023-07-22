import React from 'react';
import { Stack, Container, Typography, TextField, Button } from '@mui/material';
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
    console.log(queries)
    return(
        <Stack direction="row" spacing={2}>
            {queries.map((queryBlock, index) => {
                if (queryBlock.type === "firstBlock"){
                    return (<TitleBlock title={queryBlock.title}></TitleBlock>)
                } else if (queryBlock.type === "option"){
                    return (<OptionBlock options={queryBlock.options}></OptionBlock>)
                } else {
                    return <></>
                }
            })}
            <Button variant="contained" onClick={(event) => {
                console.log("Clicked !")
            }}>Add Companies Filter</Button>
        </Stack>
    );   
}

export default QueryBlock