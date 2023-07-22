import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';  
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


export default function FilterBlock(props) {
    return (
        <Button
            variant="string"
            
            style={{
                textTransform:'capitalize',
                display: 'flex',
                justifyContent: 'space-between',
                whiteSpace:'nowrap'
            }}
            endIcon={props.hasNextIcon ? <NavigateNextIcon />:null}
            onClick = {() => {props.onClick(props.text)}}
        >
            <Typography>{props.text}</Typography>
        </Button>
    );
}