import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Typography, Input, Card, CardContent, FormControl, Button, TextField } from '@material-ui/core';

class CreateUserBase extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            template: "",
            users: null
        }
    }


    createUserBase = ev => {

        let formData = new FormData()
        formData.append('file', this.state.users)

        axios.post("http://localhost:9999/api/userBases", this.state.users, {
            headers: { 'X-BASE-NAME': this.state.nombre, 'Content-Type': 'text/csv' }
        })

    }

    handleNameChange = ev => {
        this.setState({ nombre: ev.target.value })
    }


    handleFileChange = ev => {
        console.log(ev.target.files[0])
        this.setState({ users: ev.target.files[0] })
    }

    render() {
        return <Card>
            <CardContent>
                <Typography color="primary">Subir una base de usuarios</Typography>
                <FormControl>
                    <TextField fullWidth label="nombre" value={this.state.nombre} onChange={this.handleNameChange} />
                    <Input type="file" onChange={this.handleFileChange} />
                    <Button variant='contained' onClick={this.createUserBase} color='secondary'>Crear</Button>
                </FormControl>
            </CardContent>
        </Card>;
    }
}


export default CreateUserBase;