import { Grid, Typography, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    slider: {
        padding: theme.spacing(2),
        width: 575
    }
}));

const marks = [
    {
        value: -15,
        label: '-15',
    },
    {
        value: 0,
        label: '0',
    },
    {
        value: 15,
        label: '15',
    }
];

export default function TraitSlider({ name, onChange, defaultValue }) {

    const classes = useStyles()
    return <Grid item className={classes.slider}>
        <Typography id={name.toLowerCase + "-label"} gutterBottom>{name}</Typography>
        <Slider
            value={defaultValue}
            min={-15}
            max={15}
            step={1}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={onChange}
        />
    </Grid>
}