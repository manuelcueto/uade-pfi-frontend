import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Typography, Card, CardContent, FormControl, Button, TextField, TextareaAutosize } from '@material-ui/core';


export default function CreateTemplate() {

    const [name, _setName] = useState('')
    const [subject, _setSubject] = useState('')
    const [text, _setText] = useState('')

    const setName = (ev) => {
        _setName(ev.target.value)
    }
    const setSubject = (ev) => {
        _setSubject(ev.target.value)
    }
    const setText = (ev) => {
        _setText(ev.target.value)
    }

    const createCampaign = ev => {
        axios.post("http://localhost:9999/api/templates", { name: name, text: text, subject: subject })

    }

    return <Card>
        <CardContent>
            <Typography color="primary">Crear un nuevo Template</Typography>
            <FormControl>
                <TextField fullWidth label="nombre" value={name} onChange={setName} />
                <TextField fullWidth label="asunto" value={subject} onChange={setSubject} />
                <TextareaAutosize label="template" variant="outlined" value={text} onChange={setText} multiline rows={12} />
                <Button variant='contained' onClick={createCampaign} color='secondary'>Crear</Button>
            </FormControl>
        </CardContent>
    </Card>;
}