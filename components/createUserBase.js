import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Input, Card, CardContent, CardActions, FormControl, Button, TextField, Grid } from '@material-ui/core';

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
}));

export default function CreateUserBase({ setLoading, showAlert }) {

    const classes = useStyles()
    const [nombre, setNombre] = useState("")
    const [users, setUsers] = useState(null)

    const createUserBase = ev => {
        setLoading(true)
        let formData = new FormData()
        formData.append('file', users)

        axios.post("http://localhost:9999/api/userBases", users, {
            headers: { 'X-BASE-NAME': nombre, 'Content-Type': 'text/csv' }
        }).then(response => {
            setLoading(false)
            showAlert("success", "Exito al subir la base de usuarios")
        }, error => {
            setLoading(false)
            showAlert("error", "Hubo un error al subir la base de usuarios")
        })

    }
    return <Card>
        <CardContent>
            <Typography color="primary">Subir una base de usuarios</Typography>
            <Grid container>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <TextField fullWidth label="nombre" value={nombre} onChange={ev => setNombre(ev.target.value)} />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <Input type="file" onChange={ev => setUsers(ev.target.files[0])} />
                    </FormControl>
                </Grid>

            </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <Grid container justify="flex-end">
                <Button size="small" variant='contained' onClick={createUserBase} color='secondary'>Crear</Button>
            </Grid>
        </CardActions>
    </Card>;
}