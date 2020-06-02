import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog, DialogTitle, DialogContent, DialogActions, Paper, TableRow, TableCell, Button, TableContainer,  Table, TableHead, TableBody, DialogContentText } from '@material-ui/core';

class GetTemplates extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            modalOpen: false,
            selectedTemplate: null
        }
    }

    fetchTemplates = (callback) => {
        axios.get("http://localhost:9999/api/templates").then(response => {
            const data = { templates: response.data }
            this.setState(data)
            callback()
        })
    }
    componentDidMount = () => {
        this.fetchTemplates(() => null)
    }


    deleteTemplate = () => {
        axios.delete("http://localhost:9999/api/templates/" + this.state.selectedTemplate).then(response => {
            this.fetchTemplates(resp => this.handleClose())
        })
    }

    handleOpen = (template) => {
        this.setState({ modalOpen: true, selectedTemplate: template.id });
    };

    handleClose = () => {
        this.setState({ modalOpen: false });
    };

    handleNameChange = ev => {
        this.setState({ nombre: ev.target.value })
    }

    handleTemplateChange = ev => {
        this.setState({ template: ev.target.value })
    }

    render = () => {

        let templateRows = _.map(this.state.templates, tmpl => {
            return <TableRow key={tmpl.id}>
                <TableCell>{tmpl.id}</TableCell>
                <TableCell>{tmpl.name}</TableCell>
                <TableCell>{tmpl.text}</TableCell>
                <TableCell align='center'><Button onClick={ev => this.handleOpen(tmpl)}><DeleteIcon color='secondary' /></Button></TableCell>
            </TableRow>
        })
        let foundTemplate = _.find(this.state.templates, tmpl => tmpl.id === this.state.selectedTemplate)
        let templateName = (foundTemplate != null) ? foundTemplate.name : ''

        return <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Template</TableCell>
                            <TableCell align='center'>Acción</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {templateRows}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={this.state.modalOpen} onClose={this.handleClose}>
                <DialogTitle>Confirmar Acción</DialogTitle>
                <DialogContent>
                    <DialogContentText>Estás seguro que deseas eliminar el template {templateName}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={this.deleteTemplate} color="primary" autoFocus>
                        Borrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>;
    }
}


export default GetTemplates;