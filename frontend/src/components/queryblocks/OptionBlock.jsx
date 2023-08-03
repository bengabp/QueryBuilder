import React from 'react';
import {MenuItem, Menu, Button} from '@mui/material';

export default function OptionBlock (props) {
    const [menuState, setMenuState] = React.useState(null);
    const [selectedOption, setSelectedOption] = React.useState(props.options[0]);

    const toggleMenuState = (event) => {
        setMenuState(event.currentTarget);
    }

    const onOptionSelect = (option) => {
        closeMenu()
        setSelectedOption(option)
        props.onOptionSelect(option);
    }
    
    const closeMenu = () => {
        setMenuState(null);
    }

    const refineOptionText = (textWithUnderscores) =>{
        return textWithUnderscores.replaceAll("_", " ")
    }

    return (
        <div>
            <Button 
                id="open-menu-btn"
                onClick={toggleMenuState}
            >
                {refineOptionText(selectedOption)}
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
                            onClick={() => onOptionSelect(menuOption.replaceAll(" ","_"))}
                        >
                        {refineOptionText(menuOption)}</MenuItem>
                })}
            </Menu>
        </div>
    )
}

