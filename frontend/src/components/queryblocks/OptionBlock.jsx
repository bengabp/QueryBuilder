import React from 'react';
import {MenuItem, Menu, Button} from '@mui/material';


const OptionBlock = (props) => {
    const [option, setOption] = React.useState("equals");
    let [open, setMenuState] = React.useState(false);

    const onOptionSelected = (event) => {
        setMenuState(false);
        setOption(event.target.value);
    }

    return (
        <div>
            <Button onClick={(event) => {
                open = ! open;
                setMenuState(open);
            }}>
                {option}
            </Button>
            <Menu
                anchorEl = {option}
                open = {open}
                onchange = {onOptionSelected}
            >
                {props.options.map((menuOption, index) => {
                    return <MenuItem onClick={onOptionSelected}>{menuOption}</MenuItem>
                })}
            </Menu>
        </div>
    )
}

export default OptionBlock