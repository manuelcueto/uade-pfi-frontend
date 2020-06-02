import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Typography, Card, CardContent, FormControl, Button, TextField } from '@material-ui/core';

class CreateTemplate extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            template: ""
        }
    }


    createCampaign = ev => {
        axios.post("http://localhost:9999/api/templates", { name: this.state.nombre, text: this.state.template })

    }

    handleNameChange = ev => {
        this.setState({ nombre: ev.target.value })
    }

    handleTemplateChange = ev => {
        this.setState({ template: ev.target.value })
    }

    render() {
        return <Card>
            <CardContent>
                <Typography color="primary">Crear un nuevo Template</Typography>
                <FormControl>
                    <TextField fullWidth label="nombre" value={this.state.nombre} onChange={this.handleNameChange} />
                    <TextField fullWidth label="template" variant="outlined" value={this.state.template} onChange={this.handleTemplateChange} multiline rows={4} />
                    <Button variant='contained' onClick={this.createCampaign} color='secondary'>Crear</Button>
                </FormControl>
            </CardContent>
        </Card>;
    }
}


export default CreateTemplate;