import React from 'react';
import {MenuItem, Menu, Button} from '@mui/material';

export default function OptionBlock (props) {
    const [menuState, setMenuState] = React.useState("");

    const toggleMenuState = (event) => {
        setMenuState(event.currentTarget);
    }

    const onOptionSelect = (option) => {
        closeMenu()
        props.setCurrentOptions(prev => {
            const current = {...prev}
            current[props.strKey] = option
            return current
        })
    }
    
    const closeMenu = () => {
        setMenuState("");
    }

    const refineOptionText = (textWithUnderscores) =>{
        return textWithUnderscores?.replaceAll("_", " ")
    }

    React.useEffect(() => {
        props.setCurrentOptions(prev => {
            const current = {...prev}
            current[props.strKey] = props.options[0]
            return current
        })
    }, [])

    return (
        <div>
            <Button 
                id="open-menu-btn"
                onClick={toggleMenuState}
            >
                {refineOptionText(props.currentOptions[props.strKey])}
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

