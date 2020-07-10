import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { Typography, Card, Grid, CardActions, CardContent, FormControl, Button, TextField, TextareaAutosize } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        paddingTop: theme.spacing(1),
        minWidth: 240,
    },
    multiLineArea: {
        margin: theme.spacing(3),
        paddingTop: theme.spacing(1),
        minWidth: 530,
    },
    cardActions: {
        margin: theme.spacing(3),
        paddingTop: theme.spacing(1),
        minWidth: 240,
    },
    textField: {
        minWidth: 240,
    },
}));

export default function CreateTemplate({ setLoading, showAlert }) {
    const classes = useStyles()
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')


    const createTemplate = ev => {
        setLoading(true)
        axios.post("http://localhost:9999/api/templates", { name: name, text: text, subject: subject })
            .then(response => {
                setLoading(false)
                showAlert("success", "Exito al crear el Template")
            }
                , error => {
                    setLoading(false)
                    showAlert("error", "Hubo un error al crear el Template")
                })

    }
    const username = "{{usuario}}"

    return <Card>
        <CardContent>
            <Typography variant="h6" color="primary">Crear un nuevo Template</Typography>
            <Typography variant="caption" color="textPrimary">Podes usar {username} dentro del asunto y cuerpo del template y será reemplazado por el nombre del usuario al se le envía el email</Typography>
            <Grid container>
                <Grid item>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField fullWidth label="nombre" value={name} onChange={ev => setName(ev.target.value)} />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField fullWidth label="asunto" value={subject} onChange={ev => setSubject(ev.target.value)} />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={classes.multiLineArea}>
                        <TextareaAutosize label="template" variant="outlined" value={text} onChange={ev => setText(ev.target.value)} multiline="true" rows={24} />
                    </FormControl>
                </Grid>
            </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <Grid container justify="flex-end">
                <Button variant='contained' onClick={createTemplate} color='secondary'>Crear</Button>
            </Grid>
        </CardActions>
    </Card>;
}