import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Typography, InputLabel, Select, FormControl, Button, TextField, MenuItem, CssBaseline, ButtonGroup, Box, Chip } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        minWidth: 120,
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


export default function NewCampaign() {

    const classes = useStyles()
    const [bases, setBases] = useState([])
    const [templates, setTemplates] = useState([])
    const [campaignName, setCampaignName] = useState("")
    const [newCampaignBaseId, setCampaignBaseId] = useState(null)
    const [newCampaignTemplates, setNewCampaignTemplates] = useState([])

    const fetch = () => Promise.all([axios.get("http://localhost:9999/api/userBases"), axios.get("http://localhost:9999/api/templates")])
        .then(responses => {
            setBases(responses[0].data)
            setTemplates(responses[1].data)
        })

    useEffect(fetch, [])

    const handleTemplates = (event) => {
        setNewCampaignTemplates(event.target.value);
    }
    const handleBase = (event) => {
        setCampaignBaseId(event.target.value);
    }
    const handleCampaignName = (event) => {
        setCampaignName(event.target.value);
    }

    const createCampaign = () => {
        const templateIds = Array.from(newCampaignTemplates).map(el => el.id)
        axios.post("http://localhost:9999/api/campaigns", { name: campaignName, baseId: newCampaignBaseId, templateIds: templateIds})
        .then(response => console.log(response))
    }

    return (
        <Box>
            < CssBaseline />
            <Typography component="h2">Crear Campaña</Typography>
            <TextField id="campaignName" className={classes.textField} onChange={handleCampaignName} label="nombre" />
            <FormControl className={classes.formControl} >
                <InputLabel id="create-campaign-base-select">Base de usuarios</InputLabel>
                <Select
                    labelId="create-campaign-base-select"
                    id="create-campaign-base-select"
                    onChange={handleBase}
                    className={classes.textField}>
                    {_.map(bases, base => <MenuItem key={base.id} value={base.id}>{base.name}</MenuItem>)}
                </Select>
            </FormControl >
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Templates</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={newCampaignTemplates}
                    onChange={handleTemplates}
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
            <ButtonGroup className={classes.textField}>
                <Button variant='contained' onClick={createCampaign} color='secondary'>Crear</Button>
            </ButtonGroup>
        </Box >
    );
}