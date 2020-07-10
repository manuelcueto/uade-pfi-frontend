import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, InputLabel, Select, FormControl, Button, TextField, MenuItem, Slider, Paper } from '@material-ui/core';
import TraitSlider from './slider';


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
    paper: {
        padding: theme.spacing(2)
    }
}));

export default function NewUser({base, setLoading, showAlert}) {

    const classes = useStyles()
    const [name, setName] = useState('')
    const [baseId, setBaseId] = useState('')
    const [bases, setBases] = useState([])
    const [sex, setSex] = useState('')
    const [handedness, setHandedness] = useState('left')
    const [email, setEmail] = useState('')
    const [nationality, setNationality] = useState('')
    const [age, setAge] = useState(0)
    const [extraversion, setExtraversion] = useState(0)
    const [agreeableness, setAgreeableness] = useState(0)
    const [conscientiousness, setConscientiousness] = useState(0)
    const [neuroticism, setNeuroticism] = useState(0)
    const [openness, setOpenness] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:9999/api/userBases").then(response => {
            setBases(response.data)
        })
    }, [])

    const createUser = () => {

        const b = base ? bases.find(base => base.name == base) : undefined

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
        axios.post("http://localhost:9999/api/users/" + base, user).then(response => {
            setLoading(false)
            showAlert("success", "Exito al crear usuario")
        }, error => {
            setLoading(false)
            showAlert("error", "Hubo un error al crear usuario")
        })
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
                value={baseId}
                onChange={ev => setBaseId(ev.target.value)}
                className={classes.textField}>
                {bases.map(base => <MenuItem key={base.id} value={base.id}>{base.name}</MenuItem>)}
            </Select>
        </FormControl >
    }
    const withUserBase = base ? staticBase(base) : baseSelect()

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
                            <TextField id="name-input" label="Nombre" variant="outlined" onChange={ev => setName(ev.target.value)} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField id="sex-input" label="Genero" variant="outlined" onChange={ev => setSex(ev.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid container spacing={3}>
                        <FormControl className={classes.formControl}>
                            {validEmail()}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField id="nationality-input" label="Nacionalidad" variant="outlined" onChange={ev => setNationality(ev.target.value)} />
                        </FormControl>
                    </Grid>
                    <Grid container spacing={3}>
                        <FormControl className={classes.formControl}>
                            <TextField id="age-input" label="Edad" type="number" variant="outlined" onChange={ev => setAge(ev.target.value)} />
                        </FormControl>
                        <FormControl className={classes.formControl} variant="outlined">
                            <InputLabel id="handedness-input">Mano dominante</InputLabel>
                            <Select
                                labelId="handedness-input"
                                id="handedness-input"
                                value={handedness}
                                onChange={ev => setHandedness(ev.target.value)}
                                label="Mano dominante">
                                <MenuItem value={"left"}>Izquierda</MenuItem>
                                <MenuItem value={"right"}>Derecha</MenuItem>
                                <MenuItem value={"ambidextrous"}>Ambas</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <TraitSlider name="Openness" defaultValue={openness} onChange={(ev, value) => setOpenness(value)} />
                    <TraitSlider name="Neuroticism" defaultValue={neuroticism} onChange={(ev, value) => setNeuroticism(value)} />
                    <TraitSlider name="Agreeableness" defaultValue={agreeableness} onChange={(ev, value) => setAgreeableness(value)} />
                    <TraitSlider name="Conscientiousness" defaultValue={conscientiousness} onChange={(ev, value) => setConscientiousness(value)} />
                    <TraitSlider name="Extraversion" defaultValue={extraversion} onChange={(ev, value) => setExtraversion(value)} />
                    {submitButton()}
                </Paper>
            </Grid>
        </Grid >
    );
}