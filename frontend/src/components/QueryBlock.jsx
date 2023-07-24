import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import TitleBlock from './queryblocks/TitleBlock';
import OptionBlock from './queryblocks/OptionBlock';


const QueryBlock  = (props) => {
    let [queries, setQueries] = React.useState([]);

    return(
        <Stack direction="row" spacing={-.5} divider={<HorizontalRuleIcon
                htmlColor='grey'
            />}
            sx={{margin:'5px', alignItems:"center"}}
        >
            {
                props.query.path.map((query, index) => {
                    return <Button variant='contained' element="span"
                        style={{
                            textTransform:'capitalize',
                            display: 'flex',
                            justifyContent: 'space-between',
                            whiteSpace:'nowrap'
                        }}
                    >{query}</Button>
                })
            }
            <Button variant="contained"
                style={{
                    textTransform:'ca[ot',
                    display: 'flex',
                    justifyContent: 'space-between',
                    whiteSpace:'nowrap'
                }}
            >{props.query.dataKey}</Button>
        </Stack>
    );   
}

export default QueryBlock