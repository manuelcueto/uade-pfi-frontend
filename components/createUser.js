import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, InputLabel, Select, FormControl, Button, TextField, MenuItem, Slider, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    formControl: {
        padding: theme.spacing(2),
        width: 300,
    },
    textField: {
        minWidth: 240,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    slider: {
        padding: theme.spacing(2),
        width: 575
    },
    paper: {
        padding: theme.spacing(2)
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


export default function NewUser(props) {

    const classes = useStyles()
    const [name, _setName] = useState('')
    const [baseId, setBaseId] = useState('')
    const [bases, setBases] = useState([])
    const [sex, _setSex] = useState('')
    const [handedness, _setHandedness] = useState('left')
    const [email, _setEmail] = useState('')
    const [nationality, _setNationality] = useState('')
    const [age, _setAge] = useState(0)
    const [extraversion, _setExtraversion] = useState(0)
    const [agreeableness, _setAgreeableness] = useState(0)
    const [conscientiousness, _setConscientiousness] = useState(0)
    const [neuroticism, _setNeuroticism] = useState(0)
    const [openness, _setOpenness] = useState(0)
    const [validForm, setValidForm] = useState('false')


    useEffect(() => {
        axios.get("http://localhost:9999/api/userBases").then(response => {
            setBases(response.data)
        })
    }, [])

    const handleBase = (event) => {
        setBaseId(event.target.value);
    }


    const setName = ev => _setName(ev.target.value)
    const setSex = ev => _setSex(ev.target.value)
    const setHandedness = ev => _setHandedness(ev.target.value)
    const setEmail = ev => _setEmail(ev.target.value)
    const setNationality = ev => _setNationality(ev.target.value)
    const setAge = ev => _setAge(ev.target.value)
    const setExtraversion = (ev, val) => _setExtraversion(val)
    const setAgreeableness = (ev, val) => _setAgreeableness(val)
    const setConscientiousness = (ev, val) => _setConscientiousness(val)
    const setNeuroticism = (ev, val) => _setNeuroticism(val)
    const setOpenness = (ev, val) => _setOpenness(val)

    const createUser = () => {
        const b = ("base" in props) ? bases.find(base => base.name == props.base) : undefined

        const base = (b !== undefined) ? b.id : baseId
        const user = {
            name: name,
            sex: sex,
            handedness: handedness,
            email: email,
            nationality: nationality,
            age: age,
            personality: {
                extraversion: extraversion,
                agreeableness: agreeableness,
                conscientiousness: conscientiousness,
                neuroticism: neuroticism,
                openness: openness
            }
        }
        axios.post("http://localhost:9999/api/users/" + base, user)
    }

    const staticBase = (id) => {
        return id
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const baseSelect = () => {
        return <FormControl className={classes.formControl} >
            <InputLabel id="create-campaign-base-select">Base de usuarios</InputLabel>
            <Select
                labelId="create-campaign-base-select"
                id="create-campaign-base-select"
                onChange={handleBase}
                className={classes.textField}>
                {_.map(bases, base => <MenuItem key={base.id} value={base.id}>{base.name}</MenuItem>)}
            </Select>
        </FormControl >
    }
    const withUserBase = ("base" in props) ? staticBase(props.base) : baseSelect

    const validEmail = () => {
        if (email.length < 3) {
            return <TextField id="email-input" label="Email" variant="outlined" onChange={setEmail} />
        } else if (validateEmail(email)) {
            return <TextField id="email-input" label="Email" variant="outlined" onChange={setEmail} />
        } else {
            return <TextField id="email-input" error label="Email" variant="outlined" onChange={setEmail} />
        }
    }
    const submitButton = () => {
        if (validateEmail(email)) {
            return <Button variant='contained' onClick={createUser} color='secondary'>Crear</Button>
        } else {
            return <Button variant='contained' onClick={createUser} disabled color='secondary'>Crear</Button>
        }
    }
    return (
        <Grid container className={classes.root} spacing={3}>
            <Grid item xs={12}>
                <Typography color="textPrimary" component="h2">Agrega un usuario a la base {withUserBase}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <FormControl className={classes.formControl}>
                            <TextField id="name-input" label="Nombre" variant="outlined" onChange={setName} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField id="sex-input" label="Genero" variant="outlined" onChange={setSex} />
                        </FormControl>
                    </Grid>
                    <Grid container spacing={3}>
                        <FormControl className={classes.formControl}>
                            {validEmail()}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField id="nationality-input" label="Nacionalidad" variant="outlined" onChange={setNationality} />
                        </FormControl>
                    </Grid>
                    <Grid container spacing={3}>
                        <FormControl className={classes.formControl}>
                            <TextField id="age-input" label="Edad" type="number" variant="outlined" onChange={setAge} />
                        </FormControl>
                        <FormControl className={classes.formControl} variant="outlined">
                            <InputLabel id="handedness-input">Mano dominante</InputLabel>
                            <Select
                                labelId="handedness-input"
                                id="handedness-input"
                                value={handedness}
                                onChange={setHandedness}
                                label="Mano dominante">
                                <MenuItem value={"left"}>Izquierda</MenuItem>
                                <MenuItem value={"right"}>Derecha</MenuItem>
                                <MenuItem value={"ambidextrous"}>Ambas</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item className={classes.slider}>
                        <Typography id="extraversion-label" gutterBottom>Extraversion</Typography>
                        <Slider
                            defaultValue={extraversion}
                            min={-15}
                            max={15}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={setExtraversion}
                        />
                    </Grid>
                    <Grid item className={classes.slider}>
                        <Typography id="conscientiousness-label" gutterBottom>Conscientiousness</Typography>
                        <Slider
                            defaultValue={conscientiousness}
                            min={-15}
                            max={15}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={setConscientiousness}
                        />
                    </Grid>
                    <Grid item className={classes.slider}>
                        <Typography id="agreeableness-label" gutterBottom>Agreeableness</Typography>
                        <Slider
                            defaultValue={agreeableness}
                            min={-15}
                            max={15}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={setAgreeableness}
                        />
                    </Grid>
                    <Grid item className={classes.slider}>
                        <Typography id="neuroticism-label" gutterBottom>Neuroticism</Typography>
                        <Slider
                            defaultValue={neuroticism}
                            min={-15}
                            max={15}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={setNeuroticism}
                        />
                    </Grid>
                    <Grid item className={classes.slider}>
                        <Typography id="openness-label" gutterBottom>Openness</Typography>
                        <Slider
                            defaultValue={openness}
                            min={-15}
                            max={15}
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={setOpenness}
                        />
                    </Grid>
                    {submitButton()}
                </Paper>
            </Grid>
        </Grid >
    );
}