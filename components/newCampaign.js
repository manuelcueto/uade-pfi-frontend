import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Typography, InputLabel, Select, FormControl, Button, TextField, MenuItem, CssBaseline, Card, Grid, Chip, CardActions, CardContent } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        paddingTop: theme.spacing(1),
        minWidth: 240,
    },
    cardActions: {
        margin: theme.spacing(3),
        paddingTop: theme.spacing(1),
        minWidth: 240,
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
}));


export default function NewCampaign({setLoading, showAlert}) {

    const classes = useStyles()
    const [bases, setBases] = useState([])
    const [templates, setTemplates] = useState([])
    const [campaignName, setCampaignName] = useState("")
    const [newCampaignBaseId, setCampaignBaseId] = useState('')
    const [newCampaignTemplates, setNewCampaignTemplates] = useState([])


    useEffect(() => {
        let fetch = Promise.all([axios.get("http://localhost:9999/api/userBases"), axios.get("http://localhost:9999/api/templates")])
            .then(responses => {
                setBases(responses[0].data)
                setTemplates(responses[1].data)
            })
    }, [])

    const createCampaign = () => {
        const templateIds = Array.from(newCampaignTemplates).map(el => el.id)
        setLoading(true)
        axios.post("http://localhost:9999/api/campaigns", { name: campaignName, baseId: newCampaignBaseId, templateIds: templateIds })
            .then(response => {
                setLoading(false)
                showAlert("success", "Exito al crear la Campaña")
            }, error => {
                setLoading(false)
                showAlert("error", "Hubo un error al crear la Campaña")
            })
    }

    return (
        <Card>
            <CardContent>
                < CssBaseline />
                <Typography component="h6" color="primary">Crear Campaña</Typography>
                <Grid container>
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField id="campaignName" className={classes.textField} onChange={ev => setCampaignName(ev.target.value)} label="nombre" />
                        </FormControl>
                    </Grid>
                    <Grid item>

                        <FormControl  className={classes.formControl}>
                            <InputLabel id="create-campaign-base-select">Base de usuarios</InputLabel>
                            <Select
                                labelId="create-campaign-base-select"
                                id="create-campaign-base-select"
                                value={newCampaignBaseId}
                                onChange={ev => setCampaignBaseId(ev.target.value)}
                                className={classes.textField}>
                                {bases.map(base => <MenuItem key={base.id} value={base.id}>{base.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-mutiple-chip-label">Templates</InputLabel>
                            <Select
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                multiple
                                value={newCampaignTemplates}
                                onChange={ev => setNewCampaignTemplates(ev.target.value)}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value.id} label={value.name} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                            >
                                {templates.map((name) => (
                                    <MenuItem key={name.id} value={name} >
                                        {name.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Grid container justify="flex-end">
                    <Button size="small" variant='contained' onClick={createCampaign} color='secondary'>Crear</Button>
                </Grid>
            </CardActions>
        </Card >
    );
}