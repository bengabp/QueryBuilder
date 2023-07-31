import React from 'react';
import {MenuItem, Menu, Button} from '@mui/material';


export default function OptionBlock (props) {
    const [menuState, setMenuState] = React.useState(null);

    const toggleMenuState = (event) => {
        setMenuState(event.currentTarget);
    }

    const onOptionSelect = (option) => {
        console.log(option)
        closeMenu()
    }
    
    const closeMenu = () => {
        setMenuState(null);
    }

    return (
        <div>
            <Button 
                id="open-menu-btn"
                onClick={toggleMenuState}
            >
                {props.options[0]}
            </Button>
            <Menu
                open = {Boolean(menuState)}
                onClose={closeMenu}
                anchorEl={menuState}
                className="queryOptionMenu"
            >
                {props.options.map((menuOption, index) => {
                    return <MenuItem 
                            key={index}
                            className="queryOptionItem"
                            onClick={() => onOptionSelect(menuOption)}
                        >
                        {menuOption}</MenuItem>
                })}
            </Menu>
        </div>
    )
}

