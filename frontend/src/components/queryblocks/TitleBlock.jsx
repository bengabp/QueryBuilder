import React, {
    useState
} from 'react';
import { Button } from '@mui/material';



const TitleBlock = (props) => {
    let [count, setCount] = useState(0);

    let openFiltersDialog = (event) => {
        count += 1;
        setCount(count);
    }

    return (
        <div>
            <Button 
                onClick={openFiltersDialog}
                variant='contained'
                color='primary'
            >{props.title}</Button>
        </div>
    )
}

export default TitleBlock